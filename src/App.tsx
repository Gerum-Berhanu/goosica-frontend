import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import {Body} from "./components/layouts/Body";
import {SideBar} from "./components/sections/SideBar";
import { type OrderById, cardsById, type GroupCollectionType, groupByTag } from "./components/utils/devToolkit";

export const CardSetContext = createContext<[OrderById, Dispatch<SetStateAction<OrderById>>] | null>(null);

export const useCardSet = () => {
  const context = useContext(CardSetContext);
  if (!context) {
    throw new Error("useCardSet must be used within a CardSetProvider");
  }
  return context;
};

function App() {
  const [contextData, setContextData] = useState<OrderById>(cardsById);
  const groupedCollection: GroupCollectionType = groupByTag(contextData);

  return (
    <CardSetContext value={[contextData, setContextData]}>
      <div className="flex h-lvh w-full">
        <SideBar/>
        <Body group={groupedCollection}/>
      </div>
    </CardSetContext>
  );
}

export default App
