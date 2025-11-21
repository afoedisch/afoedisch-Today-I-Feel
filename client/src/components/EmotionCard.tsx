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
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl shadow-lg cursor-pointer transition-all border-4"
      style={{
        backgroundColor: emotion.color,
        borderColor: isSelected ? "#fff" : emotion.color,
        boxShadow: isSelected ? `0 0 20px ${emotion.color}` : "0 4px 6px rgba(0,0,0,0.1)",
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="text-5xl sm:text-6xl md:text-7xl mb-2"
        animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: isSelected ? Infinity : 0, duration: 1 }}
      >
        {emotion.emoji}
      </motion.div>
      <div className="text-white font-bold text-lg sm:text-xl md:text-2xl text-center drop-shadow-lg">
        {emotion.label}
      </div>
    </motion.button>
  );
}
