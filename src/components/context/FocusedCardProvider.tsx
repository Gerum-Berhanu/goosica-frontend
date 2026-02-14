import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

interface FocusedCardType {
    isFocused: boolean,
    id: string
}

export const FocusedCardContext = createContext<[FocusedCardType, Dispatch<SetStateAction<FocusedCardType>>] | null>(null);

export function useFocusedCard() {
    const ctx = useContext(FocusedCardContext);
    if (ctx === null)
        throw new Error("useFocusedCard must be used within <FocusedCardProvider>");
    return ctx;
}

export function FocusedCardProvider({ children }: { children: React.ReactNode }) {
    const [focusedCard, setFocusedCard] = useState<FocusedCardType>({isFocused: false, id: ""});
    return (
        <FocusedCardContext.Provider value={[focusedCard, setFocusedCard]}>
            {children}
        </FocusedCardContext.Provider>
    );
}