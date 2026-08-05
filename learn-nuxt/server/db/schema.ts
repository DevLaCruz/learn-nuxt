import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

// ============================================================================
// HELPER REUTILIZABLE DE TIMESTAMPS
// ============================================================================
// En Drizzle ORM para SQLite no se utiliza herencia de clases tradicional (POO).
// En su lugar, definimos un objeto con las columnas estándar 'createdAt' y 'updatedAt'
// y las desempaquetamos (...timestamps) dentro de cada definición de tabla.
// ============================================================================
export const timestamps = {
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
};

// ============================================================================
// TABLAS
// ============================================================================

export const siteReviews = sqliteTable('site_reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  subtitle: text('subtitle').notNull(),
  description: text('description').notNull(),
  profileImage: text('profile_image').notNull(),
  ...timestamps,
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),

  // Modo JSON para guardar arrays en SQLite
  images: text('images', { mode: 'json' }).$type<string[]>().notNull(),
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),

  ...timestamps,
  deletedAt: text('deleted_at'),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  roles: text('roles', { mode: 'json' }).$type<string[]>().notNull(),
  ...timestamps,
});

// ============================================================================
// RESEÑAS DE PRODUCTO (PRODUCT REVIEWS)
// ============================================================================
// Explicación de la restricción ÚNICA:
// 1. A nivel de Base de Datos: El índice único compuesto `uniqueIndex` en (productId, userId)
//    garantiza que un mismo usuario (userId) NO pueda registrar más de UNA reseña para el
//    mismo producto (productId). Si se intenta hacer un INSERT duplicado, SQLite lanzará
//    un error de restricción 'SQLITE_CONSTRAINT_UNIQUE'.
// 2. userId es Opcional (Nullable): Permite reseñas registradas por usuarios autenticados
//    (userId !== null) y también reseñas de visitantes/invitados (userId === null).
//    En SQLite, los valores NULL en un índice único no entran en conflicto entre sí.
// 3. onDelete: 'cascade' elimina automáticamente las reseñas si el producto es eliminado físicamente.
// ============================================================================
export const productReviews = sqliteTable(
  'product_reviews',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    rating: integer('rating').notNull(),
    review: text('review').notNull(),
    name: text('name').notNull(),
    userTitle: text('user_title').notNull(),

    // Clave foránea hacia productos (1 a N)
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),

    // Clave foránea opcional hacia usuarios
    userId: integer('user_id').references(() => users.id, {
      onDelete: 'set null',
    }),

    ...timestamps,
  },
  (table) => [
    // Restricción Única a nivel de DB: 1 sola reseña por (producto + usuario)
    uniqueIndex('product_user_unique_review_idx').on(table.productId, table.userId),
  ]
);

// ============================================================================
// RELACIONES DE DRIZZLE ORM
// ============================================================================

export const productsRelations = relations(products, ({ many }) => ({
  reviews: many(productReviews),
}));

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(productReviews),
}));

export const productReviewsRelations = relations(productReviews, ({ one }) => ({
  product: one(products, {
    fields: [productReviews.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [productReviews.userId],
    references: [users.id],
  }),
}));

// ============================================================================
// TIPOS DE TYPESCRIPT
// ============================================================================

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type SiteReview = typeof siteReviews.$inferSelect;
export type NewSiteReview = typeof siteReviews.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type ProductReview = typeof productReviews.$inferSelect;
export type NewProductReview = typeof productReviews.$inferInsert;