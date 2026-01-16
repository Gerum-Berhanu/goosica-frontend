import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CardType } from "../sections/CardSet";
import { cardsById, type OrderById } from "../context/songContextTools";

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

export function findSongById(id: string, set: OrderById = cardsById): CardType | undefined {
  return set[id];
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