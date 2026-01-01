import { Moon, Search } from "lucide-react";
import { useRef } from "react";

export function SearchBar() {
    const searchInput = useRef<HTMLInputElement>(null);
    return (
      <div className="grid grid-cols-5 items-center p-4 shadow-md/25 w-full">
        {/* COLUMN 1 - Search area */}
        <div className="col-start-2 col-end-5 flex gap-4 items-center justify-center">
          <input ref={searchInput} className="border focus:bg-white/50 min-w-0 outline-0 px-4 py-1 rounded-md" placeholder="Search" type="text"/>
          <Search className="cursor-pointer flex-none" onClick={()=>{console.log(searchInput.current?.value)}} size="25" />
        </div>

        {/* COLUMN 2 - Theme mode (dark or light) */}
        <div className="flex justify-end">
          <Moon className="cursor-pointer" size="25" />
        </div>
      </div>
    );
}