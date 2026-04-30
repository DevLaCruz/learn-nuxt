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

export type SiteReview = typeof siteReviews.$inferSelect;
export type NewSiteReview = typeof siteReviews.$inferInsert;
