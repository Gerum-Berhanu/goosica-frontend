import {CardSet, generateId} from "./CardSet";
import {SearchBar} from "./SearchBar";

export function Body() {
    const CardSetTitles = ["Today's Pick", "Queue", "Favorites", "Downloads"];
    
    return (
        <div className="bg-slate-200 flex flex-col h-full overflow-y-auto w-full md:w-2/3 lg:w-3/4">
            <SearchBar/>
            <div className="overflow-y-auto px-2 md:px-8 py-8">
                <div className="flex flex-col gap-8">
                    {CardSetTitles.map(item =>
                        <CardSet key={generateId()} title={item}/>
                    )}
                </div>
            </div>
        </div>
    );
}