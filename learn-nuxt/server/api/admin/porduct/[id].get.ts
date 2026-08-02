import { eq } from 'drizzle-orm';
import { products, type Product } from '~~/server/db/schema';
import db from '~~/server/utils/db';

export default defineEventHandler(async (event) => {
  // Obtener el parámetro 'id' de la ruta (ej: /api/admin/product/5 -> id = '5')
  const id = getRouterParam(event, 'id') as string;

  // TODO: Revisar sesión de usuario y validar rol de admin
  // const session = await requireUserSession(event);
  // const hasAdminRole = session.user.roles.includes('admin');
  // if (!hasAdminRole) {
  //   throw createError({ statusCode: 401, message: 'Unauthorized' });
  // }

  // Caso especial: si el id es 'new', devolver un objeto Product vacío para formularios de creación
  if (id === 'new') {
    const now = new Date().toISOString();
    return {
      id: 0,
      slug: '',
      name: '',
      description: '',
      price: 0,
      images: [],
      tags: [],
      updatedAt: now,
      createdAt: now,
    } as Product;
  }

  // Consulta a la BD usando Drizzle ORM:
  // 1. db.select() - inicia la consulta SELECT
  // 2. .from(products) - especifica la tabla
  // 3. .where(eq(products.id, +id)) - filtra por id (convertido a number con +)
  // 4. .get() - ejecuta y devuelve UN resultado (o undefined si no existe)
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, +id))
    .get();

  // Si no se encuentra el producto, lanzar error 404
  if (!product) {
    throw createError({
      statusCode: 404,
      message: `Product with id ${id} not found`,
    });
  }

  // Devolver el producto encontrado (Drizzle ya devuelve el tipo Product inferido del schema)
  return product;
});