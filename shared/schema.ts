import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  imageUrl: text("image_url").notNull(),
  audioUrl: text("audio_url"),
  spotifyUrl: text("spotify_url"),
  appleUrl: text("apple_url"),
  soundcloudUrl: text("soundcloud_url"),
  featured: boolean("featured").default(false),
  releaseYear: integer("release_year").notNull(),
  albumType: text("album_type").notNull() // "Single", "EP", "Album"
});

export const pressArticles = pgTable("press_articles", {
  id: serial("id").primaryKey(),
  publication: text("publication").notNull(),
  title: text("title").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  type: text("type").notNull() // "Review", "Interview", "Feature"
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption").notNull(),
  category: text("category").notNull() // "Studio", "Performance", "Behind the Scenes"
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow()
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  isActive: boolean("is_active").default(true)
});

export const exclusiveContent = pgTable("exclusive_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  contentType: text("content_type").notNull(), // "track", "video", "article", "behind_scenes"
  contentUrl: text("content_url"),
  thumbnailUrl: text("thumbnail_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"), // "admin", "super_admin"
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login")
});

export const streamingStats = pgTable("streaming_stats", {
  id: serial("id").primaryKey(),
  trackId: integer("track_id").references(() => tracks.id),
  platform: text("platform").notNull(), // "spotify", "apple", "soundcloud"
  playCount: integer("play_count").default(0),
  lastUpdated: timestamp("last_updated").defaultNow()
});

export const insertTrackSchema = createInsertSchema(tracks).omit({ id: true });
export const insertPressArticleSchema = createInsertSchema(pressArticles).omit({ id: true });
export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true });
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, submittedAt: true });
export const insertNewsletterSchema = createInsertSchema(newsletters).omit({ id: true, subscribedAt: true });
export const insertExclusiveContentSchema = createInsertSchema(exclusiveContent).omit({ id: true, createdAt: true });
export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true, lastLogin: true });
export const insertStreamingStatsSchema = createInsertSchema(streamingStats).omit({ id: true, lastUpdated: true });

export type Track = typeof tracks.$inferSelect;
export type PressArticle = typeof pressArticles.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type Newsletter = typeof newsletters.$inferSelect;
export type ExclusiveContent = typeof exclusiveContent.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type StreamingStats = typeof streamingStats.$inferSelect;

export type InsertTrack = z.infer<typeof insertTrackSchema>;
export type InsertPressArticle = z.infer<typeof insertPressArticleSchema>;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type InsertExclusiveContent = z.infer<typeof insertExclusiveContentSchema>;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type InsertStreamingStats = z.infer<typeof insertStreamingStatsSchema>;
