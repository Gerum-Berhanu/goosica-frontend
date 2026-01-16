import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CardType } from "../sections/CardSet";
import { useSongState } from "../context/SongProvider";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return (
    "id-" +
    Math.random().toString(36).substring(2, 11) +
    Date.now().toString(36)
  );
};

export function findSongById(id: string): CardType | undefined {
  const songsById = useSongState();
  return songsById[id];
}

// superset

interface FocusedCard {
  isFocused: boolean,
  id: string,
  timeline: number
}

interface AppState {
  focusedCard: FocusedCard,
}

const appState: AppState = {
  focusedCard: {
    isFocused: false,
    id: "",
    timeline: 0, // maybe in seconds
  },
};

export interface SuperSet {
  state: AppState,
}

export const superset: SuperSet = {
  state: appState,
}