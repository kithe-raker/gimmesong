import { useState, useEffect, useRef } from "react";

function useAudioPlayer() {
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  // const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(true);
  // const [clickedTime, setClickedTime] = useState(null);

  const audioRef = useRef(null);

  const isPlaying = () => {
    const audio = audioRef.current;
    if (!audio) return false;
    return !audio.paused && !audio.ended;
  };

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

      // setPlaying(false);
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

      // setLoading(false);
      // setPlaying(true);
      setIsReset(false);
    } catch (err) {
      console.error("Error occurred when playing: ", err);
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    // setPlaying(false);
    setIsReset(true);
  };

  useEffect(() => {
    console.log("Loading: ", loading);
  }, [loading]);

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

  const onPause = () => {
    console.log("Audio is paused");
  };

  const onEnded = () => {
    console.log("Audio is ended");
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
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
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  });

  return {
    audioRef,
    curTime,
    duration,
    playing: isPlaying(),
    loading,
    toggleAudio,
    playAudio,
    stopAudio,
  };
}

export default useAudioPlayer;
