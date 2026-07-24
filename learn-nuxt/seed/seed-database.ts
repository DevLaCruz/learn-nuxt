import { db } from "../server/utils/db.ts";
import { siteReviews, products, users } from "../server/db/schema.ts";
import { siteReviews as siteReviewsData } from "./site-reviews.seed.ts";
import { products as productsData } from "./products.seed.ts";
import { users as usersData } from "./users.seed.ts";


import bcrypt from 'bcryptjs'


async function seedDatabase() {
  // Purgar base de datos
  await db.delete(siteReviews);
  await db.delete(products)
  await db.delete(users)


 // password hashings
 const usersWithHashedPasswords = usersData.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  }));

  // Insertar registros
  await db.insert(siteReviews).values(siteReviewsData);
  await db.insert(products).values(productsData);
  await db.insert(users).values(usersWithHashedPasswords);

  console.log("Database seeded successfully");
}

seedDatabase();