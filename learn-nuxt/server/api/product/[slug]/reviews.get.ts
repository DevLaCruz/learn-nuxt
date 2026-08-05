import { db } from '~~/server/utils/db';
import { productReviews, products } from '~~/server/db/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // En el proyecto original (Prisma) usábamos getUserSession() para verificar si
  // el usuario logueado ya había comentado.
  // Aquí usamos useAuthentication (o la sesión actual que tengas)
  // Como esto es un backend API, simulamos la sesión usando la cookie/header que tengamos.
  // Para propósitos educativos, si el usuario está usando una sesión manejada por nuxt-auth-utils:
  const session = await getUserSession(event).catch(() => ({ user: null }));
  const userId = session?.user?.id || null;

  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' });
  }

  // ==============================================================================
  // DIFERENCIA PRISMA VS DRIZZLE: OBTENER RESEÑAS
  // ==============================================================================
  // Prisma:
  // const productReviews = await prisma.productReview.findMany({
  //   where: { product: { slug: slug } },
  //   take: 10,
  //   orderBy: { createdAt: 'desc' },
  // });
  //
  // Drizzle (Relational API):
  // La API relacional de Drizzle (`db.query`) es muy similar a Prisma.
  // Primero encontramos el producto por slug y le pedimos ("with") sus reseñas limitadas a 10.
  // ==============================================================================
  
  const productWithReviews = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, slug),
    with: {
      reviews: {
        limit: 10,
        orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
      },
    },
  });

  const reviewsList = productWithReviews?.reviews || [];

  // ==============================================================================
  // DIFERENCIA PRISMA VS DRIZZLE: VERIFICAR SI EL USUARIO YA COMENTÓ
  // ==============================================================================
  // Prisma:
  // const userHasReview = await prisma.productReview.findFirst({
  //   where: { product: { slug: slug }, userId: Number(userId) },
  // });
  //
  // Drizzle:
  // Usamos Query Builder clásico con innerJoin para filtrar por el slug del producto,
  // o si ya tenemos el `productId` (gracias a la consulta anterior), es aún más fácil y rápido.
  // ==============================================================================
  
  let userHasReview = null;
  
  if (userId && productWithReviews) {
    userHasReview = await db.query.productReviews.findFirst({
      where: (reviews, { and, eq }) => and(
        eq(reviews.productId, productWithReviews.id),
        eq(reviews.userId, Number(userId))
      ),
    });
  }

  return {
    productReviews: reviewsList,
    hasUserPostedReview: !!userHasReview,
  };
});