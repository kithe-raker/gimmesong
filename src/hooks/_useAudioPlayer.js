import { useState, useEffect, useRef, useCallback } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState(null);

  const audioRef = useRef(null);

  const resetAudioTime = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurTime(0);
  };

  const reloadAudioSrc = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.pause();
    audio.load();
  };

  useEffect(() => {
    if (!audioRef.current) return;
    // const audio = document.getElementById("audio");

    const audio = audioRef.current;

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  });

  //   const Audio = useCallback(({ src }) => {
  //     return (
  //       <audio ref={audioRef}>
  //         <source src={src} />
  //         Your browser does not support the <code>audio</code> element.
  //       </audio>
  //     );
  //   }, []);

  return {
    // Audio,
    audioRef,
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    reloadAudioSrc,
    resetAudioTime,
  };
}

export default useAudioPlayer;
