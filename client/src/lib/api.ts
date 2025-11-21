import { apiRequest } from "./queryClient";
import type { EmotionEntry, InsertEmotionEntry } from "@shared/schema";

export async function saveEmotion(entry: InsertEmotionEntry): Promise<EmotionEntry> {
  const response = await apiRequest("POST", "/api/emotions", entry);
  return await response.json();
}

export async function getTodaysEmotions(): Promise<EmotionEntry[]> {
  const response = await apiRequest("GET", "/api/emotions/today");
  return await response.json();
}

export async function getWeeklyEmotions(): Promise<EmotionEntry[]> {
  const response = await apiRequest("GET", "/api/emotions/week");
  return await response.json();
}

export async function getAllEmotions(limit: number = 100): Promise<EmotionEntry[]> {
  const response = await apiRequest("GET", `/api/emotions?limit=${limit}`);
  return await response.json();
}
