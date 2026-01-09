import { Card } from "../ui/Card";
import { ChevronsLeft } from "lucide-react";
import { useCardSet } from "../../App";
import type { CardType } from "./CardSet";

interface SearchResultProps {
  query: string;
  onReturn: () => void;
}

interface SearchRowProps {
  title: React.ReactNode;
  cards: CardType[];
  showReturnButton?: boolean;
  onReturn?: () => void;
}

const tempData: CardType = {
  id: "R101",
  title: "Zenith",
  uploader: "Kavinsky",
  imagePath: "./zenith-cover.jpg",
  tags: [],
  status: "onNone",
};

function SearchRow({ title, cards, showReturnButton = false, onReturn }: SearchRowProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full">
        <span className="text-3xl text-shadow-md/20">{title}</span>
        {showReturnButton && onReturn && (
          <button className="cursor-pointer" onClick={onReturn}>
            <ChevronsLeft />
          </button>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {cards.length > 0 ? (
          cards.map((card, index) => <Card key={`${card.id}-${index}`} data={card} />)
        ) : (
          <div className="flex items-center h-[50px] text-gray-500">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}

export function SearchResult({ query, onReturn }: SearchResultProps) {
  const [contextData] = useCardSet();

  return (
    <div className="flex flex-col gap-4 px-2 py-4">
      <SearchRow
        title={`Search result for "${query}"`}
        cards={contextData.search}
        showReturnButton={true}
        onReturn={onReturn}
      />

      <SearchRow
        title="Similar Results"
        cards={Array.from({ length: 5 }, () => tempData)}
      />
    </div>
  );
}