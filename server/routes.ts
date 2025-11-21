import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmotionEntrySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Save emotion entry
  app.post("/api/emotions", async (req, res) => {
    try {
      const validatedEntry = insertEmotionEntrySchema.parse(req.body);
      const entry = await storage.createEmotionEntry(validatedEntry);
      res.json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all emotions (with optional limit)
  app.get("/api/emotions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const entries = await storage.getEmotionEntries(limit);
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get today's emotions
  app.get("/api/emotions/today", async (req, res) => {
    try {
      const entries = await storage.getEmotionEntriesForToday();
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get emotions for the past week
  app.get("/api/emotions/week", async (req, res) => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const entries = await storage.getEmotionEntriesByDateRange(startDate, endDate);
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
