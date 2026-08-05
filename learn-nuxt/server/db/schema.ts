import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const siteReviews = sqliteTable('site_reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  subtitle: text('subtitle').notNull(),
  description: text('description').notNull(),
  profileImage: text('profile_image').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});


export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),

  // Ahora TypeScript sabrá que son arrays de strings
  images: text("images", { mode: "json" }).$type<string[]>().notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),

  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    // Se actualizará automáticamente, igual que en users
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  deletedAt: text("deleted_at"),
});


export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  
  // Guardamos el array como JSON y le decimos a TypeScript que es un string[]
  roles: text('roles', { mode: 'json' }).$type<string[]>().notNull(),
  
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
    
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    // Emula el @updatedAt de Prisma actualizando el valor en cada UPDATE
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`), 
});


export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type SiteReview = typeof siteReviews.$inferSelect;
export type NewSiteReview = typeof siteReviews.$inferInsert;
// Extrae los tipos basándose en tu esquema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Ejemplo: TypeScript ya sabrá que 'id' es un number y 'email' un string
function getUser(user: User) {
  console.log(user.email);
}