import {CardSet} from "./CardSet";
import { generateId } from "./devToolkit";
import {SearchBar} from "./SearchBar";
import { SearchResult } from "./SearchResult";

export function Body() {
    const CardSetTitles = ["Today's Pick", "Queue", "Favorites", "Downloads"];
    
    return (
      <div className="bg-slate-200 flex flex-col h-full overflow-y-auto w-full md:w-2/3 lg:w-3/4">
        <SearchBar />
        <div className="h-full overflow-y-auto">
          {false ? ( // CardSet
            <div className="flex flex-col gap-8 px-2 md:px-8 py-8">
              {CardSetTitles.map((item) => (
                <CardSet key={generateId()} title={item} />
              ))}
            </div>
          ) : (
            // SearchResult
            <SearchResult />
          )}
        </div>
      </div>
    );
}