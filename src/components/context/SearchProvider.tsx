import { createContext, useContext } from "react";
import type { CardType } from "../sections/CardSet";
import { initSearchResult } from "./searchContextTools";

const SearchContext = createContext<CardType[] | null>(null);

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (ctx === null) throw new Error("useSearch must be used within <SearchProvider>");
    return ctx;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
    return (
        <SearchContext value={initSearchResult}>
            {children}
        </SearchContext>
    );
};