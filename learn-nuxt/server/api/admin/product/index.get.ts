import { db } from '~~/server/utils/db';
import { products } from '~~/server/db/schema';
import { count, isNull } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Number(query.limit) || 10);
  const offset = (page - 1) * limit;

  const data = await db
    .select()
    .from(products)
    .where(isNull(products.deletedAt))
    .limit(limit)
    .offset(offset);

  const [{ total }] = await db
    .select({ total: count() })
    .from(products)
    .where(isNull(products.deletedAt));

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  };
});
