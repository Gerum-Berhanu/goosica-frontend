import Slider from "rc-slider";
import { ArrowLeftToLine, ArrowRightToLine, Pause, Play } from "lucide-react";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import type { CardStatus, CardType } from "./CardSet";
import { AudioContext } from "../context/AudioProvider";
import { useSongState, useSongDispatch } from "../context/SongProvider";
import { useFocusedCard } from "../context/FocusedCardProvider";
import Marquee from "react-fast-marquee";

function formatTime(seconds: number | undefined): string {
  if (seconds === undefined || isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // Pad seconds with leading zero if less than 10
  const paddedSecs = secs < 10 ? `0${secs}` : secs;

  return `${mins}:${paddedSecs}`;
}

export function PlayBar() {
  const [focusedCard, setFocusedCard] = useFocusedCard();
  const songState = useSongState();
  const songDispatch = useSongDispatch();

  const currentSong = songState[focusedCard.id];

  const audio = useContext(AudioContext);
  if (!audio) return;

  const handleStatus = (song: CardType, status: CardStatus) => {
    setFocusedCard((prev) => {
      let cloneFocused = {...prev};

      if (status === "onPlay") {
        songDispatch({ type: "UPDATE_STATUS", status: "onPlay", id: song.id });
        
        // if another song was playing previously, reset everything related to it
        if (focusedCard.isFocused && focusedCard.id !== song.id) {
          songDispatch({ type: "UPDATE_STATUS", status: "onNone", id: focusedCard.id });
          audio.seek(0); // resetting the timeline whenever a new song is selected
        }

        // if this is the first ever selection or there is a change in music, load a new audio src
        if (!cloneFocused.isFocused || cloneFocused.id !== song.id)
          audio.load(song.src);

        cloneFocused = {...cloneFocused, isFocused: true, id: song.id};
      } else
        songDispatch({ type: "UPDATE_STATUS", status: "onPause", id: song.id });

      return cloneFocused;
    });
  };

  // [START] Marquee functionality for card title and uploader
  const containerRef = useRef<HTMLDivElement>(null);

  // for card title
  const textRefTitle = useRef<HTMLSpanElement>(null);
  const [shouldMarqueeTitle, setShouldMarqueeTitle] = useState(false);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      const text = textRefTitle.current;
  
      if (!container || !text) return;
  
      setShouldMarqueeTitle(text.scrollWidth > container.clientWidth);
    });

    return (() => cancelAnimationFrame(raf));
  }, [currentSong.title]);

  const textRefUploader = useRef<HTMLSpanElement>(null);
  const [shouldMarqueeUploader, setShouldMarqueeUploader] = useState(false);

  // for card uploader
  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      const text = textRefUploader.current;
  
      if (!container || !text) return;
  
      setShouldMarqueeUploader(text.scrollWidth > container.clientWidth);
    });

    return (() => cancelAnimationFrame(raf));
  }, [currentSong.uploader]);
  // [END]

  return (
    <div className="bg-slate-200 md:hidden flex shadow-md-all w-full">
      <div className="grid grid-cols-5 grid-flow-row w-full">
        {/* row 1 and 2, col 1 */}
        <div
          style={{ backgroundImage: `url(${currentSong.imagePath})` }}
          className="bg-contain bg-center bg-no-repeat bg-slate-300"
        ></div>

        {/* row 1, col 2 */}
        {/* Marquee logic here */}
        <div ref={containerRef} className="col-span-2">
          <div className="flex flex-col items-start px-2">
            {/* [Title] measurement node */}
            <span ref={textRefTitle} className="absolute invisible text-md whitespace-nowrap">{currentSong.title}</span>

            {/* [Title] presentation node */}
            {shouldMarqueeTitle ? (
              <Marquee gradient={false} speed={50} pauseOnHover={true} pauseOnClick={true}>
                <span ref={textRefTitle} className="text-md whitespace-nowrap">
                  {currentSong.title}
                  <span className="px-4">·</span>
                </span>
              </Marquee>
            ) : (
              <span className="text-md whitespace-nowrap">{currentSong.title}</span>
            )}

            {/* [Uploader] measurement node */}
            <span ref={textRefUploader} className="absolute invisible text-xs">{currentSong.uploader}</span>

            {/* [Uploader] presentation node */}
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
                  if (!audio.audioRef.current) return;
                  const currentAudio = audio.audioRef.current;
                  currentAudio.play();
                }}
              />
            ) : (
              <Pause
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  handleStatus(currentSong, "onPause");
                  if (!audio.audioRef.current) return;
                  const currentAudio = audio.audioRef.current;
                  currentAudio.pause();
                }}
              />
            )}
            <ArrowRightToLine className="cursor-pointer" stroke="black" />
          </div>
        </div>

        {/* row 2, col 2 and 3 */}
        <div className="col-span-5 flex gap-2 items-end justify-center px-4">
          <Slider
            min={0}
            max={audio.audioRef.current?.duration}
            value={audio.audioRef.current?.currentTime}
            onChange={(value) => {
              if (typeof value === "number" && audio.audioRef.current) {
                audio.audioRef.current.currentTime = value;
              }
            }}
          />
          <div className="flex gap-1">
            <span>{formatTime(audio.audioRef.current?.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(audio.audioRef.current?.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
