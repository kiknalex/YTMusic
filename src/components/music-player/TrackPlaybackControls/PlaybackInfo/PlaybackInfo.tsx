import { RefObject, useState } from "react";
import useSubscribeAudioEvents from "../../../../hooks/useSubscribeAudioEvents";
import { PlaybackLayout } from "./PlaybackInfo.css";
const PlaybackInfo = ({ audioRef }: { audioRef: RefObject<HTMLAudioElement> }) => {
  const [playedTime, setPlayedTime] = useState(0);
  useSubscribeAudioEvents(
    audioRef, 
    () => {
      const currentTime = Math.round(audioRef.current?.currentTime || 0);
      if (currentTime !== playedTime) {
        setPlayedTime(currentTime);
      }
    },
    "timeupdate"
  );
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className={`${PlaybackLayout}`}>
      <p>{formatTime(playedTime)}</p>
      <input
        type="range"
        min="0"
        max={Math.round(audioRef.current?.duration || 0)}
        value={playedTime}
        onChange={(e) => {
            audioRef.current!.currentTime = Number(e.target.value);
            setPlayedTime(Number(e.target.value));
          
        }}
      />
      <p>{formatTime(Math.round(audioRef.current?.duration || 0))}</p>
    </div>
  );
};

export default PlaybackInfo;