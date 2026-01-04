import { Card } from "../ui/Card";
import { ChevronsLeft } from "lucide-react";

interface SearchResultProps {
  onReturn: ()=>void;
}

export function SearchResult({ onReturn }: SearchResultProps) {
    return (
      <div className="flex flex-col gap-8 px-2 md:px-8 py-8">
        {/* ROW 1 - Search title */}
        <div className="flex justify-between w-full">
          <span className="text-3xl text-shadow-md/20">Search result for "..."</span>
          <button className="cursor-pointer" onClick={()=>onReturn()}>
            <ChevronsLeft/>
          </button>
        </div>

        {/* ROW 2 - Cards */}
        {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"> */}
        <div className="flex flex-wrap gap-4 justify-evenly">
          {[...Array(7)].map((_, index) => (
            <Card
              key={index}
              title="Zenith"
              uploader="Kavinsky"
              imagePath="./zenith-cover.jpg"
            />
          ))}
        </div>
      </div>
    );
}