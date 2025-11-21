import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PositiveMessageProps {
  show: boolean;
  emotionLabel?: string;
}

const ENCOURAGEMENTS = [
  "Great job sharing your feelings! 🌟",
  "You're doing amazing! ⭐",
  "So proud of you! 💪",
  "Keep being awesome! 🎉",
  "You're a feelings expert! 🏆",
  "Wonderful! Keep it up! 🌈",
  "You're so brave! 💖",
  "Excellent work! ✨",
  "You rock! 🎸",
  "Super job! 🦸",
];

export function PositiveMessage({ show, emotionLabel }: PositiveMessageProps) {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    if (show && emotionLabel) {
      const randomEncouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
      setMessage(`You felt ${emotionLabel}! ${randomEncouragement}`);
    }
  }, [show, emotionLabel]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <motion.div
            className="bg-gradient-to-r from-[#FFAB91] via-[#FFD54F] to-[#80DEEA] text-white font-bold text-2xl sm:text-4xl px-8 py-6 rounded-3xl shadow-xl border-3 border-white/80"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: 2,
            }}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
