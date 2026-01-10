import { ArrowLeftToLine, ArrowRightToLine, Play } from "lucide-react";

export function PlayBar() {
    return (
      <div className="bg-slate-200 md:hidden flex shadow-md-all w-full">
        <div className="grid grid-flow-col w-full">
          <div
            style={{ backgroundImage: `url(./beat-it-thumbnail.jpg)` }}
            className="bg-contain bg-center bg-no-repeat bg-slate-300 row-span-4"
          ></div>
          <div className="col-span-2 row-span-3">
            <div className="flex flex-col items-start px-2">
              <span className="text-xl whitespace-nowrap">Beat It</span>
              <span className="text-sm">Michael Jackson</span>
            </div>
          </div>
          <div className="col-span-4 px-2">3</div>
          <div className="col-span-2 row-span-3">
            <div className="flex h-full items-center justify-evenly w-full">
              <ArrowLeftToLine className="cursor-pointer" stroke="black" />
              <Play className="cursor-pointer" stroke="black" />
              <ArrowRightToLine className="cursor-pointer" stroke="black" />
            </div>
          </div>
        </div>
      </div>
    );
}