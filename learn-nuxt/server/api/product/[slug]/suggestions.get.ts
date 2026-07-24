import { db } from '~~/server/utils/db';
import { eq, sql, and, ne, or } from 'drizzle-orm';
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

  const productTags = product.tags as string[];
  const tagConditions = productTags.map((tag) =>
    sql`json_each.value = ${tag}`
  );

  const suggestions = await db
    .select()
    .from(products)
    .where(
      and(
        ne(products.id, product.id),
        sql`exists (
          select 1 from json_each(${products.tags}) 
          where ${or(...tagConditions)}
        )`
      )
    )
    .limit(3);

  return suggestions;
});