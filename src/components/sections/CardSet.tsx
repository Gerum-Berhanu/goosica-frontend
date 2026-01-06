import { createContext, type Dispatch, type SetStateAction, useState, useContext, useMemo } from "react";
import { Card } from "../ui/Card";
import { initSetData } from "../utils/devToolkit";

type CardTag = "t" | "q" | "f" | "d";

const TAG_LABELS: Record<CardTag, string> = {
  t: "Today's Pick",
  q: "Queue",
  f: "Favorites",
  d: "Downloads",
};

export interface CardType {
  id: string;
  title: string;
  uploader: string;
  imagePath: string;
  cardWidth?: string;
  tags: CardTag[];
};

export const CardSetContext = createContext<[CardType[], Dispatch<SetStateAction<CardType[]>>] | null>(null);

export const useCardSet = () => {
  const context = useContext(CardSetContext);
  if (!context) {
    throw new Error("useCardSet must be used within a CardSetProvider");
  }
  return context;
};

export function CardSetContainer() {
  const [ contextData, setContextData ] = useState<CardType[]>(initSetData);
  
  const groupedByTag = useMemo(()=>{
    const grouped: Record<CardTag, CardType[]> = {
      t: [],
      q: [],
      f: [],
      d: [],
    };
    
    for (const card of contextData) {
      for (const tag of card.tags) {
        grouped[tag].push(card);
      }
    }

    return grouped;
  }, [contextData]);
  
  const headings: CardTag[] = ["t", "q", "f", "d"];

  return (
    <CardSetContext value={[contextData, setContextData]}>
      <div className="flex flex-col gap-8 px-2 md:px-8 py-8">

        {/* Card set */}
        {headings.map(tag => { 
          return (
            <div className="flex flex-col gap-4">
              {/* ROW 1 - Heading */}
              <div className="w-full">
                <span className="text-3xl text-shadow-md/20">
                  {TAG_LABELS[tag]}
                </span>
              </div>

              {/* ROW 2- Song list */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {groupedByTag[tag].map((item) => (
                  <Card
                    key={`${item.id}-${tag}`}
                    id={item.id}
                    title={item.title}
                    uploader={item.uploader}
                    imagePath={item.imagePath}
                    tags={item.tags}
                  />
                ))}
              </div>
            </div>
          );
        })}
        
      </div>
    </CardSetContext>
  );
}