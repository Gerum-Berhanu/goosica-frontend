import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Pause,
  Play,
  X,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useLayoutEffect, useRef, useState } from "react";

interface DropdownProps {
  onClick: (newValue: boolean) => void;
}

export function Dropdown({ onClick }: DropdownProps) {
  const dropdownList = ["Add to Favorites", "Add to Queue", "Add to Playlist", "Share", "Download"];

  return (
    <div className="absolute bg-zinc-50 border divide-y-2 flex flex-col rounded-xl shadow-md/25 w-[125px] z-20">

      <div className="p-1 w-full">
        <X
          className="cursor-pointer"
          onClick={() => {
            onClick(false);
          }}
          size="16"
        />
      </div>

      {dropdownList.map((item, index) => (
        <span key={`${index}-${item}`} className="cursor-pointer p-1 text-xs">{item}</span>
      ))}

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
    
    const [onPlay, setOnPlay] = useState(false);

  return (
    <div
    ref={containerRef}
      className={
        "bg-zinc-50 flex flex-col rounded-xl shadow-md/25 shrink-0 " + (cardWidth || "w-[250px]") + " overflow-x-hidden " + (isHovered && "shadow-xl")
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
          {
            onPlay ? (
                <Pause className="cursor-pointer" onClick={()=>{setOnPlay(false)}} stroke="white" />
            ) : (
                <Play className="cursor-pointer" onClick={()=>{setOnPlay(true)}} stroke="white" />
            )
          }
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

interface CardSetProps {
  title: string;
}

export function CardSet({ title }: CardSetProps) {
    const songList = [
        {"id": "A101", "title": "Beat It", "uploader": "Michael Jackson", "imagePath": "./beat-it-thumbnail.jpg"},
        {"id": "A102", "title": "Thriller", "uploader": "Michael Jackson", "imagePath": "./thriller-thumbnail.jpg"},
        {"id": "A103", "title": "Don't Stop Till You Get Enough", "uploader": "Michael Jackson", "imagePath": "./off-the-wall-album-thumbnail.jpg"},
        {"id": "A104", "title": "Lonely Night", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A105", "title": "Starboy", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A106", "title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A107", "title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
        {"id": "A108", "title": "Love to Lay", "uploader": "The Weeknd", "imagePath": "./starboy-album-thumbnail.jpg"},
    ];

  return (
    <div className="flex flex-col gap-4">
      {/* ROW 1 - Title */}
      <div>
        <span className="text-3xl text-shadow-md/20">{title}</span>
      </div>

      {/* ROW 2 - Card set */}
      <div className="flex gap-4 overflow-x-auto pb-2">
      {songList.map(item =>
          <Card
            key={item["id"]}
            title={item["title"]}
            uploader={item["uploader"]}
            imagePath={item["imagePath"]}
          />
        )}
      </div>
    </div>
  );
}

export function CardSetContainer() {
  const CardSetTitles = ["Today's Pick", "Queue", "Favorites", "Downloads"];

  return (
    <div className="flex flex-col gap-8 px-2 md:px-8 py-8">
      {CardSetTitles.map((item, index) => (
        <CardSet key={`${index}-${item}`} title={item} />
      ))}
    </div>
  );
}