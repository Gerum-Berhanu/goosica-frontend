import {Body} from "./components/layouts/Body";
import {SideBar} from "./components/sections/SideBar";

function App() {
  return (
    <div className="flex h-lvh w-full">
      <SideBar/>
      <Body/>
    </div>
  );
}

export default App
