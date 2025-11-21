import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type EmotionType = 
  | "happy" 
  | "sad" 
  | "angry" 
  | "excited" 
  | "worried" 
  | "calm" 
  | "silly" 
  | "proud" 
  | "scared" 
  | "loved"
  | "other";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export interface Emotion {
  id: string;
  type: EmotionType;
  emoji: string;
  color: string;
  label: string;
  customLabel?: string;
}

export interface SelectedEmotion {
  emotion: Emotion;
  timeOfDay: TimeOfDay;
  timestamp: number;
}

export const EMOTIONS: Emotion[] = [
  { id: "happy", type: "happy", emoji: "😊", color: "#F9A825", label: "Happy" },
  { id: "excited", type: "excited", emoji: "🤩", color: "#FB8C00", label: "Excited" },
  { id: "proud", type: "proud", emoji: "😎", color: "#8E6BB8", label: "Proud" },
  { id: "loved", type: "loved", emoji: "🥰", color: "#E57373", label: "Loved" },
  { id: "calm", type: "calm", emoji: "😌", color: "#4DB6AC", label: "Calm" },
  { id: "silly", type: "silly", emoji: "🤪", color: "#FFD54F", label: "Silly" },
  { id: "sad", type: "sad", emoji: "😢", color: "#64B5F6", label: "Sad" },
  { id: "worried", type: "worried", emoji: "😰", color: "#9FA8DA", label: "Worried" },
  { id: "angry", type: "angry", emoji: "😠", color: "#EF5350", label: "Angry" },
  { id: "scared", type: "scared", emoji: "😨", color: "#BA68C8", label: "Scared" },
  { id: "other", type: "other", emoji: "✨", color: "#90A4AE", label: "Other" },
];

interface EmotionState {
  selectedEmotions: SelectedEmotion[];
  currentTimeOfDay: TimeOfDay | null;
  showSummary: boolean;
  
  // Actions
  selectEmotion: (emotion: Emotion, timeOfDay: TimeOfDay) => void;
  removeEmotion: (id: string) => void;
  setCurrentTimeOfDay: (timeOfDay: TimeOfDay | null) => void;
  setShowSummary: (show: boolean) => void;
  clearDay: () => void;
  getEmotionsForTime: (timeOfDay: TimeOfDay) => SelectedEmotion[];
}

export const useEmotions = create<EmotionState>()(
  subscribeWithSelector((set, get) => ({
    selectedEmotions: [],
    currentTimeOfDay: null,
    showSummary: false,
    
    selectEmotion: (emotion, timeOfDay) => {
      const newSelection: SelectedEmotion = {
        emotion,
        timeOfDay,
        timestamp: Date.now(),
      };
      
      set((state) => ({
        selectedEmotions: [...state.selectedEmotions, newSelection],
      }));
    },
    
    removeEmotion: (id) => {
      set((state) => ({
        selectedEmotions: state.selectedEmotions.filter(
          (sel) => `${sel.emotion.id}-${sel.timestamp}` !== id
        ),
      }));
    },
    
    setCurrentTimeOfDay: (timeOfDay) => {
      set({ currentTimeOfDay: timeOfDay });
    },
    
    setShowSummary: (show) => {
      set({ showSummary: show });
    },
    
    clearDay: () => {
      set({ selectedEmotions: [], currentTimeOfDay: null, showSummary: false });
    },
    
    getEmotionsForTime: (timeOfDay) => {
      return get().selectedEmotions.filter(
        (sel) => sel.timeOfDay === timeOfDay
      );
    },
  }))
);
