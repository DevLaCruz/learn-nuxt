import { desc } from "drizzle-orm";
import { siteReviews } from "~~/server/db/schema";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async () => {
  const reviews = await db
    .select({
      name: siteReviews.name,
      subtitle: siteReviews.subtitle,
      description: siteReviews.description,
      profileImage: siteReviews.profileImage,
    })
    .from(siteReviews)
    .orderBy(desc(siteReviews.id))
    .limit(10);

  return reviews;
});
