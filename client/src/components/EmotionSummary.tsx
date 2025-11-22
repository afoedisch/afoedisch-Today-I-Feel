import { motion } from "framer-motion";
import { useEmotions, TimeOfDay } from "@/lib/stores/useEmotions";
import { X, Sparkles } from "lucide-react";

const TIME_LABELS: Record<TimeOfDay, { label: string; emoji: string }> = {
  morning: { label: "Morning", emoji: "🌅" },
  afternoon: { label: "Afternoon", emoji: "☀️" },
  evening: { label: "Evening", emoji: "🌙" },
};

export function EmotionSummary() {
  const { showSummary, setShowSummary, selectedEmotions } = useEmotions();

  if (!showSummary) return null;

  const emotionCount = selectedEmotions.length;
  const uniqueEmotions = new Set(selectedEmotions.map(e => e.emotion.type)).size;
  
  const handleClose = () => setShowSummary(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-gradient-to-br from-[#E5D5C5] via-[#C8B8A8] to-[#A0B5C2] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border-3 border-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-white drop-shadow-md" />
            <h2 className="text-white font-bold text-3xl drop-shadow-md">
              Your Feelings Today
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="bg-white/90 rounded-full p-2 hover:bg-white transition-colors shadow-md border border-gray-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-white drop-shadow-lg">
                {emotionCount}
              </div>
              <div className="text-white/90 text-lg mt-1">
                Total Feelings
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white drop-shadow-lg">
                {uniqueEmotions}
              </div>
              <div className="text-white/90 text-lg mt-1">
                Different Emotions
              </div>
            </div>
          </div>
        </div>

        {(["morning", "afternoon", "evening"] as TimeOfDay[]).map((time) => {
          const emotionsForTime = selectedEmotions.filter(e => e.timeOfDay === time);
          if (emotionsForTime.length === 0) return null;

          return (
            <div key={time} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{TIME_LABELS[time].emoji}</span>
                <h3 className="text-white font-bold text-2xl drop-shadow-lg">
                  {TIME_LABELS[time].label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {emotionsForTime.map((selected, idx) => (
                  <motion.div
                    key={`${selected.emotion.id}-${selected.timestamp}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl shadow-md border-2 border-white"
                    style={{ backgroundColor: selected.emotion.color }}
                  >
                    <span className="text-3xl">{selected.emotion.emoji}</span>
                    <span className="text-white font-semibold text-lg">
                      {selected.emotion.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

        {emotionCount === 0 && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🤔</div>
            <p className="text-white text-xl">
              You haven't logged any emotions yet. Start by selecting a time of day!
            </p>
          </div>
        )}

        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-6">
          <p className="text-white text-center text-lg">
            🌟 Remember: All feelings are okay! You're doing great by sharing them! 💖
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
