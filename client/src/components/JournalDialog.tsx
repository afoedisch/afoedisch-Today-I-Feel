import { useState } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JournalDialogProps {
  isOpen: boolean;
  emotionLabel: string;
  emotionEmoji: string;
  onSave: (note: string) => void;
  onSkip: () => void;
  onClose: () => void;
}

export function JournalDialog({ 
  isOpen, 
  emotionLabel, 
  emotionEmoji, 
  onSave, 
  onSkip,
  onClose 
}: JournalDialogProps) {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(note);
    setNote("");
  };

  const handleSkip = () => {
    onSkip();
    setNote("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{emotionEmoji}</span>
            <h2 className="text-white font-bold text-2xl drop-shadow-lg">
              Why did you feel {emotionLabel}?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tell me what happened... (Optional)"
            className="w-full min-h-[120px] text-lg p-4 rounded-xl border-2 border-white bg-white/90 focus:bg-white resize-none"
            maxLength={500}
          />
          <div className="text-white/80 text-sm mt-2 text-right">
            {note.length}/500
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg py-6 rounded-xl shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Save
          </Button>
          <Button
            onClick={handleSkip}
            variant="outline"
            className="flex-1 bg-white/90 hover:bg-white text-purple-600 font-bold text-lg py-6 rounded-xl shadow-lg border-2 border-white"
          >
            Skip
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
