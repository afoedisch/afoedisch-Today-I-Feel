import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmotions, EMOTIONS, TimeOfDay } from "@/lib/stores/useEmotions";
import { useAudio } from "@/lib/stores/useAudio";
import { EmotionCard } from "@/components/EmotionCard";
import { TimeOfDaySelector } from "@/components/TimeOfDaySelector";
import { EmotionTimeline } from "@/components/EmotionTimeline";
import { PositiveMessage } from "@/components/PositiveMessage";
import { EmotionSummary } from "@/components/EmotionSummary";
import { SoundManager } from "@/components/SoundManager";
import { CustomEmotionDialog } from "@/components/CustomEmotionDialog";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, Volume2, VolumeX } from "lucide-react";
import "@fontsource/inter";

function App() {
  const { currentTimeOfDay, setCurrentTimeOfDay, selectEmotion, setShowSummary, clearDay, selectedEmotions } = useEmotions();
  const { playSuccess, toggleMute, isMuted } = useAudio();
  const [showMessage, setShowMessage] = useState(false);
  const [lastEmotionLabel, setLastEmotionLabel] = useState<string>("");
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const handleEmotionClick = (emotionId: string) => {
    if (!currentTimeOfDay) {
      alert("Please select a time of day first! 🌅☀️🌙");
      return;
    }

    if (emotionId === "other") {
      setShowCustomDialog(true);
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

  const handleCustomEmotionSubmit = (customLabel: string) => {
    if (!currentTimeOfDay) return;

    const otherEmotion = EMOTIONS.find(e => e.id === "other");
    if (otherEmotion) {
      const customEmotion = {
        ...otherEmotion,
        id: `other-${crypto.randomUUID()}`,
        customLabel,
        label: customLabel,
      };
      selectEmotion(customEmotion, currentTimeOfDay);
      setLastEmotionLabel(customLabel);
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
    <div className="w-full h-screen bg-gradient-to-r from-amber-200 via-orange-200 to-teal-400 overflow-y-auto overflow-x-hidden">
      <SoundManager />
      
      <div className="container mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              Today I Feel...
            </h1>
          </div>
          <p className="text-white text-xl sm:text-2xl md:text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-light">
            Let's explore your feelings together
          </p>
        </motion.div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            onClick={() => setShowSummary(true)}
            size="lg"
            className="bg-white/90 hover:bg-white text-teal-700 font-semibold text-lg px-6 py-6 rounded-2xl shadow-md border-2 border-white/50"
          >
            View My Day
          </Button>
          <Button
            onClick={handleClearDay}
            size="lg"
            variant="outline"
            className="bg-white/70 hover:bg-white/90 text-teal-700 font-semibold text-lg px-6 py-6 rounded-2xl shadow-md border-2 border-white"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            New Day
          </Button>
          <Button
            onClick={toggleMute}
            size="lg"
            variant="outline"
            className="bg-white/70 hover:bg-white/90 text-teal-700 font-semibold text-lg px-6 py-6 rounded-2xl shadow-md border-2 border-white"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>

        {/* Time of Day Selector */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white font-semibold text-3xl sm:text-4xl text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
          >
            Choose a time of day
          </motion.h2>
          <TimeOfDaySelector
            selectedTime={currentTimeOfDay}
            onSelectTime={setCurrentTimeOfDay}
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
              <h2 className="text-white font-semibold text-3xl sm:text-4xl text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                How did you feel?
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
            <h2 className="text-white font-semibold text-3xl sm:text-4xl text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              Your Feelings Today
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

        {/* Custom Emotion Dialog */}
        <CustomEmotionDialog
          open={showCustomDialog}
          onOpenChange={setShowCustomDialog}
          onSubmit={handleCustomEmotionSubmit}
        />
      </div>
    </div>
  );
}

export default App;
