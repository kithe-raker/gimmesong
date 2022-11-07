import { useState, useEffect, useRef, useCallback } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const [clickedTime, setClickedTime] = useState(null);

  const audioRef = useRef(null);

  // const resetAudioTime = () => {
  //   if (!audioRef.current) return;
  //   const audio = audioRef.current;
  //   audio.currentTime = 0;
  //   setCurTime(0);
  // };

  // const reloadAudioSrc = () => {
  //   if (!audioRef.current) return;
  //   const audio = audioRef.current;
  //   audio.pause();
  //   audio.load();
  //   // setDuration(0);
  // };

  useEffect(() => {
    if (!audioRef.current) return;
    console.log(audioRef.current?.src);
  }, [audioRef.current]);

  const delay = (time) => new Promise((res) => setTimeout(() => res(), time));

  const toggleAudio = async (e) => {
    if (!audioRef.current) return;

    setLoading(true);

    // e.stopPropagation();
    console.log("==========================");
    const audio = audioRef.current;

    if (audio.paused && !audio.src) await delay(5);

    console.log(audio);
    console.log("audio.src", audio.src);

    if (audio.paused && audio.src) {
      console.log("i do");
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

    // stopAudio();

    if (isReset) {
      console.log("audio.load()");
      audio.load();
    }

    try {
      await audio.play();
      console.log("i do inside playPromise");
      setLoading(false);
      setPlaying(true);
      setIsReset(false);
    } catch (err) {
      console.error("playPromise err", err);
      setLoading(false);
    }

    // const playPromise = audio.play();
    // if (playPromise) {
    //   playPromise
    //     .then(() => {
    //       console.log("i do inside playPromise");
    //       setLoading(false);
    //       setPlaying(true);
    //       setIsReset(false);
    //     })
    //     .catch((err) => {
    //       console.error("playPromise err", err);
    //       setLoading(false);
    //     });
    // }
  };

  // const pause = () => {
  //   if (!audioRef.current) return;
  //   const audio = audioRef.current;
  //   audio.pause();
  //   // setPlaying(false);
  // };

  const stopAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    // toggleAudio();
    setPlaying(false);
    // setDuration(0);
    // setCurTime(0);
    // audio.currentTime = 0;
    setIsReset(true);

    // audio.pause();
  };

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  // state setters wrappers
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

  // const onCanPlay = () => {
  //   if (!audioRef.current) return;
  //   if (audioRef.current?.src) {
  //     console.log("canplaythrough", audioRef.current?.src);
  //     playAudio();
  //   }
  // };

  useEffect(() => {
    if (!audioRef.current) return;
    // const audio = document.getElementById("audio");

    const audio = audioRef.current;

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);
    // audio.addEventListener("canplaythrough", onCanPlay);

    // if (clickedTime && clickedTime !== curTime) {
    //   audio.currentTime = clickedTime;
    //   setClickedTime(null);
    // }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      // audio.removeEventListener("canplaythrough", onCanPlay);
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
