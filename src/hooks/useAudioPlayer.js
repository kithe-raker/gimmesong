import { useState, useEffect, useRef } from "react";
import { PlayerError } from "@lib/error";

function useAudioPlayer() {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(true);
  // const [clickedTime, setClickedTime] = useState(null);

  const audioRef = useRef(null);

  // const isPlaying = () => {
  //   const audio = audioRef.current;
  //   if (!audio) return false;

  //   console.log(!audio.paused && !audio.ended);

  //   return !audio.paused && !audio.ended;
  // };

  const delay = (time) => new Promise((res) => setTimeout(() => res(), time));

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    console.log("==========================");
    setLoading(true);

    const audio = audioRef.current;

    if (isReset) loadAudio();

    // if (audio.paused) await delay(5);
    if (audio.paused && !audio.src) await delay(50);
    if (audio.paused && audio.src) {
      // console.log("Src is ready!");
      console.log("Start playing audio...");
      await playAudio();
    } else if (!audio.paused) {
      audio.pause();

      // setPlaying(false);
      setLoading(false);
    }
  };

  const playAudio = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    // if (isReset) {
    //   console.log("audio.load()");
    //   audio.load();
    // }
    // if (isReset) {
    //   console.log("before load", audio);
    //   loadAudio();
    //   await delay(10000);
    // }
    // console.log("after load", audio);

    try {
      await audio.play();

      // setLoading(false);
      // setPlaying(true);
      setIsReset(false);
    } catch (err) {
      audio.pause();
      throw new PlayerError({
        code: "PLAYER_FAILED",
        message: err.message,
      });
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const loadAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    // if (isReset) {
    console.log("audio.load()");
    audio.load();
    // }
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;
    setIsReset(true);
  };

  // const handlePlay = async () => {
  //   if (isReset) loadAudio();
  //   await toggleAudio();
  // };

  useEffect(() => {
    console.log("Loading: ", loading);
  }, [loading]);

  useEffect(() => {
    console.log("isWaitForReset: ", isReset);
  }, [isReset]);

  // useEffect(() => {
  //   console.log(`ed${curTime}/${duration}`);
  // }, [duration, curTime]);

  const setAudioData = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
    setCurTime(audio.currentTime);
  };

  const setAudioTime = () => {
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
    // await playAudio();
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("canplaythrough", onCanPlayThrough);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // if (clickedTime && clickedTime !== curTime) {
    //   audio.currentTime = clickedTime;
    //   setClickedTime(null);
    // }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
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
    // playing: isPlaying(),
    playing,
    loading,
    loadAudio,
    toggleAudio,
    playAudio,
    stopAudio,
  };
}

export default useAudioPlayer;
