import { Card } from "../ui/Card";
import { ChevronsLeft } from "lucide-react";
import { useCardSet } from "../../App";
import type { CardType } from "./CardSet";

interface SearchResultProps {
  query: string;
  onReturn: ()=>void;
}

export function SearchResult({ query, onReturn }: SearchResultProps) {
  const [ contextData, ] = useCardSet();

  const tempData: CardType = {
    id: "R101",
    title: "Zenith",
    uploader: "Kavinsky",
    imagePath: "./zenith-cover.jpg",
    tags: [],
    status: "onNone"
  }

    return (
      <div className="flex flex-col gap-4 px-2 py-4">

        {/* ROW 1 - Search set */}
        <div className="flex flex-col gap-4">
          {/* Search query */}
          <div className="flex justify-between w-full">
            <span className="text-3xl text-shadow-md/20">Search result for "{query}"</span>
            <button className="cursor-pointer" onClick={()=>onReturn()}>
              <ChevronsLeft/>
            </button>
          </div>

          {/* Cards */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {contextData.search.map((result, index) => (
              <Card
                key={`search-${index}`}
                data={result}
              />
            ))}
          </div>
        </div>

        {/* ROW 2 - Similar results */}
        <div className="flex flex-col gap-4">
          {/* heading */}
          <div className="flex justify-between w-full">
            <span className="text-3xl text-shadow-md/20">Similar Results</span>
          </div>

          {/* Cards */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(5)].fill(tempData).map((result, index) => (
              <Card
                key={`search-${index}`}
                data={result}
              />
            ))}
          </div>
        </div>

      </div>
    );
}