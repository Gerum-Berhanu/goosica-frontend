import { useState } from "react";
import { CardSetContainer } from "../sections/CardSet";
import { NavBar } from "../sections/NavBar";
import { SearchResult } from "../sections/SearchResult";
import { PlayBar } from "../sections/PlayBar";
import { useCardSet } from "../../App";
import { secondSearchResult } from "../context/searchEntry";
import { useSongDispatch } from "../context/SongProvider";

export function Body() {
    const [ isSearched, setIsSearched ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [ contextData, ] = useCardSet();
    
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
      console.log("Body > handleSearch");
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
            <CardSetContainer/>
          )}
        </div>
        {(contextData.state.focusedCard.isFocused &&
          contextData.state.focusedCard.isFocused) && 
          <PlayBar />
        }
      </div>
    );
}