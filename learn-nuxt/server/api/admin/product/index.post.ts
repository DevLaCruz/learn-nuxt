import { z } from 'zod';
import { db } from '~~/server/utils/db';
import { products } from '~~/server/db/schema';

const bodySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

import { fileUpload } from '~~/server/utils/file-upload';

export default defineEventHandler(async (event) => {
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

  const finalImages = [...(parsed.data.images || []), ...uploadedImages];

  const [newProduct] = await db
    .insert(products)
    .values({
      slug: parsed.data.slug,
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      images: finalImages,
      tags: parsed.data.tags ?? [],
    })
    .returning();

  return {
    message: 'Product created successfully',
    product: newProduct,
  };
});