import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

import { PlayerError } from "@lib/error";

const AudioPlayer = forwardRef((props, ref) => {
  const {
    src,
    onToggle,
    onLoading,
    onEnded,
    loadingSource,
    autoPlayAfterSrcChange,
  } = props;

  const [audioSrc, setAudioSrc] = useState("");
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);

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
      throw new PlayerError({
        code: "NO_AUDIO_SOURCE",
        message: "No audio source",
      });
    }

    const audio = audioRef.current;

    onLoading(true);

    let playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {})
        .catch((err) => {
          throw new PlayerError({
            code: "PLAYER_FAILED",
            message: err.message,
          });
        })
        .finally(() => {
          onLoading(false);
        });
    }
  };

<<<<<<< HEAD
  const handleLoaded = () => {
=======
  const onLoaded = () => {
>>>>>>> cd3baacc1e927c377619e85ee2cf630fac4e6c9b
    const audio = audioRef.current;
    setDuration(audio.duration);
    setCurTime(audio.currentTime);
    console.log("Audio is loaded");
  };

<<<<<<< HEAD
  const handleTimeUpdate = () => {
=======
  const onTimeUpdate = () => {
>>>>>>> cd3baacc1e927c377619e85ee2cf630fac4e6c9b
    const audio = audioRef.current;
    setCurTime(audio.currentTime);
  };

<<<<<<< HEAD
  const handlePlaying = () => {
=======
  const onPlaying = () => {
>>>>>>> cd3baacc1e927c377619e85ee2cf630fac4e6c9b
    setPlaying(true);
    onToggle(true);
    console.log("Audio is playing");
  };

<<<<<<< HEAD
  const handlePause = () => {
=======
  const onPause = () => {
>>>>>>> cd3baacc1e927c377619e85ee2cf630fac4e6c9b
    setPlaying(false);
    onToggle(false);
    console.log("Audio is paused");
  };

<<<<<<< HEAD
  const handleEnded = () => {
    setPlaying(false);
    onToggle(false);
    console.log("Audio is ended");

    onEnded && onEnded();
=======
  const onEnded = () => {
    setPlaying(false);
    onToggle(false);
    console.log("Audio is ended");
>>>>>>> cd3baacc1e927c377619e85ee2cf630fac4e6c9b
  };

  /**
   * @notice Handle audio src change
   * @dev when src params was changed, set the new `audioSrc`
   * and reset audio player and related state
   */
  useEffect(() => {
    if (src !== audioSrc) {
      setAudioSrc(src);

      if (!audioRef.current) return;
      const audio = audioRef.current;

      audio.pause();
      audio.currentTime = 0;

      setPlaying(false);

      onToggle(false);
      onLoading(false);
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
    if (autoPlayAfterSrcChange && !loadingSource) {
      play();
    }
  }, [audioSrc]);

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        src={audioSrc}
<<<<<<< HEAD
        onLoadedData={handleLoaded}
        onTimeUpdate={handleTimeUpdate}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onEnded={handleEnded}
=======
        onLoadedData={onLoaded}
        onTimeUpdate={onTimeUpdate}
        onPlaying={onPlaying}
        onPause={onPause}
        onEnded={onEnded}
>>>>>>> cd3baacc1e927c377619e85ee2cf630fac4e6c9b
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
