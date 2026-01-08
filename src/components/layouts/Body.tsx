import { useState } from "react";
import { CardSetContainer } from "../sections/CardSet";
import { NavBar } from "../sections/NavBar";
import { SearchResult } from "../sections/SearchResult";
import type { GroupCollectionType } from "../utils/devToolkit";

interface BodyProps {
  group: GroupCollectionType;
}

export function Body({ group }: BodyProps) {
    const [ isSearched, setIsSearched ] = useState(false);

    const handleSearch = (query: string | undefined) => {
      if (!query)
        return;

      // fetching data based on the provided query

      setIsSearched(true);
    }

    const handleReturn = () => {
      setIsSearched(false);
    }

    return (
      <div className="bg-slate-200 flex flex-col h-full overflow-y-auto w-full">
        <NavBar onSearch={handleSearch}/>
        <div className="h-full overflow-y-auto">
          {isSearched ? (
            // SearchResult
            <SearchResult onReturn={handleReturn} />
          ) : (
            // CardSet
            <CardSetContainer group={group} />
          )}
        </div>
      </div>
    );
}