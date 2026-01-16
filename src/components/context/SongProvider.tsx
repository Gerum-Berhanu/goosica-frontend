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
      return {
        ...state,
        ...orderById(action.songs),
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
        const prevSearchIds = Object.values(state).filter(c => c.selector === "search").map(c => c.id);
        return Object.fromEntries(Object.entries(state).filter(([key,]) => !prevSearchIds.includes(key)));
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
    <SongStateContext value={songsById}>
      <SongDispatchContext value={dispatch}>{children}</SongDispatchContext>
    </SongStateContext>
  );
}
