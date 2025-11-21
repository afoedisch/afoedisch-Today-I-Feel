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
  | "loved";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export interface Emotion {
  id: string;
  type: EmotionType;
  emoji: string;
  color: string;
  label: string;
}

export interface SelectedEmotion {
  emotion: Emotion;
  timeOfDay: TimeOfDay;
  timestamp: number;
}

export const EMOTIONS: Emotion[] = [
  { id: "happy", type: "happy", emoji: "😊", color: "#FFD93D", label: "Happy" },
  { id: "excited", type: "excited", emoji: "🤩", color: "#FF6B9D", label: "Excited" },
  { id: "proud", type: "proud", emoji: "😎", color: "#A78BFA", label: "Proud" },
  { id: "loved", type: "loved", emoji: "🥰", color: "#F472B6", label: "Loved" },
  { id: "calm", type: "calm", emoji: "😌", color: "#6EE7B7", label: "Calm" },
  { id: "silly", type: "silly", emoji: "🤪", color: "#FDE047", label: "Silly" },
  { id: "sad", type: "sad", emoji: "😢", color: "#60A5FA", label: "Sad" },
  { id: "worried", type: "worried", emoji: "😰", color: "#C4B5FD", label: "Worried" },
  { id: "angry", type: "angry", emoji: "😠", color: "#F87171", label: "Angry" },
  { id: "scared", type: "scared", emoji: "😨", color: "#A78BFA", label: "Scared" },
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
