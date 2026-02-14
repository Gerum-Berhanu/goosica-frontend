import { useContext } from "react";
import type { CardStatus, CardType } from "../components/sections/CardSet";
import { AudioContext } from "../components/context/AudioProvider";
import { useSongState, useSongDispatch } from "../components/context/SongProvider";
import { useFocusedCard } from "../components/context/FocusedCardProvider";
import { useTagState, useTagDispatch } from "../components/context/TagProvider";

const SEEK_THRESHOLD_SEC = 3;

function playSong(
  nextId: string,
  songs: Record<string, CardType>,
  dispatch: ReturnType<typeof useSongDispatch>,
  tagDisp: ReturnType<typeof useTagDispatch>,
  setFocused: React.Dispatch<React.SetStateAction<{ isFocused: boolean; id: string }>>,
  currentId: string,
  audio: NonNullable<React.ContextType<typeof AudioContext>>
) {
  const nextSong = songs?.[nextId];
  if (!nextSong) return;
  dispatch({ type: "UPDATE_STATUS", status: "onNone", id: currentId });
  dispatch({ type: "UPDATE_STATUS", status: "onPlay", id: nextId });
  if (!nextSong.tags.includes("t")) {
    dispatch({ type: "ADD_TAG", tag: "t", id: nextId });
    tagDisp({ type: "APPEND", tag: "t", id: nextId });
  }
  setFocused({ isFocused: true, id: nextId });
  audio.load(nextSong.src);
}

/**
 * Centralized play/pause and focus logic for Card and PlayBar.
 */
export function usePlaybackActions() {
  const audio = useContext(AudioContext);
  const songState = useSongState();
  const songDispatch = useSongDispatch();
  const tagState = useTagState();
  const tagDispatch = useTagDispatch();
  const [focusedCard, setFocusedCard] = useFocusedCard();

  function handleStatus(song: CardType, status: CardStatus) {
    if (!audio) return;
    setFocusedCard((prev) => {
      const next = { ...prev };

      if (status === "onPlay") {
        songDispatch({ type: "UPDATE_STATUS", status: "onPlay", id: song.id });

        if (!song.tags.includes("t")) {
          songDispatch({ type: "ADD_TAG", tag: "t", id: song.id });
          tagDispatch({ type: "APPEND", tag: "t", id: song.id });
        }

        if (prev.isFocused && prev.id !== song.id) {
          songDispatch({ type: "UPDATE_STATUS", status: "onNone", id: prev.id });
          audio.seek(0);
        }

        if (!prev.isFocused || prev.id !== song.id) {
          audio.load(song.src);
        }

        next.isFocused = true;
        next.id = song.id;
      } else {
        songDispatch({ type: "UPDATE_STATUS", status: "onPause", id: song.id });
      }

      return next;
    });
  }

  function handleNext() {
    if (!audio || !focusedCard.id) return;
    const currentId = focusedCard.id;
    const currentSong = songState[currentId];
    if (!currentSong) return;

    const queue = tagState?.q ?? [];
    let nextId: string | null = null;

    if (queue.length > 0) {
      const currentIndex = queue.indexOf(currentId);
      if (currentIndex >= 0) {
        const toRemove = queue.slice(0, currentIndex + 1);
        toRemove.forEach((id) => {
          tagDispatch({ type: "REMOVE", tag: "q", id });
          songDispatch({ type: "REMOVE_TAG", tag: "q", id });
        });
      }
      const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
      nextId = nextIndex < queue.length ? queue[nextIndex] : null;
    } else {
      if (currentSong.tags.includes("f") || currentSong.tags.includes("d")) {
        const tag: "f" | "d" = currentSong.tags.includes("f") ? "f" : "d";
        const list = tagState?.[tag] ?? [];
        const idx = list.indexOf(currentId);
        if (idx >= 0 && idx + 1 < list.length) {
          nextId = list[idx + 1];
        }
      }
    }

    if (nextId) {
      playSong(nextId, songState, songDispatch, tagDispatch, setFocusedCard, currentId, audio);
      audio.audioRef.current?.play();
    } else {
      songDispatch({ type: "UPDATE_STATUS", status: "onPause", id: currentId });
      audio.audioRef.current?.pause();
    }
  }

  function handlePrevious() {
    if (!audio || !focusedCard.id) return;
    const currentId = focusedCard.id;
    const currentSong = songState[currentId];
    if (!currentSong) return;

    if (audio.currentTime > SEEK_THRESHOLD_SEC) {
      audio.seek(0);
      return;
    }

    const queue = tagState?.q ?? [];
    let prevId: string | null = null;

    if (queue.length > 0) {
      const currentIndex = queue.indexOf(currentId);
      if (currentIndex > 0) {
        prevId = queue[currentIndex - 1];
      }
    }
    if (!prevId && (currentSong.tags.includes("f") || currentSong.tags.includes("d"))) {
      const tag: "f" | "d" = currentSong.tags.includes("f") ? "f" : "d";
      const list = tagState?.[tag] ?? [];
      const idx = list.indexOf(currentId);
      if (idx > 0) {
        prevId = list[idx - 1];
      }
    }
    if (!prevId && currentSong.tags.includes("t")) {
      const list = tagState?.t ?? [];
      const idx = list.indexOf(currentId);
      if (idx > 0) {
        prevId = list[idx - 1];
      }
    }

    if (prevId) {
      playSong(prevId, songState, songDispatch, tagDispatch, setFocusedCard, currentId, audio);
      audio.audioRef.current?.play();
    } else {
      audio.seek(0);
    }
  }

  return { handleStatus, handleNext, handlePrevious };
}
