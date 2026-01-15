import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CardType } from "../sections/CardSet";

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

const rawCollection: CardType[] = [
  {
    id: "A101",
    title: "Beat It",
    uploader: "Michael Jackson",
    imagePath: "./beat-it-thumbnail.jpg",
    tags: ["t", "f"],
    status: "onNone",
  },
  {
    id: "A102",
    title: "Thriller",
    uploader: "Michael Jackson",
    imagePath: "./thriller-thumbnail.jpg",
    tags: ["t", "f"],
    status: "onNone",
  },
  {
    id: "A103",
    title: "Don't Stop Till You Get Enough",
    uploader: "Michael Jackson",
    imagePath: "./off-the-wall-album-thumbnail.jpg",
    tags: ["t"],
    status: "onNone",
  },
  {
    id: "A104",
    title: "Lonely Night",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    tags: ["t", "q"],
    status: "onNone",
  },
  {
    id: "A105",
    title: "Starboy",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    tags: ["t", "q"],
    status: "onNone",
  },
  {
    id: "A106",
    title: "Love to Lay",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    tags: ["t", "q", "d"],
    status: "onNone",
  },
];

// order by id

export type OrderById = Record<string, CardType>;

export function orderById(rawCollection: CardType[]): OrderById {
  return rawCollection.reduce<OrderById>(
    (acc, card) => {
      acc[card.id] = card;
      return acc;
    }, {}
  );
}

export const cardsById = orderById(rawCollection);


export function findSongById(id: string): CardType | undefined {
  return cardsById[id];
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
  order: OrderById,
}

export const superset: SuperSet = {
  state: appState,
  order: cardsById,
}