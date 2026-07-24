import { db } from "../server/utils/db.ts";
import { siteReviews, products } from "../server/db/schema.ts";
import { siteReviews as siteReviewsData } from "./site-reviews.seed.ts";
import { products as productsData } from "./products.seed.ts";


async function seedDatabase() {
  // Purgar base de datos
  await db.delete(siteReviews);
  await db.delete(products)

  // Insertar registros
  await db.insert(siteReviews).values(siteReviewsData);
  await db.insert(products).values(productsData);

  console.log("Database seeded successfully");
}

seedDatabase();
