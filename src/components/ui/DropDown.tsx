import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCardSet, type CardTag, type CardType } from "../sections/CardSet";

type ActionOption = "add" | "remove" | "none";

type MutableDropDownOption = { kind: "mutable"; key: CardTag; currentLabel?: string; addLabel: string; removeLabel: string; action?: ActionOption };
type ImmutableDropDownOption = { kind: "immutable"; key: "n"; currentLabel: string; action?: ActionOption }; // no toggle

type DropDownOption = MutableDropDownOption | ImmutableDropDownOption;

const dropDownOptions: DropDownOption[] = [
  { kind: "mutable", key: "q", addLabel: "Add to Queue", removeLabel: "Remove from Queue"  },
  { kind: "mutable", key: "f", addLabel: "Add to Favorites", removeLabel: "Remove from Favorites" },
  { kind: "immutable", key: "n", currentLabel: "Add to Playlist", action: "none" },
  { kind: "immutable", key: "n", currentLabel: "Share", action: "none" },
  { kind: "mutable", key: "d", addLabel: "Download", removeLabel: "Delete" },
]

const resolveTags = (tags: CardTag[]): DropDownOption[] =>
  dropDownOptions.map(option => {
    if (option.key === "n") {
      return { ...option }
    }
    const hasTag = tags.includes(option.key);
    const newOption = {...option}
    let action: ActionOption;

    if (hasTag) {
      newOption.currentLabel = newOption.removeLabel;
      action = "remove";
    } else {
      newOption.currentLabel = newOption.addLabel;
      action = "add";
    }

    return { ...newOption, action: action };
  });

interface DropDownProps {
  data: CardType;
  tags: CardTag[];
  onClick: (newValue: boolean) => void;
}

export function DropDown({ data, tags, onClick }: DropDownProps) {
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

  const handleDropdownClick = (song: CardType, option: DropDownOption) => {
    if (option.kind !== "mutable") {
      return;
    }

    setContextData(prev => {
      const clone: CardType[] = [ ...prev ];

      const index = clone.findIndex(c => c.id === song.id);

      if (option.action === "add")
        clone[index].tags.push(option.key);

      else
        clone[index].tags = clone[index].tags.filter(tag => tag !== option.key);

      return clone;
    });
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
          onClick={()=>handleDropdownClick(data, item)}
        >
          {item.currentLabel}
        </button>
      ))}
    </div>
  );
};
