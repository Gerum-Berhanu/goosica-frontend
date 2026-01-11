import { cn } from "../utils/devToolkit";
import { DropDown } from "./DropDown";
import Marquee from "react-fast-marquee";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type CardStatus, type CardType } from "../sections/CardSet";
import { useCardSet } from "../../App";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Pause,
  Play,
} from "lucide-react";
import Slider from "rc-slider";

interface CardProps {
  data: CardType;
  cardWidth?: string;
}

export function Card({ data, cardWidth }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEllipsisClicked, setEllipsisClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    setShouldMarquee(text.scrollWidth > container.clientWidth);
  }, [data.title]);

  const [contextData, setContextData] = useCardSet();

  const handleStatus = (song: CardType, status: CardStatus) => {
    setContextData((prev) => {
      // FIXME: LLMs have told me this is not a perfect cloning but a shallow one which may cause a problem
      const superset = { ...prev };
      const focusedCard = superset.state.focusedCard;

      if (status === "onPlay") {
        if (focusedCard.isFocused && focusedCard.id !== song.id) {
          superset.order[focusedCard.id].status = "onNone";
        }
        focusedCard.isFocused = true;
        focusedCard.id = song.id;
        focusedCard.timeline = 0; // currently this has no use
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

  // audio state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // attach event listener that reads the metadata of the audio and set the duration state
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

  // attach event listener that sets the currentTime state every time the audio player's time updates
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

  // play/pause audio based on the value of data.status
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    data.status === "onPlay" ? audio.play() : audio.pause();
  }, [data.status]);

  // // syncing change in the timeline of the card with this play bar
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   setCurrentTime(contextData.state.focusedCard.timeline);
  //   audio.currentTime = contextData.state.focusedCard.timeline;
  // }, [contextData.state.focusedCard.timeline]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-zinc-50 grid grid-rows-[100px_auto] md:grid-rows-[150px_auto] overflow-x-hidden rounded-xl shadow-md/25 shrink-0",
        cardWidth || "w-[150px] md:w-[250px]"
      )}
    >
      {/* Media layer */}
      <audio ref={audioRef} src="./Oblivion.mp3" preload="metadata" />

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
              }}
              stroke="white"
            />
          ) : (
            // onPause or onNone
            <Play
              className="cursor-pointer"
              onClick={() => {
                handleStatus(data, "onPlay");
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
              max={duration}
              value={currentTime}
              onChange={(value) => {
                if (typeof value === "number" && audioRef.current) {
                  audioRef.current.currentTime = value;
                  setCurrentTime(value);
                  // contextData.state.focusedCard.timeline = currentTime;
                }
              }}
            />
          )}
        </div>

        {shouldMarquee ? (
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            <span
              ref={textRef}
              className="text-md md:text-xl px-4 whitespace-nowrap"
            >
              {data.title}
            </span>
          </Marquee>
        ) : (
          <span
            ref={textRef}
            className="text-md md:text-xl px-4 whitespace-nowrap"
          >
            {data.title}
          </span>
        )}

        <span className="text-xs md:text-sm">{data.uploader}</span>
      </div>
    </div>
  );
}
