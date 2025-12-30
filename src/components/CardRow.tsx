import { EllipsisVertical } from "lucide-react";

interface CardProps {
    title: string,
    uploader: string,
    imagePath?: string,
    imageWidth?: string
}

export function Card({ title, uploader, imageWidth = "250px" }: CardProps) {
    return (
      <div className="border-2 flex flex-col flex-none items-end relative">
        <EllipsisVertical className="absolute cursor-pointer" />
        {/* ROW 1 - Thumbnail display */}
        <div>
          <img className={"w-["+imageWidth+"]"} src="./starboy-album-thumbnail.jpg" alt="" />
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
    title: string,
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
          <Card title="Love to Lay" uploader="The Weeknd"/>
          <Card title="Lonely Night" uploader="The Weeknd"/>
          <Card title="Starboy" uploader="The Weeknd"/>
          <Card title="Feel It Coming" uploader="The Weeknd"/>
          <Card title="Love to Lay" uploader="The Weeknd"/>
          <Card title="Love to Lay" uploader="The Weeknd"/>
        </div>
      </div>
    );
}