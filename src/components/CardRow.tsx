import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Play,
  X,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useLayoutEffect, useRef, useState } from "react";

interface DropdownProps {
  onClick: (newValue: boolean) => void;
}

export function Dropdown({ onClick }: DropdownProps) {
  // const dropdownList = ["Add to Favorites", "Add to Queue", "Add to Playlist", "Share", "Download"];
  return (
    <div className="absolute bg-slate-200 border-2 divide-y-2 flex flex-col w-[125px] z-20">
      <div className="p-1 w-full">
        <X
          className="cursor-pointer"
          onClick={() => {
            onClick(false);
          }}
          size="16"
        />
      </div>
      <span className="cursor-pointer p-1 text-xs">Add to Favorites</span>
      <span className="cursor-pointer p-1 text-xs">Add to Queue</span>
      <span className="cursor-pointer p-1 text-xs">Add to Playlist</span>
      <span className="cursor-pointer p-1 text-xs">Share</span>
      <span className="cursor-pointer p-1 text-xs">Download</span>
    </div>
  );
}

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

  return (
    <div
    ref={containerRef}
      className={
        "border-2 flex flex-col shrink-0 " + (cardWidth || "w-[250px]") + " overflow-x-hidden " + (isHovered && "shadow-xl")
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

        {/* Dropdown list feature is implemented here */}
        {isEllipsisClicked && <Dropdown onClick={setEllipsisClicked} />}

        <div
          className={
            "absolute bg-black/50 grid grid-cols-3 h-full items-center justify-items-center w-full z-10 " +
            (!isHovered && "hidden")
          }
        >
          <ArrowLeftToLine className="cursor-pointer" stroke="white" />
          <Play className="cursor-pointer" stroke="white" />
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
                <span ref={textRef} className="text-xl px-4 whitespace-nowrap">{title}</span>
            </Marquee>
            <span className="text-sm">{uploader}</span>
        </div>
      ) : (
        <div className="flex flex-col flex-nowrap gap-2 items-center justify-center p-2">
            <span ref={textRef} className="text-xl px-4 whitespace-nowrap">{title}</span>
            <span className="text-sm">{uploader}</span>
        </div>
      )}
    </div>
  );
}

interface CardRowProps {
  title: string;
}

export default function CardRow({ title }: CardRowProps) {
    const songList = [
        {"title": "Beat It", "uploader": "Michael Jackson", "imagePath": "./beat-it-thumbnail.jpg"},
        {"title": "Thriller", "uploader": "Michael Jackson", "imagePath": "./thriller-thumbnail.jpg"},
        {"title": "Don't Stop Till You Get Enough", "uploader": "Michael Jackson", "imagePath": "./off-the-wall-album-thumbnail.jpg"},
        {"title": "Lonely Night", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"title": "Starboy", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
    ];

  return (
    <div className="flex flex-col gap-4">
      {/* ROW 1 - Title */}
      <div>
        <span className="text-3xl">{title}</span>
      </div>

      {/* ROW 2 - Card set */}
      <div className="flex gap-4 overflow-x-auto pb-2">
      {songList.map(item =>
          <Card
            key={item["title"]}
            title={item["title"]}
            uploader={item["uploader"]}
            imagePath={item["imagePath"]}
          />
        )}
      </div>
    </div>
  );
}
