import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropDownProps {
  onClick: (newValue: boolean) => void;
}

export function DropDown({ onClick }: DropDownProps) {
  const dropdownList = [
    "Add to Queue",
    "Add to Favorites",
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
          key={`${index}-${item}`}
          className="hover:bg-zinc-200 border-y cursor-pointer p-1 rounded-xl text-xs"
        >
          {item}
        </button>
      ))}
    </div>
  );
};
