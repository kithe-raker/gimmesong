import { useState, useRef, useEffect, useCallback } from "react";

import disc from "@assets/img/disc.png";
import logo from "@assets/img/gimmesong_logo.png";
import shushingEmoji from "@assets/img/shushing_emoji.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EmptySong from "./EmptySong";

import useAudioPlayer from "@hooks/useAudioPlayer";
import { useSteps } from "@hooks/useSteps";

import { durationToStr } from "@utils/audio";
import GimmesongAPI from "@lib/gimmesong_api";

import html2canvas from "html2canvas";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import ytm from "@lib/ytm_api";
import toast from "react-hot-toast";
import { StreamingError, PlayerError } from "@lib/error";

function NewReceived({ layout, onLayoutChange }) {
  const { activeStep, setStep, skip, nextStep } = useSteps({
    totalSteps: 4,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const onCloseModal = () => {
    onClose();
    setStep(1);
  };

  const [exportMode, setExportMode] = useState("widget");
  const exportRef = useRef();

  const {
    audioRef,
    playing,
    loading: loadingAudio,
    toggleAudio,
    stopAudio,
  } = useAudioPlayer();

  const [received, setReceived] = useState([]);

  const slider = useRef(null);
  const [current, setCurrent] = useState(null);

  const [loadingStreamingData, setLoadingStreamingData] = useState(false);
  const [loadingSong, setLoadingSong] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const exportImage = (inboxId) => {
    if (!exportRef.current || !inboxId) return;
    htmlToPng(exportRef.current, inboxId);
  };

  const htmlToPng = useCallback(async (element, inboxId) => {
    if (!element) return;

    const width = element.clientWidth;
    const height = element.clientHeight;

    const canvas = await html2canvas(element, {
      height,
      width,
      backgroundColor: null,
      useCORS: true,
    });

    // document.body.appendChild(canvas);

    let a = document.createElement("a");
    a.download = `inbox-${exportMode}-${inboxId}.png`;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.click();
      onCloseModal();
    });
  }, []);

  const handleSelect = (index) => {
    // when user click on music disc,
    // set current to selected index
    // and change layout to single
    setCurrent(index);
    onLayoutChange("single");
  };

  const getPlaybackURL = async (videoId) => {
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

  const handlePlay = async (id) => {
    try {
      // get videoplayback url here
      const videoId = received[current].content?.song?.videoId;
      await getPlaybackURL(videoId);

      // then update played = true to database
      if (!received[current].played) await GimmesongAPI.playedInbox(id);
      let updated = received.map((item) =>
        item.id === id
          ? {
              ...item,
              played: true,
            }
          : item
      );
      setReceived(updated);

      // toggle audio player
      await toggleAudio();

      // reload audio source when current.src is changed
      // reloadAudioSrc();
      // setPlaying(true);
    } catch (err) {
      let msg = "";
      if (err instanceof StreamingError) {
        msg = "StreamingError: " + err.message;
      } else if (err instanceof PlayerError) {
        if (err.message.includes("denied permission")) {
        } else {
          msg = "PlayerError: " + err.message;
        }
      }
      if (msg) {
        toast(msg, {
          style: {
            borderRadius: "25px",
            background: "#FF6464",
            color: "#fff",
          },
        });
      }
      console.error(err);
    }
  };

  const toggle = async () => {
    try {
      // when toggle to play played audio, we need to get playback url again to prevent error
      // from play/pause empty source url

      // get videoplayback url here
      const videoId = received[current].content?.song?.videoId;
      await getPlaybackURL(videoId);

      // toggle audio player
      await toggleAudio();

      // after current.src is changed, need to reload src before use audio.play()
      // and to prevent reload src on pausing we determine from current audio time not equal zero
      // if (curTime === 0) reloadAudioSrc();
      // setPlaying((prev) => !prev);
    } catch (err) {
      let msg = "";
      if (err instanceof StreamingError) {
        msg = "StreamingError: " + err.message;
      } else if (err instanceof PlayerError) {
        if (err.message.includes("denied permission")) {
        } else {
          msg = "PlayerError: " + err.message;
        }
      }
      if (msg) {
        toast(msg, {
          style: {
            borderRadius: "25px",
            background: "#FF6464",
            color: "#fff",
          },
        });
      }
      console.error(err);
    }
  };

  const handleSwipe = () => {
    // setPlaying(false);
    // reloadAudioSrc();
    if (current !== null) stopAudio();
  };

  const goTo = (index) => {
    // disable animate true
    if (slider.current) slider.current.slickGoTo(index, true);
  };

  useEffect(() => {
    handleSwipe();
  }, [current]);

  /**
   * @dev if switch layout from multiple to single
   * or click select song from multiple layout (layout will change to single automatically)
   * then scroll slider to index
   */
  useEffect(() => {
    if (layout === "single") {
      if (received.length > 0) {
        // use setTimeout to prevent element ref is null
        setTimeout(() => goTo(current), 100);
      }
    }
  }, [layout]);

  const fetchInbox = async () => {
    try {
      setLoading(true);
      setError(false);

      let results = await GimmesongAPI.queryInbox({ filter: "new" });
      if (results.length > 0) {
        setReceived(results);
        setCurrent(0);
      }
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  return (
    <>
      <div className={`relative mt-6 ${layout === "single" ? "w-full" : ""}`}>
        {loading ? (
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
        ) : received.length > 0 ? (
          <>
            {layout === "single" ? (
              <>
                <div
                  className={`max-h-[calc(100vh-24px-104px-42px-24px-24px)] overflow-hidden overflow-y-auto ${
                    current !== null ? "pb-[120px]" : "pb-[24px]"
                  }`}
                >
                  <Slider ref={slider} {...settings}>
                    {received.map((item, i) => {
                      return (
                        <div className="outline-none" key={i}>
                          <div className="flex flex-col items-center justify-center">
                            {/* <img className="w-72 mt-6" src={disc} alt="disc" /> */}
                            <div className="mt-6 w-[90%]">
                              <div
                                className={`relative w-full pt-[100%] ${
                                  received[current]?.id === item.id
                                    ? "animate-spin-slow"
                                    : ""
                                } ${
                                  !playing && received[current]?.id === item.id
                                    ? "animate-pause"
                                    : ""
                                }`}
                              >
                                <img
                                  className="absolute inset-0 h-full w-full select-none object-contain"
                                  src={disc}
                                  alt="disc"
                                />
                                {item.played ? (
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
                                ) : (
                                  <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                                    <img
                                      className="h-[20%] w-[20%] select-none object-contain"
                                      src={shushingEmoji}
                                      alt="disc"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            {received[current]?.id === item.id && (
                              <span
                                style={{
                                  wordBreak: "break-word",
                                  whiteSpace: "pre-line",
                                }}
                                className="mt-6 w-full text-center text-xl leading-6 text-gray-700"
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
              <div
                className={`grid max-h-[calc(100vh-24px-104px-42px-24px-24px)] grid-cols-2 gap-4 overflow-y-auto pt-4 ${
                  current !== null ? "pb-[120px]" : ""
                }`}
              >
                {received.map((item, i) => (
                  <div
                    onClick={() => handleSelect(i)}
                    key={i}
                    className={`relative aspect-square w-[160px] cursor-pointer ${
                      received[current]?.id === item.id
                        ? "animate-spin-slow"
                        : ""
                    } ${
                      !playing && received[current]?.id === item.id
                        ? "animate-pause"
                        : ""
                    }`}
                  >
                    <img
                      className="absolute inset-0 h-full w-full select-none object-contain"
                      src={disc}
                      alt="disc"
                    />
                    {item.played ? (
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
                    ) : (
                      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                        <img
                          className="h-[20%] w-[20%] select-none object-contain"
                          src={shushingEmoji}
                          alt="disc"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {current !== null && (
              <div className="fixed left-0 right-0 bottom-0 z-20 flex w-full items-center justify-center py-6 px-5">
                <audio
                  ref={audioRef}
                  preload="metadata"
                  src={
                    playbackURL[received[current].content?.song?.videoId] &&
                    playbackURL[received[current].content?.song?.videoId][
                      "audio/mp4"
                    ]
                  }
                >
                  {/* <source
                    src={playbackURL[received[current].content?.song?.videoId]}
                  /> */}
                  Your browser does not support the <code>audio</code> element.
                </audio>
                {/* <Audio
                  src={`https://download.samplelib.com/mp3/sample-15s.mp3`}
                /> */}
                {!received[current].played ? (
                  <button
                    onClick={() => handlePlay(received[current]?.id)}
                    className="mr-4 flex h-16 w-[250px] items-center rounded-full bg-white p-3 pr-8 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                      {loadingStreamingData || loadingAudio ? (
                        <svg
                          className="h-4 w-4 animate-spin text-white"
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
                      ) : (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 11 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 4.76795C11.3333 5.53775 11.3333 7.46225 10 8.23205L3.25 12.1292C1.91666 12.899 0.249999 11.9367 0.249999 10.3971L0.25 2.60288C0.25 1.06328 1.91667 0.101034 3.25 0.870834L10 4.76795Z"
                            fill="#FFFFFF"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="gimmesong-primary-font ml-5 select-none text-xl">
                      Tap to play this song
                    </span>
                  </button>
                ) : (
                  <div
                    onClick={toggle}
                    className="mr-4 flex h-16 w-[250px] cursor-pointer items-center justify-between rounded-full bg-white p-3 pr-4"
                  >
                    <div className="flex items-center overflow-hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black">
                        {loadingStreamingData || loadingAudio ? (
                          <svg
                            className="h-4 w-4 animate-spin text-white"
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
                            className="h-4 w-4"
                            viewBox="0 0 11 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4.76795C11.3333 5.53775 11.3333 7.46225 10 8.23205L3.25 12.1292C1.91666 12.899 0.249999 11.9367 0.249999 10.3971L0.25 2.60288C0.25 1.06328 1.91667 0.101034 3.25 0.870834L10 4.76795Z"
                              fill="#FFFFFF"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="4" height="11" rx="2" fill="#FFFFFF" />
                            <rect
                              x="7"
                              width="4"
                              height="11"
                              rx="2"
                              fill="#FFFFFF"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="mx-2.5 flex min-w-0 max-w-[150px] flex-col">
                        <span className="select-none truncate text-sm">
                          {received[current].content?.song?.title}
                        </span>
                        <span className="select-none truncate text-xs text-gray-500">
                          {
                            received[current].content?.song?.artistInfo
                              ?.artist[0]?.text
                          }
                        </span>
                      </div>
                    </div>
                    <div className="select-none text-xs">
                      {/* {duration > 0
                        ? durationToStr(duration)
                        : received[current].content?.song?.length} */}
                    </div>
                  </div>
                )}
                <button
                  onClick={onOpen}
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
                      {received[current].content?.message}
                    </p>
                    <div
                      className={`pointer-events-none flex h-[192px] w-full items-center justify-between rounded-full bg-white bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] p-[36px] pr-[48px] text-white hover:bg-gray-100`}
                    >
                      <div className="flex items-center overflow-hidden">
                        <img
                          className="h-[120px] w-[120px] shrink-0 rounded-full object-contain"
                          src={
                            received[current].content?.song?.thumbnails[0]?.url
                          }
                          alt="thumbnail"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="mx-[30px] -mt-[16px] flex min-w-0 flex-col">
                          <span
                            className={`-mt-[25px] truncate text-[42px] font-light leading-[2]`}
                          >
                            {received[current].content?.song?.title}
                          </span>
                          <span
                            className={`-mt-[25px] truncate text-[36px] font-light leading-[2] text-white`}
                          >
                            {
                              received[current].content?.song?.artistInfo
                                ?.artist[0]?.text
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <AlertDialog
                  motionPreset="slideInBottom"
                  leastDestructiveRef={cancelRef}
                  onClose={onCloseModal}
                  isOpen={isOpen}
                  isCentered
                  size="md"
                >
                  <AlertDialogOverlay />

                  <AlertDialogContent borderRadius={25} marginX={4}>
                    <AlertDialogHeader>
                      {/* How to share a song to ig story */}
                      {/* Share image to ig story */}
                      Export Image
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      Get the widget and add to your instagram story manually{" "}
                      {/* <span className="whitespace-nowrap text-gray-500 underline">
                        Click to see guide!
                      </span> */}
                      {/* <div className="flex">
                        <div className={`mr-3 flex flex-col items-center`}>
                          <div
                            className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl shadow-md shadow-purple-200 hover:bg-purple-200 ${
                              exportMode === "widget"
                                ? "border-2 border-purple-500 bg-purple-200"
                                : ""
                            } bg-gray-100`}
                          >
                            <svg
                              className={`h-8 w-8 ${
                                exportMode === "widget"
                                  ? "text-purple-500"
                                  : "text-gray-800"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M20.4 14.5L16 10 4 20" />
                            </svg>
                          </div>
                          <span className="mt-1 text-sm font-semibold">
                            Widget
                          </span>
                        </div>
                      </div> */}
                      {/* <div className="flex flex-col justify-center">
                        <h2 className="mb-3 text-lg font-medium">
                          How to share a song to ig story
                        </h2>
                        <div
                          onClick={() => setStep(1)}
                          className={`my-1.5 mr-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 1
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          1
                        </div>
                        <div
                          onClick={() => setStep(2)}
                          className={`my-1.5 mr-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 2
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          2
                        </div>
                        <div
                          onClick={() => setStep(3)}
                          className={`my-1.5 mr-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 3
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          3
                        </div>
                        <div
                          onClick={() => setStep(4)}
                          className={`my-1.5 mr-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 4
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          4
                        </div>
                      </div> */}
                      {/* <div className="flex w-full justify-center">
                        <div
                          onClick={() => setStep(1)}
                          className={`mx-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 1
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          1
                        </div>
                        <div
                          onClick={() => setStep(2)}
                          className={`mx-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 2
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          2
                        </div>
                        <div
                          onClick={() => setStep(3)}
                          className={`mx-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 3
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          3
                        </div>
                        <div
                          onClick={() => setStep(4)}
                          className={`mx-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            activeStep === 4
                              ? "bg-black text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          4
                        </div>
                      </div>
                      {activeStep === 1 && (
                        <div className="mt-3 flex flex-col items-center">
                          <p className="text-xl">Click on [] button</p>
                        </div>
                      )}
                      {activeStep === 2 && (
                        <div className="mt-3 flex flex-col items-center"></div>
                      )}
                      {activeStep === 3 && (
                        <div className="mt-3 flex flex-col items-center"></div>
                      )}
                      {activeStep === 4 && (
                        <div className="mt-3 flex flex-col items-center"></div>
                      )} */}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button
                        borderRadius="25"
                        ref={cancelRef}
                        onClick={onCloseModal}
                        h={42}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => exportImage(received[current].id)}
                        borderRadius="25"
                        colorScheme="blackAlpha"
                        bgColor="black"
                        color="white"
                        h={42}
                        ml={3}
                      >
                        <svg
                          className="mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                        Export
                      </Button>
                      {/* {activeStep !== 4 ? (
                        <>
                          <Button
                            w="full"
                            borderRadius="25"
                            ref={cancelRef}
                            onClick={skip}
                            h={42}
                          >
                            Skip
                          </Button>
                          <Button
                            w="full"
                            onClick={nextStep}
                            borderRadius="25"
                            colorScheme="blackAlpha"
                            bgColor="black"
                            color="white"
                            ml={3}
                            h={42}
                          >
                            Next
                          </Button>
                        </>
                      ) : (
                        <Button
                          w="full"
                          onClick={() => exportImage(received[current].id)}
                          borderRadius="25"
                          colorScheme="blackAlpha"
                          bgColor="black"
                          color="white"
                          h={42}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                          </svg>
                          Export
                        </Button>
                      )} */}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </>
        ) : (
          <EmptySong
            message={`Oops, you don't have any new received songs at this
      time.`}
          />
        )}
      </div>
    </>
  );
}

export default NewReceived;
