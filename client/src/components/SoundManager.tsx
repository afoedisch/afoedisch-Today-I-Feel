import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function SoundManager() {
  const { setHitSound, setSuccessSound, setBackgroundMusic } = useAudio();

  useEffect(() => {
    // Load sounds
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");
    const bgMusic = new Audio("/sounds/background.mp3");
    
    // Configure background music
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    
    // Set sounds in store
    setHitSound(hitSound);
    setSuccessSound(successSound);
    setBackgroundMusic(bgMusic);
    
    console.log("Sound manager initialized");
  }, [setHitSound, setSuccessSound, setBackgroundMusic]);

  return null;
}
