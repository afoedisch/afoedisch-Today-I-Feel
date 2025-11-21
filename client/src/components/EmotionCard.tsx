import { motion } from "framer-motion";
import { Emotion } from "@/lib/stores/useEmotions";

interface EmotionCardProps {
  emotion: Emotion;
  onClick: () => void;
  isSelected?: boolean;
}

export function EmotionCard({ emotion, onClick, isSelected = false }: EmotionCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl shadow-md cursor-pointer transition-all border-3"
      style={{
        backgroundColor: emotion.color,
        borderColor: isSelected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
        borderWidth: isSelected ? "3px" : "2px",
        boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.1)",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.div
        className="text-5xl sm:text-6xl md:text-7xl mb-2"
        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: isSelected ? Infinity : 0, duration: 1.5 }}
      >
        {emotion.emoji}
      </motion.div>
      <div className="text-white font-semibold text-lg sm:text-xl md:text-2xl text-center drop-shadow-md">
        {emotion.label}
      </div>
    </motion.button>
  );
}
