import { cn } from "../utils/devToolkit";
import { DropDown } from "./DropDown";
import Marquee from "react-fast-marquee";
import { useContext, useEffect, useRef, useState } from "react";
import { type CardType } from "../sections/CardSet";
import { ArrowLeftToLine, ArrowRightToLine, EllipsisVertical, Pause, Play } from "lucide-react";
import Slider from "rc-slider";
import { AudioContext } from "../context/AudioProvider";
import { usePlaybackActions } from "../../hooks/usePlaybackActions";
import { useShouldMarquee } from "../../hooks/useShouldMarquee";

interface CardProps {
  data: CardType;
  cardWidth?: string;
}

export function Card({ data, cardWidth }: CardProps) {
  const [isEllipsisClicked, setEllipsisClicked] = useState(false);
  const [displayControl, setDisplayControl] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRefTitle = useRef<HTMLSpanElement>(null);
  const textRefUploader = useRef<HTMLSpanElement>(null);
  const controlContainer = useRef<HTMLDivElement>(null);

  const shouldMarqueeTitle = useShouldMarquee(containerRef, textRefTitle, data.title);
  const shouldMarqueeUploader = useShouldMarquee(containerRef, textRefUploader, data.uploader);

  const { handleStatus, handleNext, handlePrevious } = usePlaybackActions();
  const audioContext = useContext(AudioContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (controlContainer.current && !controlContainer.current.contains(event.target as Node)) {
        setDisplayControl(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [displayControl]);

  if (!audioContext) return null;

  return (
    <div
      className={cn(
        "bg-zinc-50 grid grid-rows-[100px_auto] md:grid-rows-[150px_auto] overflow-x-hidden rounded-xl shadow-md/25 shrink-0",
        cardWidth || "w-[150px] md:w-[250px]",
      )}
    >
      <div
        ref={controlContainer}
        className={cn(
          "grid grid-rows-1 relative",
          !cardWidth ? "w-[150px] md:w-[250px]" : null,
        )}
        onClick={() => setDisplayControl(true)}
      >
        <button
          className="absolute cursor-pointer z-20"
          onClick={() => setEllipsisClicked(true)}
        >
          <EllipsisVertical stroke="white" />
        </button>

        {isEllipsisClicked && (
          <DropDown data={data} tags={data.tags} onClick={setEllipsisClicked} />
        )}

        <div
          className={cn(
            "absolute bg-black/50 grid grid-cols-3 h-full items-center justify-items-center w-full z-10",
            !displayControl && "hidden",
          )}
        >
          <ArrowLeftToLine className="cursor-pointer" stroke="white" onClick={handlePrevious} />
          {data.status === "onPlay" ? (
            <Pause
              className="cursor-pointer"
              onClick={() => {
                handleStatus(data, "onPause");
                audioContext.audioRef.current?.pause();
              }}
              stroke="white"
            />
          ) : (
            <Play
              className="cursor-pointer"
              onClick={() => {
                handleStatus(data, "onPlay");
                audioContext.audioRef.current?.play();
              }}
              stroke="white"
            />
          )}
          <ArrowRightToLine className="cursor-pointer" stroke="white" onClick={handleNext} />
        </div>

        <div
          style={{ backgroundImage: `url(${data.imagePath})` }}
          className={cn(
            "bg-contain bg-center bg-no-repeat bg-black",
            "flex items-end",
          )}
        />
      </div>

      <div
        ref={containerRef}
        className={cn(
          "flex flex-col flex-nowrap gap-2 items-center justify-center p-2 relative",
          !cardWidth ? "w-[150px] md:w-[250px]" : null,
        )}
      >
        <div className="absolute inset-x-0 top-0 p-0 w-full">
          {data.status !== "onNone" && (
            <Slider
              min={0}
              max={audioContext.duration || 0}
              value={audioContext.currentTime}
              onChange={(value) => {
                if (typeof value === "number") {
                  audioContext.seek(value);
                }
              }}
            />
          )}
        </div>

        <span
          ref={textRefTitle}
          className="absolute invisible text-md md:text-xl px-4 whitespace-nowrap"
        >
          {data.title}
        </span>
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

        <span
          ref={textRefUploader}
          className="absolute invisible text-xs md:text-sm whitespace-nowrap"
        >
          {data.uploader}
        </span>
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
