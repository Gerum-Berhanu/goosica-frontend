import { createContext, type Dispatch, type SetStateAction, useState, useContext } from "react";
import { Card } from "../ui/Card";
import { initSetData } from "../utils/devToolkit";

type CardTag = "p" | "q" | "f" | "d";

const TAG_LABELS: Record<CardTag, string> = {
  p: "Today's Pick",
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
  const [ contextData, setContextData ] = useState([...initSetData]);

  const headings: CardTag[] = ["p", "q", "f", "d"];
  
  return (
    <CardSetContext value={[contextData, setContextData]}>
      <div className="flex flex-col gap-8 px-2 md:px-8 py-8">

        {/* Card set */}
        {headings.map(tag => { 
          return (
            <div className="flex flex-col gap-4">
              {/* ROW 1 - Heading */}
              <div className="w-full">
                <span className="text-3xl text-shadow-md/20">{TAG_LABELS[tag]}</span>
              </div>

              {/* ROW 2- Song list */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {contextData.map((item, index) => (
                  (item.tags.includes(tag) && <Card key={`${index}-${item.id}-${tag}`} id={item.id} title={item.title} uploader={item.uploader} imagePath={item.imagePath} tags={item.tags} />)
                ))}
              </div>
            </div>
          );
        })}
        
      </div>
    </CardSetContext>
  );
}