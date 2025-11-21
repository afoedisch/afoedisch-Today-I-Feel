import { motion, AnimatePresence } from "framer-motion";
import { TimeOfDay, SelectedEmotion, useEmotions } from "@/lib/stores/useEmotions";
import { X } from "lucide-react";

interface EmotionTimelineProps {
  timeOfDay: TimeOfDay;
  label: string;
  emoji: string;
  gradient: string;
}

export function EmotionTimeline({ timeOfDay, label, emoji, gradient }: EmotionTimelineProps) {
  const { selectedEmotions, removeEmotion } = useEmotions();
  
  const emotionsForTime = selectedEmotions.filter(
    (sel) => sel.timeOfDay === timeOfDay
  );

  return (
    <div className="w-full">
      <div 
        className="rounded-2xl p-6 shadow-lg"
        style={{ background: gradient }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{emoji}</span>
          <h3 className="text-white font-semibold text-2xl drop-shadow-md">{label}</h3>
        </div>
        
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 min-h-[120px]">
          <AnimatePresence>
            {emotionsForTime.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/80 text-center py-8 text-lg"
              >
                No emotions selected yet
              </motion.div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {emotionsForTime.map((selected) => {
                  const uniqueId = `${selected.emotion.id}-${selected.timestamp}`;
                  return (
                    <motion.div
                      key={uniqueId}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="relative group"
                    >
                      <div
                        className="flex items-center gap-2 px-4 py-3 rounded-xl shadow-sm border-2 border-white/70"
                        style={{ backgroundColor: selected.emotion.color }}
                      >
                        <span className="text-3xl">{selected.emotion.emoji}</span>
                        <span className="text-white font-medium text-lg drop-shadow-sm">
                          {selected.emotion.label}
                        </span>
                      </div>
                      <button
                        onClick={() => removeEmotion(uniqueId)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
