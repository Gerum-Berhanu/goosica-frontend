import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface DropDownProps {
  onClick: (newValue: boolean) => void;
}

export function DropDown({ onClick }: DropDownProps) {
  const dropdownList = [
    "Add to Favorites",
    "Add to Queue",
    "Add to Playlist",
    "Share",
    "Download",
  ];

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

  return (
    <div ref={dropdownRef} className="absolute bg-zinc-50 border flex flex-col gap-2 p-2 rounded-xl shadow-md/25 w-[125px] z-20">
      <div className="p-1 w-full">
        <X
          className="cursor-pointer"
          onClick={() => {
            onClick(false);
          }}
          size="16"
        />
      </div>

      {dropdownList.map((item, index) => (
        <span key={`${index}-${item}`} className="hover:bg-zinc-200 border-y cursor-pointer p-1 rounded-xl text-xs">
          {item}
        </span>
      ))}
    </div>
  );
}
