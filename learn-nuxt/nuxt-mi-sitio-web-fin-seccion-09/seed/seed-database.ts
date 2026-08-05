import prisma from '../lib/prisma.ts';
import { siteReviews } from './site-reviews.seed.ts';
import { products } from './products.seed.ts';
import { users } from './users.seed.ts';

import bcrypt from 'bcryptjs';

async function seedDatabase() {
  // Purgar base de datos
  await prisma.siteReview.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Hash de contraseñas
  const usersWithHashedPassword = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
  }));

  // Insertar registros
  await prisma.siteReview.createMany({
    data: siteReviews,
  });

  await prisma.product.createMany({
    data: products,
  });

  await prisma.user.createMany({
    data: usersWithHashedPassword,
  });

  console.log('Database seeded successfully');
}

seedDatabase();
