import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Play,
  X,
} from "lucide-react";
import { useState } from "react";

interface DropdownProps {
    onClick: (newValue: boolean)=>void;
}

export function Dropdown({ onClick }: DropdownProps) {
    // const dropdownList = ["Add to Favorites", "Add to Queue", "Add to Playlist", "Share", "Download"];
    return (
      <div className="absolute bg-slate-200 border-2 divide-y-2 flex flex-col w-[125px] z-20">
        <div className="p-1 w-full">
          <X className="cursor-pointer" onClick={()=>{onClick(false)}} size="16" />
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
  imagePath?: string;
  imageWidth?: string;
}

export function Card({ title, uploader, imageWidth = "250px" }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEllipsisClicked, setEllipsisClicked] = useState(false);

  return (
    <div
      className={
        "border-2 flex flex-col flex-none " + (isHovered && "shadow-xl")
      }
    >
      {/* ROW 1 - Thumbnail display */}
      <div
        className="relative"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >

        <EllipsisVertical
          className="absolute cursor-pointer z-20"
          onClick={() => {setEllipsisClicked(true)}}
          stroke="white"
        />

        {isEllipsisClicked && <Dropdown onClick={setEllipsisClicked}/>}

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

        <img
          src="./starboy-album-thumbnail.jpg"
          alt="Music Thumbnail"
          className={"w-[" + imageWidth + "]"}
        />

      </div>

      {/* ROW 2 - Title and uploader display */}
      <div className="flex flex-col gap-2 items-center justify-center p-2 w-full">
        <span className="text-xl">{title}</span>
        <span className="text-sm">{uploader}</span>
      </div>
    </div>
  );
}

interface CardRowProps {
  title: string;
}

export default function CardRow({ title }: CardRowProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* ROW 1 - Title */}
      <div>
        <span className="text-3xl">{title}</span>
      </div>

      {/* ROW 2 - Card set */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Card title="Love to Lay" uploader="The Weeknd" />
        <Card title="Lonely Night" uploader="The Weeknd" />
        <Card title="Starboy" uploader="The Weeknd" />
        <Card title="Feel It Coming" uploader="The Weeknd" />
        <Card title="Love to Lay" uploader="The Weeknd" />
        <Card title="Love to Lay" uploader="The Weeknd" />
      </div>
    </div>
  );
}
