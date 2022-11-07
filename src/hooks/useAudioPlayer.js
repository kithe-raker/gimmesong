import { useState, useEffect, useRef, useCallback } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const [clickedTime, setClickedTime] = useState(null);

  const audioRef = useRef(null);

  const delay = (time) => new Promise((res) => setTimeout(() => res(), time));

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    console.log("==========================");
    setLoading(true);

    const audio = audioRef.current;

    if (audio.paused && !audio.src) await delay(5);
    if (audio.paused && audio.src) {
      console.log("Src is ready!");
      console.log("Start playing audio...");

      playAudio();
    } else if (!audio.paused) {
      audio.pause();

      setPlaying(false);
      setLoading(false);
    }
  };

  const playAudio = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isReset) {
      console.log("audio.load()");
      audio.load();
    }

    try {
      await audio.play();
      console.log("Audio is playing...");

      setLoading(false);
      setPlaying(true);
      setIsReset(false);
    } catch (err) {
      console.error("Error occurred when playing: ", err);
      setLoading(false);
    }
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    setPlaying(false);
    setIsReset(true);
  };

  useEffect(() => {
    console.log("Loading: ", loading);
  }, [loading]);

  const setAudioData = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
    setCurTime(audio.currentTime);
    console.log(audio.currentTime);
  };

  const setAudioTime = () => {
    const audio = audioRef.current;
    setCurTime(audio.currentTime);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // if (clickedTime && clickedTime !== curTime) {
    //   audio.currentTime = clickedTime;
    //   setClickedTime(null);
    // }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  return {
    audioRef,
    curTime,
    duration,
    playing,
    loading,
    toggleAudio,
    playAudio,
    stopAudio,
  };
}

export default useAudioPlayer;
