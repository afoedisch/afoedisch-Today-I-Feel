import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const emotionEntries = pgTable("emotion_entries", {
  id: serial("id").primaryKey(),
  emotionType: varchar("emotion_type", { length: 50 }).notNull(),
  timeOfDay: varchar("time_of_day", { length: 20 }).notNull(),
  journalNote: text("journal_note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEmotionEntrySchema = createInsertSchema(emotionEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type EmotionEntry = typeof emotionEntries.$inferSelect;
export type InsertEmotionEntry = z.infer<typeof insertEmotionEntrySchema>;
