import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '~~/server/utils/db';
import { products } from '~~/server/db/schema';

const bodySchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

import { fileUpload } from '~~/server/utils/file-upload';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string;

  let rawData: any = null;
  const files: { filename: string; data: Buffer }[] = [];
  const contentType = getHeader(event, 'content-type') || '';

  if (contentType.includes('multipart/form-data')) {
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'No form data provided',
      });
    }

    for (const part of formData) {
      if (part.name === 'data' && part.data) {
        rawData = JSON.parse(part.data.toString('utf-8'));
      } else if (part.name === 'files' && part.filename && part.data) {
        files.push({
          filename: part.filename,
          data: part.data,
        });
      }
    }
  } else {
    rawData = await readBody(event);
  }

  const parsed = bodySchema.safeParse(rawData);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Check the body of the request',
      data: parsed.error,
    });
  }

  const uploadedImages = [];
  for (const file of files) {
    const imageUrl = await fileUpload(file.data, file.filename);
    uploadedImages.push(imageUrl);
  }

  // Confirmar que el producto exista
  const [existingProduct] = await db
    .select()
    .from(products)
    .where(eq(products.id, +id))
    .limit(1);

  if (!existingProduct) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
      message: `Product with id ${id} not found`,
    });
  }

  const updateData: Record<string, any> = {};
  if (parsed.data.slug !== undefined) updateData.slug = parsed.data.slug;
  if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
  if (parsed.data.description !== undefined) updateData.description = parsed.data.description;
  if (parsed.data.price !== undefined) updateData.price = parsed.data.price;
  
  let finalImages = existingProduct.images || [];
  if (parsed.data.images !== undefined) {
    finalImages = parsed.data.images;
  }
  if (uploadedImages.length > 0) {
    finalImages = [...finalImages, ...uploadedImages];
  }
  updateData.images = finalImages;

  if (parsed.data.tags !== undefined) updateData.tags = parsed.data.tags;

  const [updatedProduct] = await db
    .update(products)
    .set({
      ...updateData,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(products.id, +id))
    .returning();

  return {
    message: 'Product updated',
    product: updatedProduct,
    files: [],
  };
});