import { db } from "../server/utils/db.ts";
import { siteReviews } from "../server/db/schema.ts";
import { siteReviews as siteReviewsData } from "./site-reviews.seed.ts";

async function seedDatabase() {
  // Purgar base de datos
  await db.delete(siteReviews);

  // Insertar registros
  await db.insert(siteReviews).values(siteReviewsData);

  console.log("Database seeded successfully");
}

seedDatabase();
