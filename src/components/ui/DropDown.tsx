import { X } from "lucide-react";

interface DropDownProps {
  onClick: (newValue: boolean) => void;
}

export function DropDown({ onClick }: DropDownProps) {
  const DropDownList = [
    "Add to Favorites",
    "Add to Queue",
    "Add to Playlist",
    "Share",
    "Download",
  ];

  return (
    <div className="absolute bg-zinc-50 border divide-y-2 flex flex-col rounded-xl shadow-md/25 w-[125px] z-20">
      <div className="p-1 w-full">
        <X
          className="cursor-pointer"
          onClick={() => {
            onClick(false);
          }}
          size="16"
        />
      </div>

      {DropDownList.map((item, index) => (
        <span key={`${index}-${item}`} className="cursor-pointer p-1 text-xs">
          {item}
        </span>
      ))}
    </div>
  );
}
