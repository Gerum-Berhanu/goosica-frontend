import { Moon, Search } from "lucide-react";

export default function SearchBar() {
    return (
      <div className="border-b grid grid-cols-5 items-center p-4 shadow-md w-full">
        {/* COLUMN 1 - Search area */}
        <div className="col-start-2 col-end-5 flex gap-4 items-center justify-center">
          <input className="border min-w-0 px-4 py-1 rounded-md" placeholder="Search" type="text"/>
          <Search className="cursor-pointer flex-none" size="25" />
        </div>

        {/* COLUMN 2 - Theme mode (dark or light) */}
        <div className="flex justify-end">
          <Moon className="cursor-pointer" size="25" />
        </div>
      </div>
    );
}