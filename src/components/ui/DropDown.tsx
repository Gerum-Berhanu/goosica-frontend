import { X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { CardSetContext, useCardSet, type CardTag, type CardType } from "../sections/CardSet";

type DropDownOption = 
  { key: CardTag; addLabel: string; removeLabel: string } |
  { key: "n"; label: string }; // no toggle


const dropDownOptions: DropDownOption[] = [
  { key: "q", addLabel: "Add to Queue", removeLabel: "Remove from Queue" },
  { key: "f", addLabel: "Add to Favorites", removeLabel: "Remove from Favorites" },
  { key: "n", label: "Add to Playlist" },
  { key: "n", label: "Share" },
  { key: "d", addLabel: "Download", removeLabel: "Delete" },
]

const resolveTags = (tags: CardTag[]) =>
  dropDownOptions.map(option => {
    if (option.key === "n") {
      return option.label;
    }
    const hasTag = tags.includes(option.key);
    return hasTag ? option.removeLabel : option.addLabel;
  });

interface DropDownProps {
  tags: CardTag[];
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

  const dropdownList = resolveTags(tags);

  return (
    <div
      ref={dropdownRef}
      className="absolute bg-zinc-50 border flex flex-col gap-2 p-2 rounded-xl shadow-md/25 w-[150px] z-20"
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
          key={`${index}`}
          className="hover:bg-zinc-200 border-y cursor-pointer p-1 rounded-xl text-xs"
          onClick={()=>handleDropdownClick(item[0])}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
