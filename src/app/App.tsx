import { useEffect, useState } from "react";
import { container } from "./App.css";
import { themeClass } from "./theme.css";
import Player from "../components/music-player/Player";
import Sidebar from "../components/sidebar/Sidebar";
const proxy = "https://corsproxy.io/?";
const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(proxy + "https://api.deezer.com/album/302127")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`${container} ${themeClass}`}>
      <Sidebar />
      <div>
        <Player tracks={data?.tracks.data} />
      </div>
    </div>
  );
};

export default App;
