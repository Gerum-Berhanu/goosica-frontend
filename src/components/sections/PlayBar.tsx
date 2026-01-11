import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { ArrowLeftToLine, ArrowRightToLine, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function PlayBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ duration, setDuration ] = useState<number>(0);
  const [ currentTime, setCurrentTime ] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio)
      return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio)
      return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="bg-slate-200 md:hidden flex shadow-md-all w-full">

      {/* Media layer */}
      <audio ref={audioRef} src="./Oblivion.mp3" preload="metadata" />

      {/* UI layer */}
      <div className="grid grid-flow-col w-full">
        {/* row 1 and 2, col 1 */}
        <div
          style={{ backgroundImage: `url(./beat-it-thumbnail.jpg)` }}
          className="bg-contain bg-center bg-no-repeat bg-slate-300 row-span-4"
        ></div>

        {/* row 1, col 2 */}
        <div className="col-span-2 row-span-3">
          <div className="flex flex-col items-start px-2">
            <span className="text-xl whitespace-nowrap">Beat It</span>
            <span className="text-sm">Michael Jackson</span>
          </div>
        </div>

        {/* row 2, col 2 and 3 */}
        <div className="col-span-4 px-2">
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={(value) => {
              if (typeof value === "number" && audioRef.current) {
                audioRef.current.currentTime = value;
                setCurrentTime(value);
              }
            }}
          />
        </div>

        {/* row 1, col 3 */}
        <div className="col-span-2 row-span-3">
          <div className="flex h-full items-center justify-evenly w-full">
            <ArrowLeftToLine className="cursor-pointer" stroke="black" />
            {audioRef.current?.paused ? (
              <Play
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  audio.play();
                }}
              />
            ) : (
              <Pause
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  audio.pause();
                }}
              />
            )}
            <ArrowRightToLine className="cursor-pointer" stroke="black" />
          </div>
        </div>
      </div>
    </div>
  );
}
