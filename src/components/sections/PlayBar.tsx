import Slider from "rc-slider";
import { ArrowLeftToLine, ArrowRightToLine, Pause, Play } from "lucide-react";
import { useContext, useEffect } from "react";
import type { CardStatus, CardType } from "./CardSet";
import { useCardSet } from "../../App";
import { AudioContext } from "../context/AudioProvider";
import { useSongState, useSongDispatch } from "../context/SongProvider";

function formatTime(seconds: number | undefined): string {
  if (seconds === undefined || isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // Pad seconds with leading zero if less than 10
  const paddedSecs = secs < 10 ? `0${secs}` : secs;

  return `${mins}:${paddedSecs}`;
}

export function PlayBar() {
  const [contextData, setContextData] = useCardSet();
  const songState = useSongState();
  const songDispatch = useSongDispatch();

  const currentSong = songState[contextData.state.focusedCard.id];

  const handleStatus = (song: CardType, status: CardStatus) => {
    setContextData((prev) => {
      // FIXME: LLMs have told me this is not a perfect cloning but a shallow one which may cause a problem
      const superset = { ...prev };
      const focusedCard = superset.state.focusedCard;

      if (status === "onPlay") {
        songDispatch({ type: "UPDATE_STATUS", status: "onPlay", id: song.id });
        
        // if another song was playing previously, reset everything related to it
        if (focusedCard.isFocused && focusedCard.id !== song.id) {
          songDispatch({ type: "UPDATE_STATUS", status: "onNone", id: focusedCard.id });
          focusedCard.timeline = 0;
        }

        focusedCard.isFocused = true;
        focusedCard.id = song.id;
      } else
        songDispatch({ type: "UPDATE_STATUS", status: "onPause", id: song.id });

      // if the song is new (from search results) add it to the collection
      if (!songState[song.id]) {
        songDispatch({ type: "ADD_SONG", song: song });
      }

      superset.state.focusedCard = focusedCard;
      return superset;
    });
  };

  const audio = useContext(AudioContext);
  if (!audio) return;

  // resetting the timeline whenever a new song is selected
  useEffect(() => {
    audio.seek(0);
  }, [currentSong.id]);

  return (
    <div className="bg-slate-200 md:hidden flex shadow-md-all w-full">
      <div className="grid grid-cols-5 grid-flow-row w-full">
        {/* row 1 and 2, col 1 */}
        <div
          style={{ backgroundImage: `url(${currentSong.imagePath})` }}
          className="bg-contain bg-center bg-no-repeat bg-slate-300"
        ></div>

        {/* row 1, col 2 */}
        <div className="col-span-2">
          <div className="flex flex-col items-start px-2">
            <span className="text-md whitespace-nowrap">
              {currentSong.title}
            </span>
            <span className="text-xs">{currentSong.uploader}</span>
          </div>
        </div>

        {/* row 1, col 3 */}
        <div className="col-span-2">
          <div className="flex h-full items-center justify-evenly w-full">
            <ArrowLeftToLine className="cursor-pointer" stroke="black" />
            {currentSong.status === "onPause" ? (
              <Play
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  if (!audio.audioRef.current) return;
                  const currentAudio = audio.audioRef.current;
                  currentAudio.play();
                  handleStatus(currentSong, "onPlay");
                }}
              />
            ) : (
              <Pause
                className="cursor-pointer"
                stroke="black"
                onClick={() => {
                  if (!audio.audioRef.current) return;
                  const currentAudio = audio.audioRef.current;
                  currentAudio.pause();
                  handleStatus(currentSong, "onPause");
                }}
              />
            )}
            <ArrowRightToLine className="cursor-pointer" stroke="black" />
          </div>
        </div>

        {/* row 2, col 2 and 3 */}
        <div className="col-span-5 flex gap-2 items-end justify-center px-4">
          <Slider
            min={0}
            max={audio.audioRef.current?.duration}
            value={audio.audioRef.current?.currentTime}
            onChange={(value) => {
              if (typeof value === "number" && audio.audioRef.current) {
                audio.audioRef.current.currentTime = value;
              }
            }}
          />
          <div className="flex gap-1">
            <span>{formatTime(audio.audioRef.current?.currentTime)}</span>
            <span>/</span>
            <span>{formatTime(audio.audioRef.current?.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
