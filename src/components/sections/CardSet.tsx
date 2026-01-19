import { Card } from "../ui/Card";
import { useTagState } from "../context/TagProvider";
import { useSongState } from "../context/SongProvider";

export type CardTag = "t" | "q" | "f" | "d";

const TAG_LABELS: Record<CardTag, string> = {
  t: "Recently Played",
  q: "Queue",
  f: "Favorites",
  d: "Downloads",
};

export type CardStatus = "onPlay" | "onPause" | "onNone";

export interface CardType {
  id: string;
  title: string;
  uploader: string;
  imagePath: string;
  src: string;
  tags: CardTag[];
  cardWidth?: string;
  selector?: string;
  status?: CardStatus;
};

export function CardSetContainer() {
  const songsById = useSongState();
  const tagGroup = useTagState();

  const headings: CardTag[] = ["t", "q", "f", "d"];
  
  return (
    <div className="flex flex-col gap-4 px-2 py-4">

      {/* Card set */}
      {headings.map(tag => { 
        return (
          <div key={tag} className="flex flex-col gap-4">
            {/* ROW 1 - Heading */}
            <div className="w-full">
              <span className="text-3xl text-shadow-md/20">
                {TAG_LABELS[tag]}
              </span>
            </div>

            {/* ROW 2- Song list */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {
                tagGroup[tag] && tagGroup[tag].length > 0 ?
                tagGroup[tag]
                  .map(id => songsById[id])
                  .filter(Boolean) // Boolean(value) returns the truthy value
                  .map(song =>
                    <Card
                      key={`${song.id}-${tag}`}
                      data={song}
                    />)
                  : <div className="flex items-center h-[50px] text-gray-500">No {TAG_LABELS[tag].toLowerCase()}.</div>
              }
            </div>
          </div>
        );
      })}
      
    </div>
  );
}