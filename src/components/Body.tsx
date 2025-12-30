import CardRow from "./CardRow";
import SearchBar from "./SearchBar";

export default function Body() {
    return (
        <div className="bg-zinc-50 flex flex-col h-full overflow-y-auto w-full md:w-2/3 lg:w-3/4">
            <SearchBar/>
            <div className="flex flex-col gap-8 overflow-y-auto p-8">
                <CardRow title="Today's Pick"/>
                <CardRow title="Queue"/>
                <CardRow title="Favorites"/>
                <CardRow title="Downloads"/>
            </div>
        </div>
    );
}