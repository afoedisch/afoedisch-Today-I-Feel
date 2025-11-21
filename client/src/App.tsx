import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmotions, EMOTIONS, TimeOfDay } from "@/lib/stores/useEmotions";
import { useAudio } from "@/lib/stores/useAudio";
import { EmotionCard } from "@/components/EmotionCard";
import { TimeOfDaySelector } from "@/components/TimeOfDaySelector";
import { EmotionTimeline } from "@/components/EmotionTimeline";
import { PositiveMessage } from "@/components/PositiveMessage";
import { EmotionSummary } from "@/components/EmotionSummary";
import { SoundManager } from "@/components/SoundManager";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, Volume2, VolumeX } from "lucide-react";
import "@fontsource/inter";

function App() {
  const { currentTimeOfDay, setCurrentTimeOfDay, selectEmotion, setShowSummary, clearDay, selectedEmotions } = useEmotions();
  const { playSuccess, toggleMute, isMuted } = useAudio();
  const [showMessage, setShowMessage] = useState(false);
  const [lastEmotionLabel, setLastEmotionLabel] = useState<string>("");

  const handleEmotionClick = (emotionId: string) => {
    if (!currentTimeOfDay) {
      alert("Please select a time of day first! 🌅☀️🌙");
      return;
    }

    const emotion = EMOTIONS.find(e => e.id === emotionId);
    if (emotion) {
      selectEmotion(emotion, currentTimeOfDay);
      setLastEmotionLabel(emotion.label);
      setShowMessage(true);
      playSuccess();

      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  const handleClearDay = () => {
    if (selectedEmotions.length > 0) {
      if (confirm("Are you sure you want to start a new day? This will clear all your emotions.")) {
        clearDay();
      }
    } else {
      clearDay();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 overflow-auto">
      <SoundManager />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              My Feelings Today
            </h1>
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
          </div>
          <p className="text-white text-lg sm:text-xl md:text-2xl drop-shadow-md">
            How did you feel today? Let's track your emotions!
          </p>
        </motion.div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            onClick={() => setShowSummary(true)}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg px-6 py-6 rounded-xl shadow-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            View My Day
          </Button>
          <Button
            onClick={handleClearDay}
            size="lg"
            variant="outline"
            className="bg-white/80 hover:bg-white text-purple-600 font-bold text-lg px-6 py-6 rounded-xl shadow-lg border-2 border-purple-300"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            New Day
          </Button>
          <Button
            onClick={toggleMute}
            size="lg"
            variant="outline"
            className="bg-white/80 hover:bg-white text-purple-600 font-bold text-lg px-6 py-6 rounded-xl shadow-lg border-2 border-purple-300"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>

        {/* Time of Day Selector */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-bold text-2xl sm:text-3xl text-center mb-6 drop-shadow-lg"
          >
            1️⃣ Choose a time of day
          </motion.h2>
          <TimeOfDaySelector
            selectedTime={currentTimeOfDay}
            onSelectTime={(time) => setCurrentTimeOfDay(time)}
          />
        </div>

        {/* Emotion Grid */}
        <AnimatePresence>
          {currentTimeOfDay && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <h2 className="text-white font-bold text-2xl sm:text-3xl text-center mb-6 drop-shadow-lg">
                2️⃣ How did you feel?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                {EMOTIONS.map((emotion, index) => (
                  <motion.div
                    key={emotion.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <EmotionCard
                      emotion={emotion}
                      onClick={() => handleEmotionClick(emotion.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline - Show when emotions have been selected */}
        {selectedEmotions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-6xl mx-auto"
          >
            <h2 className="text-white font-bold text-2xl sm:text-3xl text-center mb-6 drop-shadow-lg">
              📅 Your Emotions Timeline
            </h2>
            <EmotionTimeline
              timeOfDay="morning"
              label="Morning"
              emoji="🌅"
              gradient="linear-gradient(135deg, #FFA726 0%, #FFE082 100%)"
            />
            <EmotionTimeline
              timeOfDay="afternoon"
              label="Afternoon"
              emoji="☀️"
              gradient="linear-gradient(135deg, #42A5F5 0%, #90CAF9 100%)"
            />
            <EmotionTimeline
              timeOfDay="evening"
              label="Evening"
              emoji="🌙"
              gradient="linear-gradient(135deg, #5C6BC0 0%, #9FA8DA 100%)"
            />
          </motion.div>
        )}

        {/* Positive Reinforcement Message */}
        <PositiveMessage show={showMessage} emotionLabel={lastEmotionLabel} />

        {/* Summary Modal */}
        <EmotionSummary />
      </div>
    </div>
  );
}

export default App;
