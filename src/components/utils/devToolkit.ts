import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CardTag, CardType } from "../sections/CardSet";

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

export const initCollection: CardType[] = [
  {
    id: "A101",
    title: "Beat It",
    uploader: "Michael Jackson",
    imagePath: "./beat-it-thumbnail.jpg",
    tags: ["t", "q", "f"]
  },
  {
    id: "A102",
    title: "Thriller",
    uploader: "Michael Jackson",
    imagePath: "./thriller-thumbnail.jpg",
    tags: ["t", "q", "f", "d"]
  },
  {
    id: "A103",
    title: "Don't Stop Till You Get Enough",
    uploader: "Michael Jackson",
    imagePath: "./off-the-wall-album-thumbnail.jpg",
    tags: ["t"]
  },
  {
    id: "A104",
    title: "Lonely Night",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    tags: ["t", "q", "f"]
  },
  {
    id: "A105",
    title: "Starboy",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    tags: ["t"]
  },
  {
    id: "A106",
    title: "Love to Lay",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    tags: ["t", "f"]
  },
];

export type GroupCollectionType = Record<CardTag, CardType[]>;

function groupByTag(rawCollection: CardType[]): GroupCollectionType {
  const grouped: GroupCollectionType = {
    t: [],
    q: [],
    f: [],
    d: [],
  };

  for (const card of rawCollection) {
    for (const tag of card.tags) {
      grouped[tag].push(card);
    }
  }

  return grouped;
}

export const groupedCollection: GroupCollectionType = groupByTag(initCollection);