import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import {Body} from "./components/layouts/Body";
import {SideBar} from "./components/sections/SideBar";
import { superset, type SuperSet } from "./components/utils/devToolkit";
import { AudioProvider } from "./components/context/AudioProvider";
import { TagProvider } from "./components/context/TagProvider";
import { SearchProvider } from "./components/context/SearchProvider";

export const CardSetContext = createContext<[SuperSet, Dispatch<SetStateAction<SuperSet>>] | null>(null);

export const useCardSet = () => {
  const context = useContext(CardSetContext);
  if (!context) {
    throw new Error("useCardSet must be used within a <CardSetProvider>");
  }
  return context;
};

function App() {
  const [contextData, setContextData] = useState<SuperSet>(superset);

  return (
    <AudioProvider>
      <SearchProvider>
        <TagProvider>
          <CardSetContext value={[contextData, setContextData]}>
            <div className="flex h-lvh w-full">
              <SideBar/>
              <Body/>
            </div>
          </CardSetContext>
        </TagProvider>
      </SearchProvider>
    </AudioProvider>
  );
}

export default App
