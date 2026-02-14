import { createContext, useContext, useReducer, type Dispatch } from "react";
import type { CardTag } from "../sections/CardSet";
import { initTagGroup } from "./tagContextTools";

export type TagContextType = Record<CardTag, string[]>;

// Actions
type TagAction =
  | { type: "PREPEND"; tag: CardTag; id: string }
  | { type: "APPEND"; tag: CardTag; id: string }
  | { type: "REMOVE"; tag: CardTag; id: string };


// Reducer
function tagReducer(state: TagContextType, action: TagAction): TagContextType {
  switch (action.type) {
    case "PREPEND":
      return {
        ...state,
        [action.tag]: [action.id, ...state[action.tag]]
      };
      
    case "APPEND":
      return {
        ...state,
        [action.tag]: [...state[action.tag], action.id]
      };

    case "REMOVE":
      return {
        ...state,
        [action.tag]: state[action.tag].filter(id => id !== action.id)
      };
  
    default:
      return state;
  }
}


// Contexts (state and dispatch)
const TagStateContext = createContext<TagContextType | null>(null);
const TagDispatchContext = createContext<Dispatch<TagAction> | null>(null);

export function useTagState() {
  const ctx = useContext(TagStateContext);
  if (ctx === null) throw new Error("useTagState must be used within <TagProvider>");
  return ctx;
}

export function useTagDispatch() {
  const ctx = useContext(TagDispatchContext);
  if (ctx === null) throw new Error("useTagDispatch must be used within <TagProvider>");
  return ctx;
}


// Provider component
export function TagProvider({ children }: { children: React.ReactNode }) {
  const [tagGroup, dispatch] = useReducer(tagReducer, initTagGroup);

  return (
    <TagStateContext.Provider value={tagGroup}>
      <TagDispatchContext.Provider value={dispatch}>
        {children}
      </TagDispatchContext.Provider>
    </TagStateContext.Provider>
  )
}