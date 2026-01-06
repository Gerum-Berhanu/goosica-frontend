import { X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { CardSetContext, useCardSet } from "../sections/CardSet";

interface DropDownProps {
  tags: string[],
  onClick: (newValue: boolean) => void;
}

export function DropDown({ tags, onClick }: DropDownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClick(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick]);

  const [ contextData, setContextData ] = useCardSet();

  const handleDropdownClick = (tag: string) => {

  }

  const resolveTags = (tagList: string[]) => {
    let tempList: string[][] = [];
    // tagList.forEach(tag => {
    //   if (tag === "q")
    //     tempList.push([tag, "Remove from Queue"]);
    //   else if (tag === "f")
    //     tempList.push([tag, "Remove from Favorites"]);
    //   else if (tag === "d")
    //     tempList.push([tag, "Delete"]);
    // })
    if (tagList.includes("q")) {
      tempList.push(["q", "Remove from Queue"]);
    } else {
      tempList.push(["q-0", "Add to Queue"]);
    }
    if (tagList.includes("f")) {
      tempList.push(["f", "Remove from Favorites"]);
    } else {
      tempList.push(["f-0", "Add to Favorites"]);
    }
    tempList.push(["l-0", "Add to Playlist"]);
    tempList.push(["s-0", "Share"]);
    if (tagList.includes("d")) {
      tempList.push(["d", "Delete"]);
    } else {
      tempList.push(["d-0", "Download"]);
    }
    
    return tempList
  }
  const dropdownList = resolveTags(tags);

  return (
    <div
      ref={dropdownRef}
      className="absolute bg-zinc-50 border flex flex-col gap-2 p-2 rounded-xl shadow-md/25 w-[125px] z-20"
    >
      <div className="p-1 w-full">
        <button
          className="cursor-pointer"
          onClick={() => {
            onClick(false);
          }}
        >
          <X size="16" />
        </button>
      </div>

      {dropdownList.map((item, index) => (
        <button
          key={`${index}-${item[0]}`}
          className="hover:bg-zinc-200 border-y cursor-pointer p-1 rounded-xl text-xs"
          onClick={()=>handleDropdownClick(item[0])}
        >
          {item[1]}
        </button>
      ))}
    </div>
  );
};
