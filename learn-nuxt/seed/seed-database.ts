import { db } from "../server/utils/db.ts";
import { siteReviews, products, users, productReviews } from "../server/db/schema.ts";
import { siteReviews as siteReviewsData } from "./site-reviews.seed.ts";
import { products as productsData } from "./products.seed.ts";
import { users as usersData } from "./users.seed.ts";
import { productReviews as productReviewsData } from "./product-reviews.seed.ts";
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  console.log("Limpiando base de datos...");
  // Purgar base de datos en orden inverso de dependencias
  await db.delete(productReviews);
  await db.delete(siteReviews);
  await db.delete(products);
  await db.delete(users);

  // Hash de contraseñas de usuarios
  const usersWithHashedPasswords = usersData.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  }));

  // Insertar registros base y obtener los IDs generados
  console.log("Insertando usuarios, productos y reseñas del sitio...");
  const insertedUsers = await db.insert(users).values(usersWithHashedPasswords).returning();
  const insertedProducts = await db.insert(products).values(productsData).returning();
  await db.insert(siteReviews).values(siteReviewsData);

  // Asignación inteligente de reseñas a productos:
  // 1. Cada usuario registrado asignará como máximo 1 reseña por producto especificado (cumpliendo la restricción UNIQUE(productId, userId)).
  // 2. También se crearán reseñas de visitantes/invitados (userId: null) utilizando la data de product-reviews.seed.ts.
  console.log("Asignando reseñas de productos...");
  const reviewRecords = [];
  let reviewIdx = 0;

  for (const product of insertedProducts) {
    // Asignar reseñas de usuarios registrados (1 por usuario por producto)
    for (const user of insertedUsers) {
      const seedReview = productReviewsData[reviewIdx % productReviewsData.length];
      reviewIdx++;

      reviewRecords.push({
        rating: seedReview.rating,
        review: seedReview.review,
        name: user.name, // Nombre real del usuario registrado
        userTitle: seedReview.userTitle,
        productId: product.id,
        userId: user.id,
      });
    }

    // Agregar reseña de visitante/invitado (userId: null)
    const guestReview = productReviewsData[reviewIdx % productReviewsData.length];
    reviewIdx++;

    reviewRecords.push({
      rating: guestReview.rating,
      review: guestReview.review,
      name: guestReview.name,
      userTitle: guestReview.userTitle,
      productId: product.id,
      userId: null,
    });
  }

  // Insertar reseñas en la base de datos
  await db.insert(productReviews).values(reviewRecords);

  console.log(`✅ Base de datos sembrada con éxito. Se insertaron ${insertedProducts.length} productos, ${insertedUsers.length} usuarios y ${reviewRecords.length} reseñas de producto.`);
}

seedDatabase();