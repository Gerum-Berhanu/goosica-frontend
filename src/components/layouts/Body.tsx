import { useState } from "react";
import { CardSetContainer } from "../sections/CardSet";
import { NavBar } from "../sections/NavBar";
import { SearchResult } from "../sections/SearchResult";
import type { GroupCollectionType } from "../utils/devToolkit";
import { PlayBar } from "../sections/PlayBar";
import { useCardSet } from "../../App";

interface BodyProps {
  group: GroupCollectionType;
}

export function Body({ group }: BodyProps) {
    const [ isSearched, setIsSearched ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [ contextData, ] = useCardSet();

    const handleSearch = (s: string | undefined) => {
      if (!s)
        return;
      
      setQuery(s);

      // fetching data based on the provided query

      setIsSearched(true);
    }

    const handleReturn = () => {
      setIsSearched(false);
    }

    return (
      <div className="bg-slate-200 flex flex-col justify-between h-full overflow-y-auto w-full">
        <NavBar onSearch={handleSearch} />
        <div className="overflow-y-auto">
          {isSearched ? (
            // SearchResult
            <SearchResult query={query} onReturn={handleReturn} />
          ) : (
            // CardSet
            <CardSetContainer group={group} />
          )}
        </div>
        {(contextData.state.focusedCard.isFocused &&
          contextData.state.focusedCard.isFocused) && 
          <PlayBar />
        }
      </div>
    );
}