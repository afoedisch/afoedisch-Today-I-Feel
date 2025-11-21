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
    gradient: "linear-gradient(135deg, #FFA726 0%, #FFE082 100%)" 
  },
  { 
    id: "afternoon", 
    label: "Afternoon", 
    emoji: "☀️", 
    gradient: "linear-gradient(135deg, #42A5F5 0%, #90CAF9 100%)" 
  },
  { 
    id: "evening", 
    label: "Evening", 
    emoji: "🌙", 
    gradient: "linear-gradient(135deg, #5C6BC0 0%, #9FA8DA 100%)" 
  },
];

export function TimeOfDaySelector({ selectedTime, onSelectTime }: TimeOfDaySelectorProps) {
  const handleClick = (timeId: TimeOfDay) => {
    console.log("TimeOfDaySelector button clicked:", timeId);
    onSelectTime(timeId);
  };

  console.log("TimeOfDaySelector rendering with selectedTime:", selectedTime);

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
      {TIME_OPTIONS.map((time) => (
        <motion.button
          key={time.id}
          onClick={() => handleClick(time.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-xl cursor-pointer transition-all border-4 w-full sm:w-auto min-w-[200px]"
          style={{
            background: time.gradient,
            borderColor: selectedTime === time.id ? "#fff" : "transparent",
            boxShadow: selectedTime === time.id 
              ? "0 0 25px rgba(255,255,255,0.8)" 
              : "0 4px 6px rgba(0,0,0,0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * TIME_OPTIONS.indexOf(time) }}
        >
          <span className="text-4xl sm:text-5xl">{time.emoji}</span>
          <div className="text-white font-bold text-xl sm:text-2xl drop-shadow-lg">
            {time.label}
          </div>
          {selectedTime === time.id && (
            <motion.div
              className="absolute -top-2 -right-2 bg-white rounded-full p-2"
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
