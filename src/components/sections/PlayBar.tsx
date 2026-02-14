import Slider from "rc-slider";
import { ArrowLeftToLine, ArrowRightToLine, Pause, Play } from "lucide-react";
import { useContext, useEffect, useRef } from "react";
import { AudioContext } from "../context/AudioProvider";
import { useSongState } from "../context/SongProvider";
import { useFocusedCard } from "../context/FocusedCardProvider";
import Marquee from "react-fast-marquee";
import { useShouldMarquee } from "../../hooks/useShouldMarquee";
import { usePlaybackActions } from "../../hooks/usePlaybackActions";

function formatTime(seconds: number | undefined): string {
  if (seconds === undefined || isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const paddedSecs = secs < 10 ? `0${secs}` : secs;

  return `${mins}:${paddedSecs}`;
}

export function PlayBar() {
  const [focusedCard, setFocusedCard] = useFocusedCard();
  const songState = useSongState();
  const { handleStatus, handleNext, handlePrevious } = usePlaybackActions();
  const audio = useContext(AudioContext);

  const currentSong = songState[focusedCard.id];

  const containerRef = useRef<HTMLDivElement>(null);
  const textRefTitle = useRef<HTMLSpanElement>(null);
  const textRefUploader = useRef<HTMLSpanElement>(null);
  const shouldMarqueeTitle = useShouldMarquee(containerRef, textRefTitle, currentSong?.title ?? "");
  const shouldMarqueeUploader = useShouldMarquee(containerRef, textRefUploader, currentSong?.uploader ?? "");

  useEffect(() => {
    if (focusedCard.isFocused && focusedCard.id && !songState[focusedCard.id]) {
      setFocusedCard({ isFocused: false, id: "" });
    }
  }, [focusedCard.isFocused, focusedCard.id, songState, setFocusedCard]);

  if (!audio) return null;
  if (!currentSong) return null;

  return (
    <div className="bg-slate-200 md:hidden flex shadow-md-all w-full">
      <div className="grid grid-cols-5 grid-flow-row w-full">
        <div
          style={{ backgroundImage: `url(${currentSong.imagePath})` }}
          className="bg-contain bg-center bg-no-repeat bg-slate-300"
        />

        <div ref={containerRef} className="col-span-2">
          <div className="flex flex-col items-start px-2">
            <span ref={textRefTitle} className="absolute invisible text-md whitespace-nowrap">
              {currentSong.title}
            </span>
            {shouldMarqueeTitle ? (
              <Marquee gradient={false} speed={50} pauseOnHover={true} pauseOnClick={true}>
                <span className="text-md whitespace-nowrap">
                  {currentSong.title}
                  <span className="px-4">·</span>
                </span>
              </Marquee>
            ) : (
              <span className="text-md whitespace-nowrap">{currentSong.title}</span>
            )}

            <span ref={textRefUploader} className="absolute invisible text-xs">
              {currentSong.uploader}
            </span>
            {shouldMarqueeUploader ? (
              <Marquee gradient={false} speed={50} pauseOnHover={true} pauseOnClick={true}>
                <span className="text-xs">
                  {currentSong.uploader}
                  <span className="px-4">·</span>
                </span>
              </Marquee>
            ) : (
              <span className="text-xs">{currentSong.uploader}</span>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex h-full items-center justify-evenly w-full">
            <ArrowLeftToLine className="cursor-pointer" stroke="black" onClick={handlePrevious} />
            {currentSong.status === "onPause" ? (
              <Play
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  handleStatus(currentSong, "onPlay");
                  audio.audioRef.current?.play();
                }}
              />
            ) : (
              <Pause
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  handleStatus(currentSong, "onPause");
                  audio.audioRef.current?.pause();
                }}
              />
            )}
            <ArrowRightToLine className="cursor-pointer" stroke="black" onClick={handleNext} />
          </div>
        </div>

        <div className="col-span-5 flex gap-2 items-end justify-center px-4">
          <Slider
            min={0}
            max={audio.duration || 0}
            value={audio.currentTime}
            onChange={(value) => {
              if (typeof value === "number") {
                audio.seek(value);
              }
            }}
          />
          <div className="flex gap-1">
            <span>{formatTime(audio.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(audio.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
