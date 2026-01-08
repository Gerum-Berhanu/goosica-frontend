import { Card } from "../ui/Card";
import { findSongById, type GroupCollectionType } from "../utils/devToolkit";

export type CardTag = "t" | "q" | "f" | "d";

const TAG_LABELS: Record<CardTag, string> = {
  t: "Today's Pick",
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
  cardWidth?: string;
  tags: CardTag[];
  status?: CardStatus;
};

interface CardSetContainerProps {
  group: GroupCollectionType;
}

export function CardSetContainer({ group }: CardSetContainerProps) {
  const headings: CardTag[] = ["t", "q", "f", "d"];

  return (
    <div className="flex flex-col gap-8 px-2 md:px-8 py-8">

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
                group[tag]
                  .map(id => findSongById(id))
                  .filter(song => song !== undefined)
                  .map(song =>
                    <Card
                      key={`${song.id}-${tag}`}
                      data={song}
                    />)
              }
            </div>
          </div>
        );
      })}
      
    </div>
  );
}