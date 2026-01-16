import {Body} from "./components/layouts/Body";
import {SideBar} from "./components/sections/SideBar";
import { AudioProvider } from "./components/context/AudioProvider";
import { TagProvider } from "./components/context/TagProvider";
import { SongProvider } from "./components/context/SongProvider";
import { FocusedCardProvider } from "./components/context/FocusedCardProvider";

function App() {
  return (
    <AudioProvider>
        <SongProvider>
          <TagProvider>
            {/* <SearchSongHydrator/> */}
            <FocusedCardProvider>
              <div className="flex h-lvh w-full">
                <SideBar/>
                <Body/>
              </div>
            </FocusedCardProvider>
          </TagProvider>
        </SongProvider>
    </AudioProvider>
  );
}

export default App
