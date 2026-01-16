import { createContext, useContext, useEffect, useReducer, type Dispatch } from "react";
import { initSearchResult } from "./searchContextTools";
import { useSongDispatch, useSongState } from "./SongProvider";
import type { CardType } from "../sections/CardSet";

type SearchResultType = CardType[];

// Actions
type SearchAction =
    | { type: "NEW_SEARCH"; result: SearchResultType }


// Reducer
function searchReducer(state: SearchResultType, action: SearchAction) {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.result;   
    
        default:
            return state;
    }
}


// Contexts
const SearchStateContext = createContext<SearchResultType | null>(null);
const SearchDispatchContext = createContext<Dispatch<SearchAction> | null>(null);

export function useSearchState() {
    const ctx = useContext(SearchStateContext);
    if (ctx === null) throw new Error("useSearchState must be used within <SearchProvider>");
    return ctx;
}

export function useSearchDispatch() {
    const ctx = useContext(SearchDispatchContext);
    if (ctx === null) throw new Error("useSearchDispatch must be used within <SearchProvider>");
    return ctx;
}


// Hydrator component
export function SearchSongHydrator() {
    const searchState = useSearchState();
    const songDispatch = useSongDispatch();
    const songState = useSongState();
    console.log(songState);
    
    useEffect(()=>{
        songDispatch({ type: "ADD_SONGS", songs: searchState });
    }, [searchState, songDispatch]);

    return null;
}


// Provider component
export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [result, dispatch] = useReducer(searchReducer, initSearchResult);
    return (
        <SearchStateContext value={result}>
            <SearchDispatchContext value={dispatch}>
                {children}
            </SearchDispatchContext>
        </SearchStateContext>
    );
};