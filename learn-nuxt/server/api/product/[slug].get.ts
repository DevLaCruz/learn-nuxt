import { db } from '~~/server/utils/db';
import { eq } from 'drizzle-orm';
import { products } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug es requerido',
    });
  }

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Producto no encontrado',
    });
  }

  return product;
});
