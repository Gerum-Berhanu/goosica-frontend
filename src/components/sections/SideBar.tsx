import { Card } from "../ui/Card";
import { LyricsBody } from "../ui/LyricsBody";
import type { CardType } from "./CardSet";

export function SideBar() {
  const tempData: CardType = {
    id: "A101",
    title: "Beat It",
    uploader: "Michael Jackson",
    imagePath: "./beat-it-thumbnail.jpg",
    tags: ["t", "q", "f"],
  };

  return (
    <div className="bg-slate-200 md:flex flex-col gap-4 hidden p-4 md:w-1/3 lg:w-1/4">
      {/* ROW 1 - Logo and app name */}
      <div className="flex gap-2 items-center justify-center">
        <img src="./logo-dark.png" alt="Goosica Dark Logo" width="50" />
        <span className="text-3xl text-shadow-md/20">Goosica</span>
      </div>

      {/* ROW 2 - Now playing card */}
      <div className="flex">
        <Card
          data={tempData}
          cardWidth="w-full"
        />
      </div>

      {/* ROW 3 - Lyrics */}
      <div className="flex flex-col flex-auto gap-4 overflow-y-auto">
        <span className="text-3xl text-shadow-md/20">Lyrics</span>
        <LyricsBody />
      </div>
    </div>
  );
}
