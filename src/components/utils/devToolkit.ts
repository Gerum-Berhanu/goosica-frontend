import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CardType } from "../sections/CardSet";
import type { OrderById } from "../context/songContextTools";

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

export function findSongById(set: OrderById, id: string): CardType | undefined {
  return set[id];
}
