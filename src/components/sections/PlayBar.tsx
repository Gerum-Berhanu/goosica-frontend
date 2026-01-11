import Slider from "rc-slider";
import { ArrowLeftToLine, ArrowRightToLine, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CardStatus, CardType } from "./CardSet";
import { useCardSet } from "../../App";

function formatTime(seconds: number | undefined): string {
  if (seconds === undefined || isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // Pad seconds with leading zero if less than 10
  const paddedSecs = secs < 10 ? `0${secs}` : secs;

  return `${mins}:${paddedSecs}`;
}

export function PlayBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const [contextData, setContextData ] = useCardSet();
  const currentSong = contextData.order[contextData.state.focusedCard.id];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    currentSong.status === "onPlay" ? audio.play() : audio.pause();
  }, [currentSong.status]);

  useEffect(() => {
    setCurrentTime(0);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
  }, [currentSong.id]);

  const handleStatus = (song: CardType, status: CardStatus) => {
    setContextData((prev) => {
      // FIXME: LLMs have told me this is not a perfect cloning but a shallow one which may cause a problem
      const superset = { ...prev };
      const focusedCard = superset.state.focusedCard;

      if (status === "onPlay") {
        // if another song was playing previously, reset everything related to it
        if (focusedCard.isFocused && focusedCard.id !== song.id) {
          console.log("is entering here #1")
          superset.order[focusedCard.id].status = "onNone";
          focusedCard.timeline = 0;
        }
        focusedCard.isFocused = true;
        focusedCard.id = song.id;
      }

      // if the song is new (from search results) add it to the superset
      if (!superset.order[song.id]) {
        superset.order[song.id] = song;
      }

      superset.state.focusedCard = focusedCard;
      superset.order[song.id].status = status;
      return superset;
    });
  };

  return (
    <div className="bg-slate-200 md:hidden flex shadow-md-all w-full">
      {/* Media layer */}
      <audio ref={audioRef} src="./Oblivion.mp3" preload="metadata" />

      {/* UI layer */}
      <div className="grid grid-cols-5 grid-flow-row w-full">
        {/* row 1 and 2, col 1 */}
        <div
          style={{ backgroundImage: `url(${currentSong.imagePath})` }}
          className="bg-contain bg-center bg-no-repeat bg-slate-300"
        ></div>

        {/* row 1, col 2 */}
        <div className="col-span-2">
          <div className="flex flex-col items-start px-2">
            <span className="text-md whitespace-nowrap">{currentSong.title}</span>
            <span className="text-xs">{currentSong.uploader}</span>
          </div>
        </div>

        {/* row 1, col 3 */}
        <div className="col-span-2">
          <div className="flex h-full items-center justify-evenly w-full">
            <ArrowLeftToLine className="cursor-pointer" stroke="black" />
            {currentSong.status === "onPause" ? (
              <Play
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  handleStatus(currentSong, "onPlay");
                }}
              />
            ) : (
              <Pause
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  handleStatus(currentSong, "onPause")
                }}
              />
            )}
            <ArrowRightToLine className="cursor-pointer" stroke="black" />
          </div>
        </div>

        {/* row 2, col 2 and 3 */}
        <div className="col-span-5 flex gap-2 items-center justify-center px-4">
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={(value) => {
              if (typeof value === "number" && audioRef.current) {
                audioRef.current.currentTime = value;
                setCurrentTime(() => value);
              }
            }}
          />
          <div className="flex gap-1">
            <span>{formatTime(audioRef.current?.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(audioRef.current?.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
