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
  imageHeight?: string;
}

export function Card({
  title,
  uploader,
  cardWidth,
  imagePath,
  imageHeight = "150px",
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
      className={
        "bg-zinc-50 flex flex-col rounded-xl shadow-md/25 shrink-0 " +
        (cardWidth || "w-[250px]") +
        " overflow-x-hidden " +
        (isHovered && "shadow-xl")
      }
    >
      {/* ROW 1 - Thumbnail display */}
      <div
        className="grid grid-rows-1 relative"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <EllipsisVertical
          className="absolute cursor-pointer z-20"
          onClick={() => {
            setEllipsisClicked(true);
          }}
          stroke="white"
        />

        {/* DropDown list feature is implemented here */}
        {isEllipsisClicked && <DropDown onClick={setEllipsisClicked} />}

        <div
          className={
            "absolute bg-black/50 grid grid-cols-3 h-full items-center justify-items-center w-full z-10 " +
            (!isHovered && "hidden")
          }
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

        <div className="bg-black w-full">
          <img
            src={imagePath}
            alt="Music Thumbnail"
            style={{ height: imageHeight }}
            className={"object-contain place-self-center w-auto"}
          />
        </div>
      </div>

      {/* ROW 2 - Title and uploader display */}
      {shouldMarquee ? (
        <div className="flex flex-col flex-nowrap gap-2 items-center justify-center p-2">
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            <span ref={textRef} className="text-xl px-4 whitespace-nowrap">
              {title}
            </span>
          </Marquee>
          <span className="text-sm">{uploader}</span>
        </div>
      ) : (
        <div className="flex flex-col flex-nowrap gap-2 items-center justify-center p-2">
          <span ref={textRef} className="text-xl px-4 whitespace-nowrap">
            {title}
          </span>
          <span className="text-sm">{uploader}</span>
        </div>
      )}
    </div>
  );
}
