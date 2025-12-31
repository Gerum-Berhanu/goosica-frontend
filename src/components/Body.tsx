import CardSet from "./CardSet";
import SearchBar from "./SearchBar";

export default function Body() {
    return (
        <div className="bg-slate-200 flex flex-col h-full overflow-y-auto w-full md:w-2/3 lg:w-3/4">
            <SearchBar/>
            <div className="flex flex-col gap-8 overflow-y-auto p-8">
                <CardSet title="Today's Pick"/>
                <CardSet title="Queue"/>
                <CardSet title="Favorites"/>
                <CardSet title="Downloads"/>
            </div>
        </div>
    );
}