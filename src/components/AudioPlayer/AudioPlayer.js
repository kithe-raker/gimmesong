import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

import { detect } from "detect-browser";
import { durationToStr } from "@utils/audio";

import { PlayerError } from "@lib/error";

const AudioPlayer = forwardRef((props, ref) => {
  const {
    src,
    onToggle,
    onLoading,
    onError,
    onEnded,
    loadingSource,
    autoPlayAfterSrcChange,
    afterPlayed = () => {},
  } = props;

  const [audioSrc, setAudioSrc] = useState("");
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);

  const browser = detect();

  /**
   * @dev `useImperativeHandle` allow us to manipulate audio player state from parent component
   * in this case is toggle (play/pause) an audio.
   */
  useImperativeHandle(ref, () => ({
    async toggle() {
      await toggleAudio();
    },
  }));

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    // Play audio when player is not playing or loading audio source
    if (!playing && !loadingSource) {
      await playPromise();
    } else if (playing) {
      audio.pause();
    }
  };

  const playPromise = async () => {
    if (!audioRef.current) return;
    if (!audioSrc) {
      let error = new PlayerError({
        code: "NO_AUDIO_SOURCE",
        message: "No audio source",
      });
      onError && onError(error);
      throw error;
    }

    const audio = audioRef.current;

    onLoading(true);

    let playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          afterPlayed();
        })
        .catch((err) => {
          let error = new PlayerError({
            code: "PLAYER_FAILED",
            message: err.message,
          });
          onError && onError(error);
          throw error;
        })
        .finally(() => {
          onLoading(false);
        });
    }
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;

    setPlaying(false);

    onToggle(false);
    onLoading(false);
  };

  const handleLoaded = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
    setCurTime(audio.currentTime);
    console.log("Audio is loaded");
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurTime(audio.currentTime);

    if (browser.os === "iOS" || browser.name === "safari") {
      if (audio.currentTime >= audio.duration / 2) {
        console.log(
          "Audio will force to stop playing at",
          durationToStr(audio.currentTime)
        );
        stopAudio();

        onEnded && onEnded();
      }
    }
  };

  const handlePlaying = () => {
    setPlaying(true);
    onToggle(true);
    console.log("Audio is playing");
  };

  const handlePause = () => {
    setPlaying(false);
    onToggle(false);
    console.log("Audio is paused");
  };

  const handleEnded = () => {
    setPlaying(false);
    onToggle(false);
    console.log("Audio is ended");

    onEnded && onEnded();
  };

  /**
   * @notice Handle audio src change
   * @dev when src params was changed, set the new `audioSrc`
   * and reset audio player and related state
   */
  useEffect(() => {
    if (src !== audioSrc) {
      setAudioSrc(src);
      stopAudio();
    }
  }, [src]);

  /**
   * @notice Handle after `audioSrc` changed
   * @dev if `autoPlayAfterSrcChange` is enabled, player will autoplay an audio
   */
  useEffect(() => {
    const play = async () => {
      await playPromise();
    };
    // Play audio when player is not loading audio source
    if (autoPlayAfterSrcChange && !loadingSource && audioSrc) {
      play();
    }
  }, [audioSrc]);

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        src={audioSrc}
        onLoadedData={handleLoaded}
        onTimeUpdate={handleTimeUpdate}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onEnded={handleEnded}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
