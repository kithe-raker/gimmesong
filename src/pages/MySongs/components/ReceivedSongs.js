import { useState, useEffect, useRef, useCallback } from "react";

import disc from "@assets/img/disc.png";
import logo from "@assets/img/gimmesong_logo.png";
import shushingEmoji from "@assets/img/shushing_emoji.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EmptySong from "./EmptySong";
import AudioPlayer from "@components/AudioPlayer";

import { useSteps } from "@hooks/useSteps";

// import { durationToStr } from "@utils/audio";
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
import { ThreeDots } from "react-loader-spinner";

function ReceivedSongs({ tab, layout, onLayoutChange }) {
  const { activeStep, setStep, skip, nextStep } = useSteps({
    totalSteps: 5,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const onCloseExportModal = () => {
    onClose();
    setStep(1);
  };

  const { isOpen: isSessionExpired, onOpen: onSessionExpired } =
    useDisclosure();
  const sessionExpiredCancelRef = useRef();
  const reloadPage = () => {
    window.location.reload();
  };

  // const [exportMode, setExportMode] = useState("widget");
  const exportRef = useRef();
  const [exporting, setExporting] = useState(false);
  const [exportedURL, setExportedURL] = useState(null);

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const [received, setReceived] = useState([]);

  const slider = useRef(null);
  const [current, setCurrent] = useState(null);

  const [loadingStreamingData, setLoadingStreamingData] = useState(false);
  const [streamingError, setStreamingError] = useState(null);

  const [updatingInbox, setUpdatingInbox] = useState(false);
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

  const platform = window.navigator.platform;

  const isIOSDevice =
    platform.indexOf("iPhone") === 0 || platform.indexOf("iPad") === 0;
  const isAndroid = platform.indexOf("Android") === 0;

  const openInstagram = () => {
    const deeplink = "instagram://story-camera";
    window.location = deeplink;
  };

  const exportImage = (inboxId) => {
    if (!exportRef.current || !inboxId) return;
    if (exporting) return;

    setExportedURL(null);
    onOpen();
    htmlToPng(exportRef.current, inboxId);
  };

  const htmlToPng = useCallback(async (element, inboxId) => {
    if (!element) return;

    try {
      setExporting(true);

      const width = element.clientWidth;
      const height = element.clientHeight;

      const canvas = await html2canvas(element, {
        height,
        width,
        backgroundColor: null,
        useCORS: true,
      });

      // document.body.appendChild(canvas);

      // let a = document.createElement("a");
      // a.download = `inbox-${exportMode}-${inboxId}.png`;

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        // a.href = url;
        // a.click();
        setExportedURL(url);
      });
    } catch (err) {
      toast("Export failed", {
        style: {
          borderRadius: "25px",
          background: "#FF6464",
          color: "#fff",
        },
      });
      console.error(err);
    } finally {
      setExporting(false);
    }
  }, []);

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

  const handleUpdateInbox = async (id) => {
    try {
      setUpdatingInbox(true);
      // update played = true to database
      await GimmesongAPI.playedInbox(id);
      // set played = true to local variable
      let updated = received.map((item) =>
        item.id === id
          ? {
              ...item,
              played: true,
            }
          : item
      );
      setUpdatingInbox(false);
      setReceived(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    if (!received[current].played) await handleUpdateInbox(id);

    try {
      // toggle audio player
      await audioRef.current.toggle();
    } catch (err) {
      let msg = "";
      if (err instanceof PlayerError) {
        if (err.message.includes("denied permission")) {
          msg = ""; // show nothing
        } else if (err.code === "NO_AUDIO_SOURCE") {
          msg = ""; // show nothing
        } else {
          msg = "PlayerError: " + err.message;
        }
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
    }
  };

  // const playNextTrack = () => {
  //   let nextTrackIndex = current != 0 ? current - 1 : 0;

  //   setCurrent(nextTrackIndex);
  //   if (layout === "single") sliderGoTo(nextTrackIndex);
  // };

  const handleSwipe = async () => {
    // always reset streaming error that occurred from previous song
    setStreamingError(null);
    try {
      // get videoplayback url here
      const videoId = received[current]?.content?.song?.videoId;
      await getPlaybackURL(videoId);
    } catch (err) {
      let msg = "";
      if (err instanceof StreamingError) {
        setStreamingError({
          id: received[current]?.id,
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
    }
  };

  const sliderGoTo = (index) => {
    // disable animate = true
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
        // by default in multiple layout current is null until user click select song
        if (current === null) setCurrent(0);

        // use setTimeout to prevent element ref is null
        setTimeout(() => sliderGoTo(current), 100);
      }
    }
  }, [layout]);

  const fetchInbox = async () => {
    try {
      setLoading(true);
      setError(false);

      let filterType = tab;
      let results = await GimmesongAPI.queryInbox({ filter: filterType });

      setReceived(results);
      if (tab === "new") {
        if (results.length > 0) setCurrent(0);
      }
    } catch (err) {
      setError(true);
      console.error(err);
      if (err.response.status === 403) onSessionExpired();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tab) return;

    setStreamingError(null);
    setCurrent(null);

    fetchInbox();
  }, [tab]);

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
                  className={`overflow-hidden ${
                    current !== null ? "pb-[88px]" : "pb-[24px]"
                  }`}
                >
                  <Slider ref={slider} {...settings}>
                    {received.map((item, i) => {
                      return (
                        <div className="outline-none" key={i}>
                          <div className="flex flex-col items-center justify-center">
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
                className={`grid grid-cols-2 gap-4 overflow-x-hidden pt-4 ${
                  current !== null ? "pb-[88px]" : "pb-[24px]"
                }`}
              >
                {received.map((item, i) => (
                  <div
                    onClick={() => handleSelect(i)}
                    key={i}
                    className={`relative w-[160px] cursor-pointer pt-[100%] ${
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
                {streamingError?.id == received[current]?.id && (
                  <div
                    className="absolute -mt-[140px] inline-flex animate-bounce rounded-full shadow-sm"
                    role="group"
                  >
                    <a
                      href={`https://music.youtube.com/watch?v=${received[current].content?.song?.videoId}`}
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
                <AudioPlayer
                  ref={audioRef}
                  src={
                    playbackURL[received[current]?.content?.song?.videoId] &&
                    playbackURL[received[current]?.content?.song?.videoId][
                      "audio/mp4"
                    ]
                  }
                  onToggle={setPlaying}
                  onLoading={setLoadingAudio}
                  autoPlayAfterSrcChange={false}
                  loadingSource={loadingStreamingData}
                />
                {!received[current]?.played ? (
                  <button
                    onClick={() => handleToggle(received[current]?.id)}
                    className="mr-4 flex h-16 w-[250px] items-center rounded-full bg-white p-3 pr-8 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                      {loadingStreamingData || loadingAudio || updatingInbox ? (
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
                    onClick={() => handleToggle(received[current]?.id)}
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
                      <div className="mx-2.5 flex min-w-0 flex-col">
                        <span className="select-none truncate text-sm">
                          {received[current]?.content?.song?.title}
                        </span>
                        <span className="select-none truncate text-xs text-gray-500">
                          {
                            received[current]?.content?.song?.artistInfo
                              ?.artist[0]?.text
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={exportImage}
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
                      {received[current]?.content?.message}
                    </p>
                    <div
                      className={`pointer-events-none flex h-[192px] w-full items-center justify-between rounded-full bg-white bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] p-[36px] pr-[48px] text-white hover:bg-gray-100`}
                    >
                      <div className="flex items-center overflow-hidden">
                        <img
                          className="h-[120px] w-[120px] shrink-0 rounded-full object-contain"
                          src={
                            received[current]?.content?.song?.thumbnails[0]?.url
                          }
                          alt="thumbnail"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="mx-[30px] -mt-[16px] flex min-w-0 flex-col">
                          <span
                            className={`-mt-[25px] truncate text-[42px] font-light leading-[2]`}
                          >
                            {received[current]?.content?.song?.title}
                          </span>
                          <span
                            className={`-mt-[25px] truncate text-[36px] font-light leading-[2] text-white`}
                          >
                            {
                              received[current]?.content?.song?.artistInfo
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
                  onClose={onCloseExportModal}
                  isOpen={isOpen}
                  isCentered
                  size="md"
                  scrollBehavior="outside"
                >
                  <AlertDialogOverlay />

                  <AlertDialogContent borderRadius={25} marginX={4}>
                    <AlertDialogHeader>
                      How to share to your story
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody
                      display={`flex`}
                      flexDirection={`column`}
                      justifyContent={`center`}
                      alignItems={`center`}
                    >
                      {activeStep === 1 && (
                        <div className="mt-3 flex flex-col items-center">
                          <video
                            muted
                            playsInline
                            preload="auto"
                            src={`story-step1.mp4`}
                            autoPlay
                            loop
                          />
                          <div className="mt-2 flex items-center">
                            <div
                              className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                            >
                              1
                            </div>
                            <p className="text-md">
                              Long press on the image and <b>Save Image</b> to
                              your Gallery.
                            </p>
                          </div>
                        </div>
                      )}
                      {activeStep === 2 && (
                        <div className="mt-3 flex flex-col items-center">
                          <img src={`story-step2.png`} alt="step2" />
                          <div className="mt-2 flex items-center">
                            <div
                              className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                            >
                              2
                            </div>
                            <p className="text-md">
                              In your story, <b>Click</b> on
                              <svg
                                className="mx-2 inline"
                                width="20"
                                height="20"
                                viewBox="0 0 384 384"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M362.667 181.333V96C362.667 54.7627 329.237 21.3333 288 21.3333H96C54.7627 21.3333 21.3333 54.7627 21.3333 96V288C21.3333 329.237 54.7627 362.667 96 362.667H202.667C220.339 362.667 234.667 348.339 234.667 330.667V288C234.667 246.763 268.096 213.333 309.333 213.333H330.667C348.339 213.333 362.667 199.006 362.667 181.333ZM361.101 225.137C352.471 231.145 341.98 234.667 330.667 234.667H309.333C279.878 234.667 256 258.545 256 288V330.667C256 339.676 253.766 348.162 249.822 355.605C308.245 337.611 352.399 287.061 361.101 225.137ZM96 0H288C341.02 0 384 42.9807 384 96V202.667C384 302.814 302.814 384 202.667 384H96C42.9807 384 0 341.02 0 288V96C0 42.9807 42.9807 0 96 0Z"
                                  fill="black"
                                />
                                <circle cx="121" cy="140" r="25" fill="black" />
                                <circle cx="263" cy="140" r="25" fill="black" />
                                <path
                                  d="M105.5 243.194C127.524 274.048 194.198 317.961 264.209 243.194"
                                  stroke="black"
                                  strokeWidth="20"
                                  strokeLinecap="round"
                                />
                              </svg>
                              button.
                            </p>
                          </div>
                        </div>
                      )}
                      {activeStep === 3 && (
                        <div className="mt-3 flex flex-col items-center">
                          <img
                            src={`${
                              isAndroid
                                ? "story-step3-android.png"
                                : "story-step3.png"
                            }`}
                            alt="step3"
                          />
                          <div className="mt-2 flex items-center">
                            <div
                              className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                            >
                              3
                            </div>
                            <p className="text-md">
                              <b>Click</b> on
                              <svg
                                className="mx-2 inline"
                                width="20"
                                height="20"
                                viewBox="0 0 364 366"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M25 239L114.593 179.761L194.459 239L273.301 115L346 216.409"
                                  stroke="black"
                                  strokeWidth="20"
                                  strokeLinecap="round"
                                />
                                <rect
                                  x="12.5"
                                  y="12.5"
                                  width="339"
                                  height="341"
                                  rx="74.5"
                                  stroke="black"
                                  strokeWidth="25"
                                />
                                <circle cx="108" cy="92" r="25" fill="black" />
                              </svg>
                              widget <br />
                              and select image that you saved before.
                            </p>
                          </div>
                        </div>
                      )}
                      {activeStep === 4 && (
                        <div className="mt-3 flex flex-col items-center">
                          <video
                            muted
                            playsInline
                            preload="auto"
                            src={`story-step4.mp4`}
                            autoPlay
                            loop
                          />
                          <div className="mt-2 flex items-center">
                            <div
                              className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                            >
                              4
                            </div>
                            <p className="text-md">
                              Customize your story and share it to your friends.
                            </p>
                          </div>
                        </div>
                      )}
                      {activeStep === 5 && (
                        <div className="mt-3 flex flex-col items-center">
                          {exportedURL ? (
                            <img
                              className="w-full"
                              src={exportedURL}
                              alt={`inbox-widget`}
                            />
                          ) : (
                            <ThreeDots
                              height="60"
                              width="60"
                              radius="9"
                              color="#8583D6"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClassName=""
                              visible={true}
                            />
                          )}
                          <div className="flex items-center">
                            <p className="text-md text-center">
                              Long press on the above image and{" "}
                              <b>Save Image</b> to your Gallery.
                            </p>
                          </div>
                        </div>
                      )}
                    </AlertDialogBody>
                    <AlertDialogFooter
                      display={`flex`}
                      justifyContent={`center`}
                    >
                      {activeStep !== 5 ? (
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
                            bgColor="black"
                            color="white"
                            ml={3}
                            h={42}
                            _hover={{ bg: "#000000" }}
                            _active={{
                              bg: "#000000",
                            }}
                          >
                            Next
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => openInstagram()}
                          borderRadius="25"
                          bgColor="black"
                          color="white"
                          h={42}
                          _hover={{ bg: "#000000" }}
                          _active={{
                            bg: "#000000",
                          }}
                        >
                          <svg
                            className="mr-2 h-4 w-4 text-white"
                            viewBox="0 0 180 180"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_271_136)">
                              <path
                                d="M9.84094 61.991C12.5251 63.1216 15.6175 61.8627 16.7481 59.1785C19.3113 53.0944 22.6603 47.3119 26.7022 41.9913C28.4639 39.6724 28.0121 36.3642 25.6932 34.6022C23.3743 32.8405 20.0658 33.2923 18.3037 35.6112C13.7278 41.6345 9.93445 48.1866 7.02844 55.0842C5.89781 57.7677 7.15676 60.8604 9.84094 61.991Z"
                                fill="currentColor"
                              />
                              <path
                                d="M34.6022 25.6929C36.3639 28.0118 39.6721 28.4636 41.9913 26.7019C47.3115 22.6603 53.094 19.3113 59.1785 16.7481C61.8623 15.6175 63.1216 12.5251 61.991 9.84094C60.8604 7.15711 57.768 5.89781 55.0842 7.02844H55.0839C48.1859 9.93445 41.6341 13.7278 35.6112 18.3034C33.2926 20.0654 32.8405 23.3736 34.6022 25.6929Z"
                                fill="currentColor"
                              />
                              <path
                                d="M6.60867 105.823C9.49887 105.463 11.5495 102.828 11.1888 99.938C10.7568 96.4768 10.5469 93.2263 10.5469 90C10.5469 86.7734 10.7568 83.5228 11.1888 80.062C11.5495 77.1722 9.49922 74.5369 6.60902 74.1762C3.71883 73.8155 1.08352 75.8658 0.722812 78.756C0.243281 82.6003 0 86.3831 0 90C0 93.6165 0.243281 97.3993 0.722812 101.244C1.08352 104.134 3.71848 106.184 6.60867 105.823Z"
                                fill="currentColor"
                              />
                              <path
                                d="M103.248 168.332C98.8158 169.076 94.3583 169.453 90 169.453C85.737 169.453 81.4039 169.073 76.7531 168.292C73.8809 167.809 71.1612 169.746 70.6785 172.618C70.1958 175.49 72.1325 178.21 75.0048 178.693C80.2396 179.572 85.1446 180 90 180C94.9416 180 99.9861 179.574 104.994 178.733C107.866 178.251 109.804 175.532 109.322 172.66C108.84 169.787 106.121 167.85 103.248 168.332Z"
                                fill="currentColor"
                              />
                              <path
                                d="M153.64 26.3602C136.641 9.36176 114.04 0 90 0C86.3831 0 82.6003 0.243281 78.7563 0.723164C75.8661 1.08387 73.8158 3.71883 74.1765 6.60902C74.5372 9.49887 77.1722 11.5499 80.0624 11.1892C83.5225 10.7568 86.7734 10.5469 90 10.5469C133.811 10.5469 169.453 46.1893 169.453 90C169.453 99.5186 167.78 108.841 164.479 117.708C161.373 126.053 156.914 133.767 151.226 140.636C149.369 142.879 149.682 146.203 151.925 148.061C154.168 149.919 157.492 149.606 159.35 147.363C165.793 139.582 170.844 130.842 174.363 121.387C178.103 111.339 180 100.779 180 90C180 65.9602 170.638 43.3593 153.64 26.3602Z"
                                fill="currentColor"
                              />
                              <path
                                d="M148.061 151.924C146.204 149.681 142.88 149.368 140.636 151.226C133.767 156.914 126.053 161.373 117.709 164.479C114.979 165.495 113.59 168.531 114.606 171.261C115.622 173.99 118.658 175.379 121.388 174.363C130.843 170.844 139.582 165.793 147.363 159.349C149.606 157.492 149.919 154.168 148.061 151.924Z"
                                fill="currentColor"
                              />
                              <path
                                d="M62.3109 164.446C54.0422 161.367 46.337 156.894 39.4102 151.152C37.1679 149.293 33.8439 149.604 31.9852 151.846L31.9848 151.847C30.1261 154.089 30.4369 157.413 32.6791 159.272C40.5193 165.771 49.2507 170.838 58.6308 174.33C61.3603 175.347 64.3968 173.958 65.4131 171.229C66.4295 168.499 65.0405 165.463 62.3109 164.446Z"
                                fill="currentColor"
                              />
                              <path
                                d="M15.6115 117.658C14.5965 114.928 11.5608 113.538 8.8309 114.553C6.10102 115.568 4.71094 118.604 5.7259 121.334C9.25348 130.82 14.298 139.564 20.7193 147.322C22.5763 149.566 25.9003 149.879 28.144 148.022L28.1443 148.022C30.388 146.165 30.7012 142.84 28.8439 140.597C23.1782 133.752 18.726 126.034 15.6115 117.658Z"
                                fill="currentColor"
                              />
                              <path
                                d="M84.5508 64.8633C84.5508 61.8538 86.9905 59.4141 90 59.4141C93.0095 59.4141 95.4492 61.8538 95.4492 64.8633V115.137C95.4492 118.146 93.0095 120.586 90 120.586C86.9905 120.586 84.5508 118.146 84.5508 115.137V64.8633Z"
                                fill="currentColor"
                              />
                              <path
                                d="M64.8633 95.4492C61.8538 95.4492 59.4141 93.0095 59.4141 90C59.4141 86.9905 61.8538 84.5508 64.8633 84.5508L115.137 84.5508C118.146 84.5508 120.586 86.9905 120.586 90C120.586 93.0095 118.146 95.4492 115.137 95.4492L64.8633 95.4492Z"
                                fill="currentColor"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_271_136">
                                <rect width="180" height="180" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Share on Instagram!
                        </Button>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </>
        ) : (
          <EmptySong
            message={
              tab === "all"
                ? `Oops, it seems like no one sent you songs.`
                : `Oops, you don't have any new received songs at this
          time.`
            }
          />
        )}
      </div>
      <AlertDialog
        isOpen={isSessionExpired}
        leastDestructiveRef={sessionExpiredCancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius={25} marginX={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sorry, Something went wrong
            </AlertDialogHeader>

            <AlertDialogBody>
              Your session maybe expired, please try to re-loading this page
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                borderRadius="25"
                bgColor="black"
                color="white"
                h={42}
                _hover={{ bg: "#000000" }}
                _active={{
                  bg: "#000000",
                }}
                onClick={reloadPage}
              >
                Reload
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ReceivedSongs;
