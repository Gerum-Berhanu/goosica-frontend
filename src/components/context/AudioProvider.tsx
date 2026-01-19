import { createContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  load: (src: string) => void;
  seek: (time: number) => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onMeta = () => setDuration(audio.duration);
    const onTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    
    return () => {
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const load = (src: string) => {
    if (!audioRef.current) return;
    audioRef.current.src = src;
    setCurrentTime(0)
    audioRef.current.play();
  }

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  return (
    <AudioContext value={{ audioRef, currentTime, duration, load, seek }}>
      {children}
      <audio ref={audioRef} preload="metadata"/>
    </AudioContext>
  )
}