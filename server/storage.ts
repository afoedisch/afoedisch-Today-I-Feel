import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, desc, gte } from "drizzle-orm";
import { 
  users, 
  emotionEntries,
  type User, 
  type InsertUser,
  type EmotionEntry,
  type InsertEmotionEntry 
} from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createEmotionEntry(entry: InsertEmotionEntry): Promise<EmotionEntry>;
  getEmotionEntries(limit?: number): Promise<EmotionEntry[]>;
  getEmotionEntriesByDateRange(startDate: Date, endDate: Date): Promise<EmotionEntry[]>;
  getEmotionEntriesForToday(): Promise<EmotionEntry[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async createEmotionEntry(entry: InsertEmotionEntry): Promise<EmotionEntry> {
    const result = await db.insert(emotionEntries).values(entry).returning();
    return result[0];
  }

  async getEmotionEntries(limit: number = 100): Promise<EmotionEntry[]> {
    return await db.select().from(emotionEntries).orderBy(desc(emotionEntries.createdAt)).limit(limit);
  }

  async getEmotionEntriesByDateRange(startDate: Date, endDate: Date): Promise<EmotionEntry[]> {
    return await db.select()
      .from(emotionEntries)
      .where(gte(emotionEntries.createdAt, startDate))
      .orderBy(desc(emotionEntries.createdAt));
  }

  async getEmotionEntriesForToday(): Promise<EmotionEntry[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await this.getEmotionEntriesByDateRange(today, new Date());
  }
}

export const storage = new DatabaseStorage();
