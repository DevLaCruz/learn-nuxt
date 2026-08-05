import z from 'zod';
import { db } from '~~/server/utils/db';
import { productReviews, products } from '~~/server/db/schema';
import { and, eq } from 'drizzle-orm';

const bodySchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string(),
  userTitle: z.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' });
  }

  const session = await requireUserSession(event);
  const userId = session.user.id;

  if (!session.user.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request (user name missing)',
    });
  }

  // ==============================================================================
  // DIFERENCIA PRISMA VS DRIZZLE: OBTENER EL PRODUCTO
  // ==============================================================================
  // Prisma: const product = await prisma.product.findUnique({ where: { slug } });
  // Drizzle: db.query.products.findFirst({ where: ... })
  // ==============================================================================
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, slug),
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    });
  }

  // ==============================================================================
  // PROTECCIÓN CONTRA DUPLICADOS (A nivel de Código y de Base de Datos)
  // ==============================================================================
  // En Prisma consultábamos si existía para lanzar un error 400.
  // En Drizzle hacemos lo mismo para dar una respuesta amigable, PERO además
  // tenemos el índice `uniqueIndex` en SQLite que prohíbe que el mismo (productId, userId)
  // se inserte dos veces. Si esto fallara (race condition), SQLite abortará la query.
  // ==============================================================================
  const existingReview = await db.query.productReviews.findFirst({
    where: (reviews, { and, eq }) => and(
      eq(reviews.productId, product.id),
      eq(reviews.userId, Number(userId))
    ),
  });

  if (existingReview) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You have already posted a review for this product',
    });
  }

  // ==============================================================================
  // CREACIÓN DE LA RESEÑA
  // ==============================================================================
  // Prisma: prisma.productReview.create({ data: { ... } })
  // Drizzle: db.insert(productReviews).values({ ... }).returning()
  // ==============================================================================
  const [review] = await db.insert(productReviews).values({
    name: session.user.name,
    rating: body.rating,
    review: body.review,
    userTitle: body.userTitle,
    productId: product.id,
    userId: Number(userId),
  }).returning();

  return review;
});
