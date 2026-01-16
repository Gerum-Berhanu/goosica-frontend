import { createContext, useContext, useEffect } from "react";
import { initSearchResult } from "./searchContextTools";
import { useSongDispatch } from "./SongProvider";
import type { CardType } from "../sections/CardSet";

const SearchContext = createContext<CardType[] | null>(null);

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (ctx === null) throw new Error("useSearch must be used within <SearchProvider>");
    return ctx;
}

export function SearchSongHydrator() {
    const searchResults = useSearch();
    const songDispatch = useSongDispatch();

    useEffect(()=>{
        songDispatch({ type: "ADD_SONGS", songs: searchResults });
    }, [searchResults, songDispatch]);

    return null;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
    return (
        <SearchContext value={initSearchResult}>
            {children}
        </SearchContext>
    );
};