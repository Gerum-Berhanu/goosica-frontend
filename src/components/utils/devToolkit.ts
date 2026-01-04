import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const setData = [
  {
    type: "pick",
    heading: "Today's Pick",
    songs: [
      {
        id: "A101",
        title: "Beat It",
        uploader: "Michael Jackson",
        imagePath: "./beat-it-thumbnail.jpg",
      },
      {
        id: "A102",
        title: "Thriller",
        uploader: "Michael Jackson",
        imagePath: "./thriller-thumbnail.jpg",
      },
      {
        id: "A103",
        title: "Don't Stop Till You Get Enough",
        uploader: "Michael Jackson",
        imagePath: "./off-the-wall-album-thumbnail.jpg",
      },
      {
        id: "A104",
        title: "Lonely Night",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A105",
        title: "Starboy",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A106",
        title: "Love to Lay",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
    ],
  },
  {
    type: "queue",
    heading: "Queue",
    songs: [
      {
        id: "A201",
        title: "Beat It",
        uploader: "Michael Jackson",
        imagePath: "./beat-it-thumbnail.jpg",
      },
      {
        id: "A202",
        title: "Thriller",
        uploader: "Michael Jackson",
        imagePath: "./thriller-thumbnail.jpg",
      },
      {
        id: "A203",
        title: "Don't Stop Till You Get Enough",
        uploader: "Michael Jackson",
        imagePath: "./off-the-wall-album-thumbnail.jpg",
      },
      {
        id: "A204",
        title: "Lonely Night",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A205",
        title: "Starboy",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A206",
        title: "Love to Lay",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
    ],
  },
  {
    type: "favorites",
    heading: "Favorites",
    songs: [
      {
        id: "A301",
        title: "Beat It",
        uploader: "Michael Jackson",
        imagePath: "./beat-it-thumbnail.jpg",
      },
      {
        id: "A302",
        title: "Thriller",
        uploader: "Michael Jackson",
        imagePath: "./thriller-thumbnail.jpg",
      },
      {
        id: "A303",
        title: "Don't Stop Till You Get Enough",
        uploader: "Michael Jackson",
        imagePath: "./off-the-wall-album-thumbnail.jpg",
      },
      {
        id: "A304",
        title: "Lonely Night",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A305",
        title: "Starboy",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A306",
        title: "Love to Lay",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
    ],
  },
  {
    type: "downloads",
    heading: "Downloads",
    songs: [
      {
        id: "A401",
        title: "Beat It",
        uploader: "Michael Jackson",
        imagePath: "./beat-it-thumbnail.jpg",
      },
      {
        id: "A402",
        title: "Thriller",
        uploader: "Michael Jackson",
        imagePath: "./thriller-thumbnail.jpg",
      },
      {
        id: "A403",
        title: "Don't Stop Till You Get Enough",
        uploader: "Michael Jackson",
        imagePath: "./off-the-wall-album-thumbnail.jpg",
      },
      {
        id: "A404",
        title: "Lonely Night",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A405",
        title: "Starboy",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
      {
        id: "A406",
        title: "Love to Lay",
        uploader: "The Weeknd",
        imagePath: "./starboy-album-thumbnail.jpg",
      },
    ],
  },
];
