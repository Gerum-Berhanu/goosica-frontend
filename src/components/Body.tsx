import CardSet from "./CardSet";
import SearchBar from "./SearchBar";

export default function Body() {
    const CardSetTitles = ["Today's Pick", "Queue", "Favorites", "Downloads"];
    
    return (
        <div className="bg-slate-200 flex flex-col h-full overflow-y-auto w-full md:w-2/3 lg:w-3/4">
            <SearchBar/>
            <div className="overflow-y-auto p-8">
                <div className="flex flex-col gap-8">
                    {CardSetTitles.map(item =>
                        <CardSet key={item} title={item}/>
                    )}
                </div>
            </div>
        </div>
    );
}