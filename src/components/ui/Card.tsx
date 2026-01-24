import { cn } from "../utils/devToolkit";
import { DropDown } from "./DropDown";
import Marquee from "react-fast-marquee";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { type CardStatus, type CardType } from "../sections/CardSet";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Pause,
  Play,
} from "lucide-react";
import Slider from "rc-slider";
import { AudioContext } from "../context/AudioProvider";
import { useSongDispatch } from "../context/SongProvider";
import { useFocusedCard } from "../context/FocusedCardProvider";
import { useTagDispatch } from "../context/TagProvider";

interface CardProps {
  data: CardType;
  cardWidth?: string;
}

export function Card({ data, cardWidth }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEllipsisClicked, setEllipsisClicked] = useState(false);

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
  }, [data.title]);

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
  }, [data.uploader]);
  // [END]

  
  const [, setFocusedCard] = useFocusedCard();
  const songDispatch = useSongDispatch();
  const tagDispatch = useTagDispatch();

  const audio = useContext(AudioContext);
  if (!audio) return;

  const handleStatus = (song: CardType, status: CardStatus) => {
    setFocusedCard((prev) => {
      let cloneFocused = {...prev};

      if (status === "onPlay") {
        songDispatch({ type: "UPDATE_STATUS", status: "onPlay", id: song.id });

        // add the song to the recently played set
        if (!song.tags.includes("t")) {
          console.log("added to recently played.")
          songDispatch({ type: "ADD_TAG", tag: "t", id: song.id });
          tagDispatch({ type: "APPEND", tag: "t", id: song.id });
        }
        
        // if another song was playing previously, reset everything related to it
        if (cloneFocused.isFocused && cloneFocused.id !== song.id) {
          songDispatch({ type: "UPDATE_STATUS", status: "onNone", id: cloneFocused.id });
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

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-zinc-50 grid grid-rows-[100px_auto] md:grid-rows-[150px_auto] overflow-x-hidden rounded-xl shadow-md/25 shrink-0",
        cardWidth || "w-[150px] md:w-[250px]"
      )}
    >
      {/* ROW 1 - Thumbnail display */}
      <div
        className={cn(
          "grid grid-rows-1 relative",
          !cardWidth ? "w-[150px] md:w-[250px]" : null
        )}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        {/* DropDown list feature is implemented here */}
        <button
          className="absolute cursor-pointer z-20"
          onClick={() => {
            setEllipsisClicked(true);
          }}
        >
          <EllipsisVertical stroke="white" />
        </button>

        {isEllipsisClicked && (
          <DropDown data={data} tags={data.tags} onClick={setEllipsisClicked} />
        )}

        {/* The previous, play/pause, and next buttons */}
        <div
          className={cn(
            "absolute bg-black/50 grid grid-cols-3 h-full items-center justify-items-center w-full z-10",
            !isHovered && "hidden"
          )}
        >
          <ArrowLeftToLine className="cursor-pointer" stroke="white" />
          {data.status === "onPlay" ? (
            <Pause
              className="cursor-pointer"
              onClick={() => {
                handleStatus(data, "onPause");
                if (!audio.audioRef.current) return;
                const currentAudio = audio.audioRef.current;
                currentAudio.pause();
              }}
              stroke="white"
            />
          ) : (
            // onPause or onNone
            <Play
              className="cursor-pointer"
              onClick={() => {
                handleStatus(data, "onPlay");
                if (!audio.audioRef.current) return;
                const currentAudio = audio.audioRef.current;
                currentAudio.play();
              }}
              stroke="white"
            />
          )}
          <ArrowRightToLine className="cursor-pointer" stroke="white" />
        </div>

        {/* The actual thumbnail container */}
        <div
          style={{ backgroundImage: `url(${data.imagePath})` }}
          className={cn(
            "bg-contain bg-center bg-no-repeat bg-black",
            "flex items-end"
          )}
        ></div>
      </div>

      {/* ROW 2 - Title and uploader display */}
      <div
        className={cn(
          "flex flex-col flex-nowrap gap-2 items-center justify-center p-2 relative",
          !cardWidth ? "w-[150px] md:w-[250px]" : null
        )}
      >
        <div className="absolute inset-x-0 top-0 p-0 w-full">
          {data.status !== "onNone" && (
            <Slider
              min={0}
              max={audio.audioRef.current?.duration}
              value={audio.audioRef.current?.currentTime}
              onChange={(value) => {
                if (typeof value === "number" && audio.audioRef.current) {
                  audio.audioRef.current.currentTime = value;
                  // setCurrentTime(value);
                  // contextData.state.focusedCard.timeline = currentTime;
                }
              }}
            />
          )}
        </div>

        {/* Marquee logic henceforth */}

        {/* [Title] measurement node */}
        <span
          ref={textRefTitle}
          className="absolute invisible text-md md:text-xl px-4 whitespace-nowrap"
        >
          {data.title}
        </span>

        {/* [Title] presentation node */}
        {shouldMarqueeTitle ? (
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            <span className="text-md md:text-xl whitespace-nowrap">
              {data.title}
              <span className="px-4">·</span>
            </span>
          </Marquee>
        ) : (
          <span className="text-md md:text-xl px-4 whitespace-nowrap">
            {data.title}
          </span>
        )}

        {/* [Uploader] measurement node */}
        <span
          ref={textRefUploader}
          className="absolute invisible text-xs md:text-sm whitespace-nowrap"
        >
          {data.uploader}
        </span>

        {/* [Uploader] presentation node */}
        {shouldMarqueeUploader ? (
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            <span className="text-xs md:text-sm whitespace-nowrap">
              {data.uploader}
              <span className="px-4">·</span>
            </span>
          </Marquee>
        ) : (
          <span className="text-xs md:text-sm whitespace-nowrap">
            {data.uploader}
          </span>
        )}
      </div>
    </div>
  );
}
