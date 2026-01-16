import { useCardSet } from "../../App";
import { useSongState } from "../context/SongProvider";
import { Card } from "../ui/Card";
import { LyricsBody } from "../ui/LyricsBody";

export function SideBar() {
  const [contextData, ] = useCardSet();
  const songState = useSongState();

  return (
    <div className="bg-slate-200 md:grid grid-rows-9 gap-4 hidden p-4 w-[300px]">
      {/* ROW 1 - Logo and app name */}
      <div className="flex gap-2 items-center justify-center">
        <img src="./logo-dark.png" alt="Goosica Dark Logo" width="50" />
        <span className="text-3xl text-shadow-md/20">Goosica</span>
      </div>

      {/* ROW 2 - Now playing card */}
      <div className="flex justify-center items-center row-span-3 w-[250px]">
        {contextData.state.focusedCard.id ? (
          <Card
            data={songState[contextData.state.focusedCard.id]}
          />
        ) : (
          <div className="text-gray-500">No song is selected.</div>
        )}
      </div>

      {/* ROW 3 - Lyrics */}
      <div className="flex flex-col flex-auto gap-4 overflow-y-auto row-span-5">
        <span className="text-3xl text-shadow-md/20">Lyrics</span>
        <LyricsBody />
      </div>
    </div>
  );
}
