import { createContext, useContext, useReducer, type Dispatch } from "react";
import { initSongsById, orderById, type OrderById } from "./songContextTools";
import type { CardStatus, CardTag, CardType } from "../sections/CardSet";

type SongContextType = OrderById;

// Actions
type SongAction =
  | { type: "ADD_SONG"; song: CardType }
  | { type: "ADD_SONGS"; songs: CardType[] }
  | { type: "ADD_TAG"; tag: CardTag; id: string }
  | { type: "CLEAN_SEARCH" }
  | { type: "REMOVE_TAG"; tag: CardTag; id: string }
  | { type: "UPDATE_STATUS"; status: CardStatus; id: string };

// Reducer
function songReducer(state: SongContextType, action: SongAction) {
  switch (action.type) {
    case "ADD_SONG":
      return {
        ...state,
        [action.song.id]: action.song,
      };

    case "ADD_SONGS":
      // if one of the new songs to be added already exist in the local database, merge them
      // identify the identities to merge from both sides
      const existingSongsId = Object.values(state).map(c => c.id);
      const newSongs = action.songs.map(c => {
        // if the new song is NOT already in the local database, just include it
        if (!existingSongsId.includes(c.id))
          return c;
        // take everything from the existing one, and jus the selector value from the new one
        return { ...state[c.id], selector: c.selector}
      });

      return {
          ...state,
          ...orderById(newSongs),
        };
      
    case "ADD_TAG":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          tags: [...state[action.id].tags, action.tag],
        },
      };

    case "CLEAN_SEARCH": {
      return Object.values(state).reduce((acc, c) => {
        // If it's NOT a search card, keep as-is
        if (c.selector !== "search") {
          acc[c.id] = c;
          return acc;
        }

        // If it is a search card and has tags, reset selector
        if (c.tags.length > 0) {
          acc[c.id] = {
            ...c,
            selector: "none",
          };
          return acc;
        }
        
        // If it is a search card and has NO tags, drop it (do nothing, clean it)
        return acc;
      }, {} as typeof state);
    }

    case "REMOVE_TAG":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          tags: state[action.id].tags.filter((tag) => tag !== action.tag),
        },
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        [action.id]: { ...state[action.id], status: action.status },
      };

    default:
      return state;
  }
}

// Contexts
const SongStateContext = createContext<SongContextType | null>(null);
const SongDispatchContext = createContext<Dispatch<SongAction> | null>(null);

export function useSongState() {
  const ctx = useContext(SongStateContext);
  if (ctx === null)
    throw new Error("useSongState must be used within <SongProvider>");
  return ctx;
}

export function useSongDispatch() {
  const ctx = useContext(SongDispatchContext);
  if (ctx === null)
    throw new Error("useSongDispatch must be used within <SongProvider>");
  return ctx;
}

// Provider component
export function SongProvider({ children }: { children: React.ReactNode }) {
  const [songsById, dispatch] = useReducer(songReducer, initSongsById);

  return (
    <SongStateContext.Provider value={songsById}>
      <SongDispatchContext.Provider value={dispatch}>{children}</SongDispatchContext.Provider>
    </SongStateContext.Provider>
  );
}
