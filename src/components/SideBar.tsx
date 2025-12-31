import { Card } from "./CardSet";
import { LyricsBody } from "./LyricsBody";

export default function SideBar() {
    return (
      <div className="bg-slate-200 md:flex flex-col gap-4 hidden p-4 md:w-1/3 lg:w-1/4">
        {/* ROW 1 - Logo and app name */}
        <div className="flex gap-2 items-center justify-center">
          <img src="./logo-dark.png" alt="Goosica Dark Logo" width="50" />
          <span className="text-3xl text-shadow-md/20">Goosica</span>
        </div>

        {/* ROW 2 - Now playing card */}
        <div className="flex">
          <Card title="Love to Lay" uploader="The Weeknd" cardWidth="w-full" imagePath="./starboy-album-thumbnail.jpg" imageHeight="100%" />
        </div>

        {/* ROW 3 - Lyrics */}
        <div className="flex flex-col flex-auto gap-4 overflow-y-auto">
          <span className="text-3xl text-shadow-md/20">Lyrics</span>
          <LyricsBody />
        </div>
      </div>
    );
}