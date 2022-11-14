import { useState, useEffect, useRef } from "react";
import { PlayerError } from "@lib/error";

function useAudioPlayer() {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWaitForReload, setIsWaitForReload] = useState(true);

  // const [clickedTime, setClickedTime] = useState(null);

  const audioRef = useRef(null);

  const delay = (time) => new Promise((res) => setTimeout(() => res(), time));
  const toggleAudio = async () => {
    if (!audioRef.current) return;

    console.log("==========================");
    setLoading(true);

    const audio = audioRef.current;

    if (isWaitForReload) loadAudio();
    if (audio.paused && !audio.src) await delay(50);
    if (audio.paused && audio.src) {
      await playAudio();
    } else if (!audio.paused) {
      audio.pause();
      setLoading(false);
    }
  };

  const playAudio = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    try {
      await audio.play();
      setIsWaitForReload(false);
    } catch (err) {
      audio.pause();
      throw new PlayerError({
        code: "PLAYER_FAILED",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    console.log("audio.load()");
    audio.load();
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;
    setIsWaitForReload(true);
  };

  const onLoaded = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
    setCurTime(audio.currentTime);
    console.log("Audio is loaded");
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    setCurTime(audio.currentTime);
  };

  const onPlaying = () => {
    setPlaying(true);
    console.log("Audio is playing");
  };

  const onPause = () => {
    setPlaying(false);
    console.log("Audio is paused");
  };

  const onEnded = () => {
    setPlaying(false);
    console.log("Audio is ended");
  };

  const onCanPlayThrough = async () => {
    console.log("Audio is ready");
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.addEventListener("loadeddata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("canplaythrough", onCanPlayThrough);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // if (clickedTime && clickedTime !== curTime) {
    //   audio.currentTime = clickedTime;
    //   setClickedTime(null);
    // }

    return () => {
      audio.removeEventListener("loadeddata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("canplaythrough", onCanPlayThrough);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  });

  return {
    audioRef,
    curTime,
    duration,
    playing,
    loading,
    toggleAudio,
    stopAudio,
  };
}

export default useAudioPlayer;
