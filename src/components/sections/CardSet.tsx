import { createContext, type Dispatch, type SetStateAction, useState, useContext } from "react";
import { Card } from "../ui/Card";
import { initSetData } from "../utils/devToolkit";

interface CardSetData {
  type: string,
  heading: string,
  songs: Array<{
    id: string,
    title: string,
    uploader: string,
    imagePath: string
  }>
}

interface CardSetProps {
  data: CardSetData;
}

export function CardSet({ data }: CardSetProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* ROW 1 - Title */}
      <div className="w-full">
        <span className="text-3xl text-shadow-md/20">{data["heading"]}</span>
      </div>

      {/* ROW 2 - Card set */}
      <div className="flex gap-4 overflow-x-auto pb-2">
      {data["songs"].map(item =>
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

export const CardSetContext = createContext<[CardSetData[], Dispatch<SetStateAction<CardSetData[]>>] | null>(null);

export const useCardSet = () => {
  const context = useContext(CardSetContext);
  if (!context) {
    throw new Error("useCardSet must be used within a CardSetProvider");
  }
  return context;
};

export function CardSetContainer() {
  const [ contextData, setContextData ] = useState([...initSetData]);
  return (
    <CardSetContext value={[contextData, setContextData]}>
      <div className="flex flex-col gap-8 px-2 md:px-8 py-8">
        {contextData.map((item, index) => (
          <CardSet key={`${index}-${item["type"]}`} data={item} />
        ))}
      </div>
    </CardSetContext>
  );
}