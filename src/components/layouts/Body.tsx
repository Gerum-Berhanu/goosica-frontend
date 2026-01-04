import { useState } from "react";
import {CardSetContainer} from "../sections/CardSet";
import {NavBar} from "../sections/NavBar";
import { SearchResult } from "../sections/SearchResult";

export function Body() {
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
      <div className="bg-slate-200 flex flex-col h-full overflow-y-auto w-full md:w-2/3 lg:w-3/4">
        <NavBar onSearch={handleSearch}/>
        <div className="h-full overflow-y-auto">
          {isSearched ? (
            // SearchResult
            <SearchResult onReturn={handleReturn} />
          ) : (
            // CardSet
            <CardSetContainer />
          )}
        </div>
      </div>
    );
}