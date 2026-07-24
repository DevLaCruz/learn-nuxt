import { db } from '~~/server/utils/db';
import { count } from 'drizzle-orm';
import { products } from '~~/server/db/schema'; // Este es el esquema

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let limit = parseInt(query.limit as string);
  let offset = parseInt(query.offset as string);

  if (isNaN(limit) || limit <= 1) limit = 10;
  if (isNaN(offset) || offset < 0) offset = 0;

  // 1. Cambiamos el nombre de la variable local a "productsList"
  const productsList = await db
    .select()
    .from(products) // Ahora "products" se refiere sin problemas al esquema importado
    .limit(limit)
    .offset(offset);

  // 2. Obtener el total de registros
  const [totalResult] = await db
    .select({ total: count() })
    .from(products);
  
  // SOLUCIÓN: Agregamos el signo de interrogación y un valor por defecto
  const total = totalResult?.total ?? 0; 
  const totalPages = Math.ceil(total / limit);

  return {
    products: productsList, // Lo puedes seguir devolviendo como "products" en el JSON final
    totalPages,
    currentPage: Math.floor(offset / limit) + 1,
    perPage: limit,
    total,
  };
});