import type { CardType } from "../sections/CardSet";

const rawCollection: CardType[] = [
  {
    id: "A101",
    title: "Beat It",
    uploader: "Michael Jackson",
    imagePath: "./beat-it-thumbnail.jpg",
    src: "./RetroMan.mp3",
    tags: ["t", "f"],
    status: "onNone",
  },
  {
    id: "A102",
    title: "Thriller",
    uploader: "Michael Jackson",
    imagePath: "./thriller-thumbnail.jpg",
    src: "./RetroMan.mp3",
    tags: ["t", "f"],
    status: "onNone",
  },
  {
    id: "A103",
    title: "Don't Stop Till You Get Enough",
    uploader: "Michael Jackson",
    imagePath: "./off-the-wall-album-thumbnail.jpg",
    src: "./RetroMan.mp3",
    tags: ["t"],
    status: "onNone",
  },
  {
    id: "A104",
    title: "Lonely Night",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    src: "./RetroMan.mp3",
    tags: ["t", "q"],
    status: "onNone",
  },
  {
    id: "A105",
    title: "Starboy",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    src: "./RetroMan.mp3",
    tags: ["t", "q"],
    status: "onNone",
  },
  {
    id: "A106",
    title: "Love to Lay",
    uploader: "The Weeknd",
    imagePath: "./starboy-album-thumbnail.jpg",
    src: "./RetroMan.mp3",
    tags: ["t", "q", "d"],
    status: "onNone",
  },
];

// order by id

export type OrderById = Record<string, CardType>;

export function orderById(rawCollection: CardType[]): OrderById {
  return rawCollection.reduce<OrderById>((acc, card) => {
    acc[card.id] = card;
    return acc;
  }, {});
}

export const initSongsById = orderById(rawCollection);
