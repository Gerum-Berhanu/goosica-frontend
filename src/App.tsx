import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import {Body} from "./components/layouts/Body";
import {SideBar} from "./components/sections/SideBar";
import { superset, type SuperSet, type GroupCollectionType } from "./components/utils/devToolkit";
import { AudioProvider } from "./components/utils/AudioProvider";

export const CardSetContext = createContext<[SuperSet, Dispatch<SetStateAction<SuperSet>>] | null>(null);

export const useCardSet = () => {
  const context = useContext(CardSetContext);
  if (!context) {
    throw new Error("useCardSet must be used within a CardSetProvider");
  }
  return context;
};

function App() {
  const [contextData, setContextData] = useState<SuperSet>(superset);
  const groupedCollection: GroupCollectionType = contextData.state.tagGroup;

  return (
    <AudioProvider>
      <CardSetContext value={[contextData, setContextData]}>
        <div className="flex h-lvh w-full">
          <SideBar/>
          <Body group={groupedCollection}/>
        </div>
      </CardSetContext>
    </AudioProvider>
  );
}

export default App
