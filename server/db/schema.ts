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

  // Arrays como JSON string
  images: text("images", { mode: "json" }).notNull(),

  tags: text("tags", { mode: "json" }).notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),

  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});



export type SiteReview = typeof siteReviews.$inferSelect;
export type NewSiteReview = typeof siteReviews.$inferInsert;
