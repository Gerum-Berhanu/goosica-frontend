import { cn } from "../utils/devToolkit";
import { DropDown } from "./DropDown";
import Marquee from "react-fast-marquee";
import { useLayoutEffect, useRef, useState } from "react";
import { type CardStatus, type CardType } from "../sections/CardSet";
import { useCardSet } from "../../App";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Pause,
  Play
} from "lucide-react";

interface CardProps {
  data: CardType;
  cardWidth?: string;
}

export function Card({data, cardWidth}: CardProps) {
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

  const [ contextData, setContextData ] = useCardSet();

  const handleStatus = (song: CardType, status: CardStatus) => {
    setContextData(prev => {
      const clone = { ...prev };
      clone.order[song.id].status = status;
      return clone;
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-zinc-50 grid grid-rows-[150px_auto] overflow-x-hidden rounded-xl shadow-md/25 shrink-0",
        cardWidth || "w-[250px]",
        isHovered && "shadow-lg/50"
      )}
    >
      {/* ROW 1 - Thumbnail display */}
      <div
        className={cn("grid grid-rows-1 relative", !cardWidth ? "w-[250px]" : null)}
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

        {isEllipsisClicked && <DropDown data={data} tags={data.tags} onClick={setEllipsisClicked} />}

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
            "bg-contain bg-center bg-no-repeat",
            "bg-black"
          )}
        >
        </div>
      </div>

      {/* ROW 2 - Title and uploader display */}
      {shouldMarquee ? (
        <div className={cn("flex flex-col flex-nowrap gap-2 items-center justify-center p-2", !cardWidth ? "w-[250px]" : null)}>
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            <span ref={textRef} className="text-xl px-4 whitespace-nowrap">
              {data.title}
            </span>
          </Marquee>
          <span className="text-sm">{data.uploader}</span>
        </div>
      ) : (
        <div className={cn("flex flex-col flex-nowrap gap-2 items-center justify-center p-2", !cardWidth ? "w-[250px]" : null)}>
          <span ref={textRef} className="text-xl px-4 whitespace-nowrap">
            {data.title}
          </span>
          <span className="text-sm">{data.uploader}</span>
        </div>
      )}
    </div>
  );
}
