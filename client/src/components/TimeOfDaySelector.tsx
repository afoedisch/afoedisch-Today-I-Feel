import { motion } from "framer-motion";
import { TimeOfDay } from "@/lib/stores/useEmotions";

interface TimeOfDaySelectorProps {
  selectedTime: TimeOfDay | null;
  onSelectTime: (time: TimeOfDay) => void;
}

const TIME_OPTIONS: { id: TimeOfDay; label: string; emoji: string; gradient: string }[] = [
  { 
    id: "morning", 
    label: "Morning", 
    emoji: "🌅", 
    gradient: "linear-gradient(135deg, #FFAB91 0%, #FFCC80 100%)" 
  },
  { 
    id: "afternoon", 
    label: "Afternoon", 
    emoji: "☀️", 
    gradient: "linear-gradient(135deg, #FFD54F 0%, #FFF59D 100%)" 
  },
  { 
    id: "evening", 
    label: "Evening", 
    emoji: "🌙", 
    gradient: "linear-gradient(135deg, #80DEEA 0%, #B2EBF2 100%)" 
  },
];

export function TimeOfDaySelector({ selectedTime, onSelectTime }: TimeOfDaySelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
      {TIME_OPTIONS.map((time) => (
        <motion.button
          key={time.id}
          onClick={() => onSelectTime(time.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-md cursor-pointer transition-all border-3 w-full sm:w-auto min-w-[200px]"
          style={{
            background: time.gradient,
            borderColor: selectedTime === time.id ? "#fff" : "rgba(255,255,255,0.5)",
            borderWidth: selectedTime === time.id ? "3px" : "2px",
            boxShadow: selectedTime === time.id 
              ? "0 4px 12px rgba(0,0,0,0.15)" 
              : "0 2px 8px rgba(0,0,0,0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * TIME_OPTIONS.indexOf(time) }}
        >
          <span className="text-4xl sm:text-5xl">{time.emoji}</span>
          <div className="text-white font-semibold text-xl sm:text-2xl drop-shadow-md">
            {time.label}
          </div>
          {selectedTime === time.id && (
            <motion.div
              className="absolute -top-2 -right-2 bg-white/95 rounded-full p-2 shadow-md border border-gray-200"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <span className="text-2xl">✓</span>
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
