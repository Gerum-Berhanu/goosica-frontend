import { cn } from "../utils/devToolkit";
import { DropDown } from "./DropDown";
import Marquee from "react-fast-marquee";
import { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Pause,
  Play
} from "lucide-react";


interface CardProps {
  title: string;
  uploader: string;
  cardWidth?: string;
  imagePath: string;
}

export function Card({
  title,
  uploader,
  cardWidth,
  imagePath
}: CardProps) {
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
  }, [title]);

  const [onPlay, setOnPlay] = useState(false);

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

        {isEllipsisClicked && <DropDown onClick={setEllipsisClicked} />}

        {/* The previous, play/pause, and next buttons */}
        <div
          className={cn(
            "absolute bg-black/50 grid grid-cols-3 h-full items-center justify-items-center w-full z-10",
            !isHovered && "hidden"
          )}
        >
          <ArrowLeftToLine className="cursor-pointer" stroke="white" />
          {onPlay ? (
            <Pause
              className="cursor-pointer"
              onClick={() => {
                setOnPlay(false);
              }}
              stroke="white"
            />
          ) : (
            <Play
              className="cursor-pointer"
              onClick={() => {
                setOnPlay(true);
              }}
              stroke="white"
            />
          )}
          <ArrowRightToLine className="cursor-pointer" stroke="white" />
        </div>

        {/* The actual thumbnail container */}
        <div
          style={{ backgroundImage: `url(${imagePath})` }}
          className={cn(
            "bg-contain bg-center bg-no-repeat",
            "bg-black"
          )}
        >
          {/* <img
            src={imagePath}
            alt="Music Thumbnail"
            className={"object-contain place-self-center w-auto"}
          /> */}
        </div>
      </div>

      {/* ROW 2 - Title and uploader display */}
      {shouldMarquee ? (
        <div className={cn("flex flex-col flex-nowrap gap-2 items-center justify-center p-2", !cardWidth ? "w-[250px]" : null)}>
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            <span ref={textRef} className="text-xl px-4 whitespace-nowrap">
              {title}
            </span>
          </Marquee>
          <span className="text-sm">{uploader}</span>
        </div>
      ) : (
        <div className={cn("flex flex-col flex-nowrap gap-2 items-center justify-center p-2", !cardWidth ? "w-[250px]" : null)}>
          <span ref={textRef} className="text-xl px-4 whitespace-nowrap">
            {title}
          </span>
          <span className="text-sm">{uploader}</span>
        </div>
      )}
    </div>
  );
}
