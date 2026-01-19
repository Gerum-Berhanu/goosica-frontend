import { useState } from "react";
import { CardSetContainer } from "../sections/CardSet";
import { NavBar } from "../sections/NavBar";
import { SearchResult } from "../sections/SearchResult";
import { PlayBar } from "../sections/PlayBar";
import { secondSearchResult } from "../context/searchEntry";
import { useSongDispatch } from "../context/SongProvider";
import { useFocusedCard } from "../context/FocusedCardProvider";

export function Body() {
    const [ isSearched, setIsSearched ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [focusedCard,] = useFocusedCard();
    
    const songDispatch = useSongDispatch();

    const handleSearch = (s: string | undefined) => {
      if (!s)
        return;
      
      setQuery(s);

      // cleaning previously searched values
      songDispatch({ type: "CLEAN_SEARCH" });

      // fetching data based on the provided query
      songDispatch({ type: "ADD_SONGS", songs: secondSearchResult })

      setIsSearched(true);
    }

    const handleReturn = () => {
      setIsSearched(false);
    }

    return (
      <div className="bg-slate-200 flex flex-col h-full overflow-y-auto w-full">
        <NavBar onSearch={handleSearch} />
        <div className="flex-grow overflow-y-auto">
          {isSearched ? (
            // SearchResult
            <SearchResult query={query} onReturn={handleReturn} />
          ) : (
            // CardSet
            <CardSetContainer/>
          )}
        </div>
        {focusedCard.isFocused &&
          <PlayBar />
        }
      </div>
    );
}