import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
} from "react";

import disc from "@assets/img/disc.webp";
import logo from "@assets/img/gimmesong_logo.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@styles/slick-slider-custom.css";

import Empty from "./Empty";
import AudioPlayer from "@components/AudioPlayer";
import AddSong from "@features/RequestSongs/AddSong";

// import { durationToStr } from "@utils/audio";
import {
  Switch,
} from "@chakra-ui/react";

import ytm from "@lib/ytm_api";
import toast from "react-hot-toast";
import { StreamingError, PlayerError } from "@lib/error";

import { PlaylistContext } from "contexts/PlaylistContext";

// import useDocumentTitle from "@hooks/useDocumentTitle";
import useScrollPosition from "@hooks/useScrollPosition";
import { useInView } from "react-cool-inview";
import useCounterEffect from "@hooks/useCounterEffect";
import { useLocalStorage } from "@hooks/useLocalStorage";

import { useShareDialog } from "@hooks/useShareDialog";

function ReceivedSongs({ layout, onLayoutChange }) {
  const {
    state: { isLoadingItems, isLoadingMore, hasNext },
    data: { items },
    action: { fetchPlaylistItems, shouldLoadMore, loadMore },
  } = useContext(PlaylistContext);

  const { observe: loadMoreRef } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "50px 0px",
    // When the last item comes to the viewport
    onEnter: () => {
      if (hasNext && !isLoadingMore) loadMore(20);
    },
  });

  const scrollY = useScrollPosition();
  const [scrollPosition, setScrollPosition] = useState(0);

  // const [exportMode, setExportMode] = useState("widget");
  const exportRef = useRef();

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [playerSetting, setPlayerSetting] = useLocalStorage("player", {
    autoplay: false,
  });
  // const [autoPlayTimer, setAutoPlayTimer] = useState(5);

  const {
    counter: upNextCounter,
    callback: upNextCallback,
    clear: clearUpNextTimer,
  } = useCounterEffect();

  // const [title, setTitle] = useState("");
  // useDocumentTitle(title);

  const slider = useRef(null);
  const [current, setCurrent] = useState(null);

  const [loadingStreamingData, setLoadingStreamingData] = useState(false);
  const [streamingError, setStreamingError] = useState(null);

  const [playbackURL, setPlaybackURL] = useState({});

  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "70px",
    slidesToShow: 1,
    speed: 500,
    beforeChange: (current, next) => {
      setCurrent(next);
    },
  };

  const { openShareDialog, ShareDialog } = useShareDialog();

  const handleSelect = async (index) => {
    // when user click on music disc,
    // set current to selected index
    // and change layout to single
    setCurrent(index);
    onLayoutChange("single");
  };

  const getPlaybackURL = async (videoId) => {
    if (!videoId) return;

    // check object key before query, if not found will query new playback url
    if (!playbackURL[videoId]) {
      try {
        setLoadingStreamingData(true);
        // implement fetch playback url here, then set to playbackURL object
        // to reuse in next time

        const streamsData = await ytm.getStreamsUrl(videoId);

        setPlaybackURL((prev) => {
          return {
            ...prev,
            [videoId]: streamsData,
          };
        });
      } catch (err) {
        throw err;
      } finally {
        setLoadingStreamingData(false);
      }
    }
  };

  const getSavedURL = useMemo(() => {
    const url = playbackURL[items[current]?.content?.song?.videoId];
    const identifier = `#${items[current]?.id}`;

    if (!url) return;
    return `${url["audio/mp4"]}${identifier}`;
  }, [current, playbackURL]);

  const handleToggleAutoPlay = (checked) => {
    setPlayerSetting({
      autoplay: checked,
    });
    toast(checked ? "Autoplay is on" : "Autoplay is off", {
      style: {
        borderRadius: "25px",
        background: "#000",
        color: "#fff",
      },
    });
  };

  const handleToggle = async (id) => {
    await audioRef.current.toggle();
  };

  const handlePlayerError = (err) => {
    // let msg = "";
    // if (err instanceof PlayerError) {
    //   if (err.code === "NO_AUDIO_SOURCE") {
    //     msg = ""; // show nothing
    //   } else {
    //     msg = "PlayerError: " + err.message;
    //   }
    // }
    // if (msg) {
    //   toast(msg, {
    //     duration: 4000,
    //     style: {
    //       borderRadius: "25px",
    //       background: "#FF6464",
    //       color: "#fff",
    //     },
    //   });
    // }
  };

  const handleTrackEnded = () => {
    if (playerSetting.autoplay) {
      // upNextCallback(setNextTrack, autoPlayTimer);
      setNextTrack();
    }
  };

  const nextTrackIndex = useMemo(
    () => (current < items.length - 1 ? current + 1 : 0),
    [items, current]
  );

  /**
   * @notice Handle set next track
   * @dev before set new current index (next track index)
   * need to make sure the current index is not the last items in playlist
   */
  const setNextTrack = async () => {
    setCurrent(nextTrackIndex);
    if (layout === "single") sliderGoTo(nextTrackIndex);
  };

  const handleTrackChange = async () => {
    if (playerSetting.autoplay) {
      clearUpNextTimer();
    }

    if (shouldLoadMore(current, 6) && hasNext && !isLoadingMore) loadMore(6);

    // set page title to current song title
    // setTitle(items[current]?.content?.song?.title);

    // set info about the current playback state
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: items[current]?.content?.song?.title,
        artist: items[current]?.content?.song?.artistInfo?.artist[0]?.text,
        artwork: [
          {
            src: items[current].content?.song?.thumbnails[
              items[current].content?.song?.thumbnails.length - 1
            ]?.url,
          },
        ],
      });
    }

    console.log(navigator.mediaSession.metadata);

    // always reset streaming error that occurred from previous song
    setStreamingError(null);
    try {
      // get videoplayback url here
      const videoId = items[current]?.content?.song?.videoId;
      await getPlaybackURL(videoId);
    } catch (err) {
      let msg = "";
      if (err instanceof StreamingError) {
        setStreamingError({
          id: items[current]?.id,
        });
        msg =
          "Unfortunately, this song is unable to play on our App, Please try to open it on Youtube instead";
      }
      if (msg) {
        toast(msg, {
          duration: 4000,
          style: {
            borderRadius: "25px",
            background: "#FF6464",
            color: "#fff",
          },
        });
      }
      console.error(err);

      if (playerSetting.autoplay) {
        // upNextCallback(setNextTrack, autoPlayTimer);
        setNextTrack();
      }
    }
  };

  const sliderGoTo = (index) => {
    // disable animate = true
    if (slider.current) slider.current.slickGoTo(index, true);
  };

  // do when added new song
  useEffect(() => {
    if (layout === "single") {
      setTimeout(() => sliderGoTo(0), 100);
    }
  }, [items]);

  useEffect(() => {
    if (current === null) return;
    handleTrackChange();
  }, [current]);

  /**
   * @dev if switch layout from multiple to single
   * or click select song from multiple layout (layout will change to single automatically)
   * then scroll slider to index
   */
  useEffect(() => {
    if (items.length > 0) {
      if (layout === "single") {
        // by default in multiple layout current is null until user click select song
        if (current === null) setCurrent(0);

        // use setTimeout to prevent element ref is null
        setTimeout(() => sliderGoTo(current), 100);
      } else if (layout === "multiple") {
        window.scrollTo(0, scrollPosition);
        // if (current === null) return; // do nothing
        // const el = document.querySelector(`[data-id="${items[current].id}"]`);
        // el.scrollIntoView({ block: "center" });
      }
    }
  }, [layout]);

  useEffect(() => {
    fetchPlaylistItems();
  }, []);

  useEffect(() => {
    if (layout !== "multiple") return;
    setScrollPosition(scrollY);
  }, [scrollY]);

  return (
    <>
      <div className={`relative ${layout === "single" ? "w-full" : ""} h-full`}>
        {isLoadingItems ? (
          <div className="my-12 flex items-center justify-center">
            <svg
              className="h-8 w-8 animate-spin text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : items.length > 0 ? (
          <>
            {layout === "single" ? (
              <>
                <div
                  className={`overflow-hidden ${current !== null ? "pb-[88px]" : "pb-[24px]"
                    }`}
                >
                  <Slider ref={slider} {...settings}>
                    {items.map((item, i) => {
                      return (
                        <div className="outline-none" key={item.id}>
                          <div className="flex flex-col items-center justify-center">
                            <div className="mt-6 w-[90%]">
                              <div
                                className={`relative w-full pt-[100%] ${items[current]?.id === item.id
                                    ? "animate-spin-slow"
                                    : ""
                                  } ${!playing && items[current]?.id === item.id
                                    ? "animate-pause"
                                    : ""
                                  }`}
                              >
                                <img
                                  className="absolute inset-0 h-full w-full select-none object-contain"
                                  src={disc}
                                  alt="disc"
                                />
                                <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                                  {item.content?.song?.thumbnails?.length >
                                    0 && (
                                      <img
                                        className="h-[27%] w-[27%] select-none rounded-full object-contain"
                                        src={
                                          item.content?.song?.thumbnails[0]?.url
                                        }
                                        alt="thumbnail"
                                        referrerPolicy="no-referrer"
                                        crossOrigin="anonymous"
                                      />
                                    )}
                                </div>
                              </div>
                            </div>
                            {items[current]?.id === item.id && (
                              <span
                                style={{
                                  wordBreak: "break-word",
                                  whiteSpace: "pre-line",
                                }}
                                className="my-6 w-full text-center text-xl leading-6 text-gray-700"
                              >
                                {item.content?.message}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`grid grid-cols-2 gap-4 overflow-x-hidden pt-4`}
                >
                  {items.map((item, i) => (
                    <div
                      onClick={() => handleSelect(i)}
                      data-id={item.id}
                      key={item.id}
                      className={`relative w-[160px] cursor-pointer pt-[100%] ${items[current]?.id === item.id
                          ? "animate-spin-slow"
                          : ""
                        } ${!playing && items[current]?.id === item.id
                          ? "animate-pause"
                          : ""
                        }`}
                    >
                      <img
                        className="absolute inset-0 h-full w-full select-none object-contain"
                        src={disc}
                        alt="disc"
                      />
                      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                        {item.content?.song?.thumbnails?.length > 0 && (
                          <img
                            className="h-[27%] w-[27%] select-none rounded-full object-contain"
                            src={item.content?.song?.thumbnails[0]?.url}
                            alt="thumbnail"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  ref={loadMoreRef}
                  className={`flex items-center justify-center ${current !== null ? "pb-[88px]" : "pb-[24px]"
                    }`}
                >
                  {hasNext && (
                    <svg
                      className="my-12 h-8 w-8 animate-spin text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                </div>
              </>
            )}

            {current !== null && (
              <>
                <div className="fixed left-0 right-0 bottom-[112px] flex w-full flex-col items-center justify-center">
                  {streamingError?.id === items[current]?.id && (
                    <div
                      className="inline-flex rounded-full shadow-sm"
                      role="group"
                    >
                      <a
                        href={`https://music.youtube.com/watch?v=${items[current].content?.song?.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex rounded-l-full bg-white py-3 px-4 text-sm font-medium text-gray-500`}
                      >
                        <svg
                          className="mr-1.5 h-5 w-5 text-red-500"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="currentColor"
                            d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"
                          />
                        </svg>
                        Open in Youtube Music
                      </a>
                      <button
                        onClick={() => setStreamingError(null)}
                        type="button"
                        className={`rounded-r-full border-l bg-white py-3 px-4 text-sm font-medium text-gray-500`}
                      >
                        <svg
                          className="h-5 w-5 text-gray-800"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}
                  {playerSetting.autoplay && upNextCounter > 0 && (
                    <div
                      className="mt-2 inline-flex rounded-full shadow-sm"
                      role="group"
                    >
                      <a
                        href={`https://music.youtube.com/watch?v=${items[current].content?.song?.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex rounded-l-full bg-black/80 py-3 px-4 text-sm font-medium text-white`}
                      >
                        {/* <svg
                          className="mr-1.5 h-5 w-5 text-red-500"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="currentColor"
                            d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"
                          />
                        </svg> */}
                        <img
                          className="mr-1.5 h-5 w-5 select-none rounded-full object-contain"
                          src={
                            items[nextTrackIndex].content?.song?.thumbnails[0]
                              ?.url
                          }
                          alt="thumbnail"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        Up next in {upNextCounter}
                      </a>
                      <button
                        onClick={clearUpNextTimer}
                        type="button"
                        className={`rounded-r-full border-l border-white/25 bg-black/80 py-3 px-4 text-sm font-medium text-white`}
                      >
                        <svg
                          className="h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <div className="fixed left-0 right-0 bottom-0 z-20 flex w-full items-center justify-center py-6 px-5">
                  <AudioPlayer
                    ref={audioRef}
                    src={getSavedURL}
                    onToggle={setPlaying}
                    onLoading={setLoadingAudio}
                    onEnded={handleTrackEnded}
                    onError={handlePlayerError}
                    autoPlayAfterSrcChange={playerSetting.autoplay}
                    loadingSource={loadingStreamingData}
                  />
                  <div className="mr-2 flex h-16 w-[280px] shrink-0 items-center justify-between rounded-full bg-white p-3 pl-5 pr-4">
                    {/* <div className="flex items-center overflow-hidden"> */}
                    <div className="flex-1 overflow-hidden">
                      <div className="mr-2.5 flex min-w-0 flex-col">
                        <span className="select-none truncate text-sm">
                          {items[current]?.content?.song?.title}
                        </span>
                        <span className="select-none truncate text-xs text-gray-500">
                          {
                            items[current]?.content?.song?.artistInfo?.artist[0]
                              ?.text
                          }
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(items[current]?.id)}
                      className="rounded-ful mr-2.5 flex h-7 w-7 shrink-0 items-center justify-center"
                    >
                      {loadingStreamingData || loadingAudio ? (
                        <svg
                          className="h-4 w-4 animate-spin text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : !playing ? (
                        <svg
                          className="h-4 w-4 text-black"
                          viewBox="0 0 11 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 4.76795C11.3333 5.53775 11.3333 7.46225 10 8.23205L3.25 12.1292C1.91666 12.899 0.249999 11.9367 0.249999 10.3971L0.25 2.60288C0.25 1.06328 1.91667 0.101034 3.25 0.870834L10 4.76795Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-3 w-3 text-black"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="4"
                            height="11"
                            rx="2"
                            fill="currentColor"
                          />
                          <rect
                            x="7"
                            width="4"
                            height="11"
                            rx="2"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => setNextTrack()}
                      className="rounded-ful mr-2.5 flex h-7 w-7 shrink-0 items-center justify-center"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="14.9888"
                          y="1.43457"
                          width="3.28191"
                          height="14.7686"
                          rx="1.64096"
                          fill="black"
                        />
                        <path
                          d="M11.9888 7.08709C13.3221 7.85689 13.3221 9.78139 11.9888 10.5512L3.22016 15.6137C1.88683 16.3835 0.220161 15.4213 0.220161 13.8817L0.220161 3.75658C0.220161 2.21698 1.88683 1.25473 3.22016 2.02453L11.9888 7.08709Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                    <Switch
                      isChecked={playerSetting.autoplay}
                      onChange={(e) => handleToggleAutoPlay(e.target.checked)}
                    />
                    {/* </div> */}
                  </div>
                  <button
                    onClick={openShareDialog}
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </button>
                  <div className="h-0 w-0 overflow-hidden">
                    <div
                      ref={exportRef}
                      className="flex w-[960px] flex-col items-center justify-between overflow-hidden rounded-[108px] border border-gray-200 bg-white p-[36px]"
                    >
                      <div className="flex items-center justify-center">
                        <img
                          className="mr-[8px] h-[36px] w-[36px]"
                          src={logo}
                          alt="disc"
                        />
                        <span className="gimmesong-primary-font -mt-[27.5px] text-[36px] tracking-wider">
                          GIMMESONG
                        </span>
                      </div>
                      <p
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-line",
                          // "-webkit-text-stroke": "0.5px white",
                        }}
                        className="flex min-h-[384px] w-full items-center justify-center px-[54px] pt-[54px] pb-[120px] text-center text-[60px] font-semibold text-gray-800"
                      >
                        {items[current]?.content?.message}
                      </p>
                      <div
                        className={`pointer-events-none flex h-[192px] w-full items-center justify-between rounded-full bg-white bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] p-[36px] pr-[48px] text-white hover:bg-gray-100`}
                      >
                        <div className="flex items-center overflow-hidden">
                          <img
                            className="h-[120px] w-[120px] shrink-0 rounded-full object-contain"
                            src={
                              items[current]?.content?.song?.thumbnails[0]?.url
                            }
                            alt="thumbnail"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                          />
                          <div className="mx-[30px] -mt-[16px] flex min-w-0 flex-col">
                            <span
                              className={`-mt-[25px] truncate text-[42px] font-light leading-[2]`}
                            >
                              {items[current]?.content?.song?.title}
                            </span>
                            <span
                              className={`-mt-[25px] truncate text-[36px] font-light leading-[2] text-white`}
                            >
                              {
                                items[current]?.content?.song?.artistInfo
                                  ?.artist[0]?.text
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ShareDialog content={{
                    song: {
                      title: items[current]?.content?.song?.title,
                      artist:
                        items[current]?.content?.song?.artistInfo?.artist[0]
                          ?.text,
                      thumbnails: items[current]?.content?.song?.thumbnails,
                    },
                    vinylStyle: items[current]?.vinyl_style,
                    message: items[current]?.content?.message,
                  }} showLink={false} />
                </div>
              </>
            )}
          </>
        ) : (
          <Empty
            title="Oops, Such an empty playlist"
            message="Let's start sharing the link with someone, or start adding your favorite songs."
          >
            <AddSong className="mt-3" />
          </Empty>
        )}
      </div>
    </>
  );
}

export default ReceivedSongs;
