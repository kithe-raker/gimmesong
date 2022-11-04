import { useState, useRef, useEffect } from "react";
import disc from "@assets/img/disc.png";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EmptySong from "./EmptySong";

import useAudioPlayer from "@hooks/useAudioPlayer";

import { durationToStr } from "@utils/audio";
import GimmesongAPI from "@lib/gimmesong_api";

function NewReceived({ layout, onLayoutChange }) {
  const { audioRef, duration, curTime, playing, setPlaying, reloadAudioSrc } =
    useAudioPlayer();

  const [received, setReceived] = useState([]);

  const slider = useRef(null);
  const [current, setCurrent] = useState(null);

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
      // implement fetch playback url here, then set to playbackURL object
      // to reuse in next time
      setPlaybackURL((prev) => {
        return {
          ...prev,
          [videoId]: "https://download.samplelib.com/mp3/sample-15s.mp3",
        };
      });
    }
  };

  const handlePlay = async (id) => {
    // get videoplayback url here
    const videoId = received[current].content?.song?.videoId;
    await getPlaybackURL(videoId);

    // then update played = true to database
    try {
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

      // reload audio source when current.src is changed
      reloadAudioSrc();
      setPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAudio = async () => {
    // when toggle to play played audio, we need to get playback url again to prevent error
    // from play/pause empty source url

    const videoId = received[current].content?.song?.videoId;
    await getPlaybackURL(videoId);

    // after current.src is changed, need to reload src before use audio.play()
    // and to prevent reload src on pausing we determine from current audio time not equal zero
    if (curTime === 0) reloadAudioSrc();
    setPlaying((prev) => !prev);
  };

  const handleSwipe = () => {
    setPlaying(false);
    reloadAudioSrc();
  };

  const goTo = (index) => {
    // disable animate true
    slider.current.slickGoTo(index, true);
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
      if (received.length > 0 && slider.current) {
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

  // useEffect(() => {
  //   let results = [
  //     {
  //       id: 1,
  //       receiver: "friend",
  //       song: {
  //         videoId: "79ucr8WTBIY",
  //         title: "โต๊ะริม (Melt)",
  //         thumbnails: [
  //           {
  //             url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w60-h60-l90-rj",
  //             width: 60,
  //             height: 60,
  //           },
  //         ],
  //         length: "4:08",
  //         artistInfo: {
  //           artist: [
  //             {
  //               text: "NONT TANONT",
  //               browseId: "UC0qrQfKKZnoP03_8s-2n8-g",
  //               pageType: "MUSIC_PAGE_TYPE_ARTIST",
  //             },
  //           ],
  //         },
  //       },
  //       message: "halo fren 1",
  //       played: false,
  //     },
  //     {
  //       id: 2,
  //       receiver: "friend",
  //       song: {
  //         videoId: "6-IotY7xluM",
  //         title: "Zen Bang Bang",
  //         thumbnails: [
  //           {
  //             url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w60-h60-l90-rj",
  //             width: 60,
  //             height: 60,
  //           },
  //         ],
  //         length: "4:32",
  //         artistInfo: {
  //           artist: [
  //             {
  //               text: "Indigo",
  //               browseId: "UCcWRWFBsm49ty0NvgaBFQ0w",
  //               pageType: "MUSIC_PAGE_TYPE_ARTIST",
  //             },
  //           ],
  //         },
  //       },
  //       message: "halo fren 2",
  //       played: false,
  //     },
  //   ];

  //   // due to default layout of new received page is single
  //   // then if results not empty, set current index to first element in arrays
  //   // to show music player automatically
  //   if (results.length > 0) {
  //     setReceived(results);
  //     setCurrent(0);
  //   }

  //   setTimeout(() => setLoading(false), 500);
  // }, []);

  return (
    <>
      <div className={`relative mt-6 ${layout === "single" ? "w-full" : ""}`}>
        {loading ? (
          <div className="my-12 flex items-center justify-center">Loading</div>
        ) : received.length > 0 ? (
          <>
            {layout === "single" ? (
              <>
                <div
                  className={`max-h-[calc(100vh-24px-104px-42px-24px-24px)] overflow-hidden overflow-y-auto ${
                    current !== null ? "pb-[120px]" : ""
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
                                        alt="disc"
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
                              <span className="gimmesong-secondary-font mt-6 text-center text-lg leading-6 text-gray-700">
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
                  current !== null ? "pb-[88px]" : ""
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
                            alt="disc"
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
                <audio ref={audioRef}>
                  <source
                    src={playbackURL[received[current].content?.song?.videoId]}
                  />
                  Your browser does not support the <code>audio</code> element.
                </audio>
                {/* <Audio
                  src={`https://download.samplelib.com/mp3/sample-15s.mp3`}
                /> */}
                {!received[current].played ? (
                  <button
                    onClick={() => handlePlay(received[current]?.id)}
                    className="mr-4 flex h-16 w-[250px] items-center rounded-full bg-white p-3 pr-8 shadow-sm hover:bg-gray-100"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
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
                    </div>
                    <span className="gimmesong-primary-font ml-5 select-none text-xl">
                      Tap to play this song
                    </span>
                  </button>
                ) : (
                  <div
                    onClick={() => toggleAudio()}
                    className="mr-4 flex h-16 w-[250px] cursor-pointer items-center justify-between rounded-full bg-white p-3 pr-4 hover:bg-gray-100"
                  >
                    <div className="flex items-center overflow-hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black">
                        {!playing ? (
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
                      {duration > 0
                        ? durationToStr(duration)
                        : received[current].content?.song?.length}
                    </div>
                  </div>
                )}
                <button className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100">
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
