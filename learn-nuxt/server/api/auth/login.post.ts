import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '~~/server/utils/db';
import { users } from '~~/server/db/schema';

const bodySchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Email is not valid',
    }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  // 2. Consulta con Drizzle usando la API Relacional
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Bad credentials (email)',
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  // 3. CORRECCIÓN: Validar la contraseña ANTES de crear la sesión
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: 'Bad credentials (password)',
    });
  }

  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles, // Asegúrate de que este campo exista en tu esquema de Drizzle
  };

  await setUserSession(event, {
    user: userSession,
  });

  return {
    message: 'Login successful',
    user: userSession,
  };
});
