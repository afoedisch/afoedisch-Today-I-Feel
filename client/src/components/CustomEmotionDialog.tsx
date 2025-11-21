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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-purple-700 text-center">
            ✨ What Are You Feeling?
          </DialogTitle>
          <DialogDescription className="text-lg text-purple-600 text-center">
            Type in your own special feeling!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="e.g., creative, energetic, peaceful..."
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-lg px-4 py-6 border-2 border-purple-300 focus:border-purple-500 bg-white"
            maxLength={20}
            autoFocus
          />
          <div className="flex gap-3">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 text-lg py-6 border-2 border-purple-300"
            >
              Cancel
            </Button>
            <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSubmit}
                disabled={!customEmotion.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold"
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
