import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomEmotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (customEmotion: string) => void;
}

export function CustomEmotionDialog({ open, onOpenChange, onSubmit }: CustomEmotionDialogProps) {
  const [customEmotion, setCustomEmotion] = useState("");

  const handleSubmit = () => {
    if (customEmotion.trim()) {
      onSubmit(customEmotion.trim());
      setCustomEmotion("");
      onOpenChange(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#E5D5C5] to-[#A0B5C2] border-3 border-white/80 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-700 text-center drop-shadow-sm">
            ✨ What Are You Feeling?
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600 text-center">
            Type in your own special feeling!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="e.g., creative, energetic, peaceful..."
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-lg px-4 py-6 border-2 border-gray-300 focus:border-[#94A8B5] bg-white shadow-sm"
            maxLength={20}
            autoFocus
          />
          <div className="flex gap-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-lg py-6 border-2 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSubmit}
                disabled={!customEmotion.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-[#C8B8A8] to-[#94A8B5] hover:opacity-90 text-white font-semibold shadow-md"
              >
                Add Feeling
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
