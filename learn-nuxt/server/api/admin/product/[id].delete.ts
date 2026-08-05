import { eq } from 'drizzle-orm';
import { db } from '~~/server/utils/db';
import { products } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string;

  if (!id || isNaN(+id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid product ID',
    });
  }

  // Confirmar que el producto exista y no esté eliminado
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

  // Soft delete: actualizar deletedAt con el timestamp actual
  const [deletedProduct] = await db
    .update(products)
    .set({
      deletedAt: new Date().toISOString(),
    })
    .where(eq(products.id, +id))
    .returning();

  return {
    message: 'Product deleted successfully (soft delete)',
    product: deletedProduct,
  };
});
