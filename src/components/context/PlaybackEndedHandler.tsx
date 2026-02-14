import { useContext, useEffect, useRef } from "react";
import { AudioContext } from "./AudioProvider";
import { useSongState, useSongDispatch } from "./SongProvider";
import { useTagState, useTagDispatch } from "./TagProvider";
import { useFocusedCard } from "./FocusedCardProvider";

/**
 * Listens for audio "ended" and auto-plays:
 * - Next song in queue when queue has items
 * - Next song in same tag (f/d) when queue empty and current is from f or d
 * - Pauses when queue empty and current is from t, or no next song available
 */
export function PlaybackEndedHandler() {
  const audio = useContext(AudioContext);
  const songState = useSongState();
  const songDispatch = useSongDispatch();
  const tagState = useTagState();
  const tagDispatch = useTagDispatch();
  const [focusedCard, setFocusedCard] = useFocusedCard();

  const refs = useRef({
    songState,
    tagState,
    focusedCard,
    setFocusedCard,
    songDispatch,
    tagDispatch,
  });
  refs.current = {
    songState,
    tagState,
    focusedCard,
    setFocusedCard,
    songDispatch,
    tagDispatch,
  };

  useEffect(() => {
    const el = audio?.audioRef.current;
    if (!el) return;

    const playNext = (nextId: string, songs: Record<string, any>, dispatch: any, tagDisp: any, setFocused: any, currentId: string) => {
      const nextSong = songs?.[nextId];
      if (!nextSong) return;
      dispatch({ type: "UPDATE_STATUS", status: "onNone", id: currentId });
      dispatch({ type: "UPDATE_STATUS", status: "onPlay", id: nextId });
      if (!nextSong.tags.includes("t")) {
        dispatch({ type: "ADD_TAG", tag: "t", id: nextId });
        tagDisp({ type: "APPEND", tag: "t", id: nextId });
      }
      setFocused({ isFocused: true, id: nextId });
      audio?.load(nextSong.src);
    };

    const onEnded = () => {
      const { songState: songs, tagState: tags, focusedCard: focused, setFocusedCard: setFocused, songDispatch: dispatch, tagDispatch: tagDisp } = refs.current;
      const currentId = focused.id;
      const currentSong = songs?.[currentId];
      if (!currentSong) return;

      const queue = tags?.q ?? [];
      let nextId: string | null = null;

      if (queue.length > 0) {
        const currentIndex = queue.indexOf(currentId);
        if (currentIndex >= 0) {
          const toRemove = queue.slice(0, currentIndex + 1);
          toRemove.forEach((id) => {
            tagDisp({ type: "REMOVE", tag: "q", id });
            dispatch({ type: "REMOVE_TAG", tag: "q", id });
          });
        }
        const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
        nextId = nextIndex < queue.length ? queue[nextIndex] : null;
      } else {
        if (currentSong.tags.includes("f") || currentSong.tags.includes("d")) {
          const tag: "f" | "d" = currentSong.tags.includes("f") ? "f" : "d";
          const list = tags?.[tag] ?? [];
          const idx = list.indexOf(currentId);
          if (idx >= 0 && idx + 1 < list.length) {
            nextId = list[idx + 1];
          }
        }
      }

      if (nextId) {
        playNext(nextId, songs, dispatch, tagDisp, setFocused, currentId);
      } else {
        dispatch({ type: "UPDATE_STATUS", status: "onPause", id: currentId });
      }
    };

    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [audio]);

  return null;
}
