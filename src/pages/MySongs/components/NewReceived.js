import { useState, useRef, useEffect } from "react";
import disc from "@assets/img/disc.png";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EmptySong from "./EmptySong";

function NewReceived({ layout, onLayoutChange }) {
  const [received, setReceived] = useState([]);

  const slider = useRef(null);
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSwipe = () => {
    setPlaying(false);
  };

  const handleSelect = (index) => {
    setCurrent(index);
    onLayoutChange("single");
  };

  const handlePlay = (id) => {
    // get videoplayback url here, then set url to item in received
    // to reuse in next time
    // then update played = true to database

    let url = "";
    let updated = received.map((item) =>
      item.id === id ? { ...item, url: "", played: true } : item
    );
    setReceived(updated);
    setPlaying(true);
  };

  const toggleAudio = () => {
    setPlaying((prev) => !prev);
  };

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

  const goTo = (index) => {
    // disable animate true
    slider.current.slickGoTo(index, true);
  };

  useEffect(() => {
    if (layout === "single") {
      if (received.length > 0) {
        setTimeout(() => goTo(current), 100);
      }
    }
  }, [layout]);

  useEffect(() => {
    let results = [
      {
        id: 1,
        receiver: "@friend",
        song: {
          videoId: "79ucr8WTBIY",
          title: "โต๊ะริม (Melt)",
          thumbnails: [
            {
              url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w60-h60-l90-rj",
              width: 60,
              height: 60,
            },
            {
              url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w120-h120-l90-rj",
              width: 120,
              height: 120,
            },
            {
              url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w180-h180-l90-rj",
              width: 180,
              height: 180,
            },
            {
              url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w226-h226-l90-rj",
              width: 226,
              height: 226,
            },
            {
              url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w302-h302-l90-rj",
              width: 302,
              height: 302,
            },
            {
              url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w544-h544-l90-rj",
              width: 544,
              height: 544,
            },
          ],
          length: "4:08",
          artistInfo: {
            artist: [
              {
                text: "NONT TANONT",
                browseId: "UC0qrQfKKZnoP03_8s-2n8-g",
                pageType: "MUSIC_PAGE_TYPE_ARTIST",
              },
            ],
          },
        },
        message: "halo fren 1",
        played: false,
      },
      {
        id: 2,
        receiver: "@friend",
        song: {
          videoId: "6-IotY7xluM",
          title: "Zen Bang Bang",
          thumbnails: [
            {
              url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w60-h60-l90-rj",
              width: 60,
              height: 60,
            },
            {
              url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w120-h120-l90-rj",
              width: 120,
              height: 120,
            },
            {
              url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w180-h180-l90-rj",
              width: 180,
              height: 180,
            },
            {
              url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w226-h226-l90-rj",
              width: 226,
              height: 226,
            },
            {
              url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w302-h302-l90-rj",
              width: 302,
              height: 302,
            },
            {
              url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w544-h544-l90-rj",
              width: 544,
              height: 544,
            },
          ],
          length: "4:32",
          artistInfo: {
            artist: [
              {
                text: "Indigo",
                browseId: "UCcWRWFBsm49ty0NvgaBFQ0w",
                pageType: "MUSIC_PAGE_TYPE_ARTIST",
              },
            ],
          },
        },
        message: "halo fren 2",
        played: false,
      },
    ];

    if (results.length > 0) {
      setReceived(results);
      setCurrent(0);
    }

    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    handleSwipe();
  }, [current]);

  return (
    // <>
    //   <div className="relative mt-6 w-full">
    //     {loading ? (
    //       <div className="my-12 flex items-center justify-center">Loading</div>
    //     ) : received.length > 0 ? (
    //       <div className="overflow-hidden">
    //         <Slider ref={slider} {...settings}>
    //           {received.map((item, i) => {
    //             return (
    //               <div className="outline-none" key={i}>
    //                 <div className="flex flex-col items-center justify-center">
    //                   {/* <img className="w-72 mt-6" src={disc} alt="disc" /> */}
    //                   <div className="mt-6 w-[90%]">
    //                     <div
    //                       className={`relative w-full pt-[100%] ${
    //                         received[current].id === item.id
    //                           ? "animate-spin-slow"
    //                           : ""
    //                       } ${
    //                         !playing && received[current].id === item.id
    //                           ? "animate-pause"
    //                           : ""
    //                       }`}
    //                     >
    //                       <img
    //                         className="absolute inset-0 h-full w-full select-none object-contain"
    //                         src={disc}
    //                         alt="disc"
    //                       />
    //                       {item.played ? (
    //                         <div className="absolute inset-0 flex h-full w-full items-center justify-center">
    //                           {item.song?.thumbnails?.length > 0 && (
    //                             <img
    //                               className="h-[27%] w-[27%] select-none rounded-full object-contain"
    //                               src={item.song?.thumbnails[0]?.url}
    //                               alt="disc"
    //                             />
    //                           )}
    //                         </div>
    //                       ) : (
    //                         <div className="absolute inset-0 flex h-full w-full items-center justify-center">
    //                           <img
    //                             className="h-[20%] w-[20%] select-none object-contain"
    //                             src={shushingEmoji}
    //                             alt="disc"
    //                           />
    //                         </div>
    //                       )}
    //                     </div>
    //                   </div>
    //                   {received[current].id === item.id && (
    //                     <span className="gimmesong-secondary-font mt-6 text-center text-lg leading-6 text-gray-700">
    //                       {item.message}
    //                     </span>
    //                   )}
    //                 </div>
    //               </div>
    //             );
    //           })}
    //         </Slider>
    //       </div>
    //     ) : (
    //       <EmptySong
    //         message={`Oops, you don't have any new received songs at this
    //     time.`}
    //       />
    //     )}
    //   </div>
    //   {!loading && current !== null && (
    //     <div className="fixed bottom-0 flex w-full items-center justify-center py-6 px-5">
    //       {!received[current].played ? (
    //         <button
    //           onClick={() => handlePlay(received[current].id)}
    //           className="mr-4 flex h-16 w-[250px] items-center rounded-full bg-white p-3 pr-8 shadow-sm hover:bg-gray-100"
    //         >
    //           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
    //             <svg
    //               className="h-4 w-4"
    //               viewBox="0 0 11 13"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 d="M10 4.76795C11.3333 5.53775 11.3333 7.46225 10 8.23205L3.25 12.1292C1.91666 12.899 0.249999 11.9367 0.249999 10.3971L0.25 2.60288C0.25 1.06328 1.91667 0.101034 3.25 0.870834L10 4.76795Z"
    //                 fill="#FFFFFF"
    //               />
    //             </svg>
    //           </div>
    //           <span className="gimmesong-primary-font ml-5 select-none text-xl">
    //             Tap to play this song
    //           </span>
    //         </button>
    //       ) : (
    //         <div
    //           onClick={() => toggleAudio()}
    //           className="mr-4 flex h-16 w-[250px] cursor-pointer items-center justify-between rounded-full bg-white p-3 pr-4 hover:bg-gray-100"
    //         >
    //           <div className="flex items-center overflow-hidden">
    //             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
    //               {!playing ? (
    //                 <svg
    //                   className="h-4 w-4"
    //                   viewBox="0 0 11 13"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     d="M10 4.76795C11.3333 5.53775 11.3333 7.46225 10 8.23205L3.25 12.1292C1.91666 12.899 0.249999 11.9367 0.249999 10.3971L0.25 2.60288C0.25 1.06328 1.91667 0.101034 3.25 0.870834L10 4.76795Z"
    //                     fill="#FFFFFF"
    //                   />
    //                 </svg>
    //               ) : (
    //                 <svg
    //                   className="h-3 w-3"
    //                   viewBox="0 0 11 11"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <rect width="4" height="11" rx="2" fill="#FFFFFF" />
    //                   <rect x="7" width="4" height="11" rx="2" fill="#FFFFFF" />
    //                 </svg>
    //               )}
    //             </div>
    //             <div className="mx-2.5 flex min-w-0 max-w-[150px] flex-col">
    //               <span className="select-none truncate text-sm">
    //                 {received[current].song?.title}
    //               </span>
    //               <span className="select-none truncate text-xs text-gray-500">
    //                 {received[current].song?.artistInfo?.artist[0]?.text}
    //               </span>
    //             </div>
    //           </div>
    //           <div className="select-none text-xs">
    //             {received[current].song?.length}
    //           </div>
    //         </div>
    //       )}
    //       <button className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="24"
    //           height="24"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="#000000"
    //           strokeWidth="2"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         >
    //           <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
    //         </svg>
    //       </button>
    //     </div>
    //   )}
    // </>
    <>
      <div className={`relative mt-6 ${layout === "single" ? "w-full" : ""}`}>
        {loading ? (
          <div className="my-12 flex items-center justify-center">Loading</div>
        ) : received.length > 0 ? (
          <>
            {layout === "single" ? (
              <>
                <div className="max-h-[calc(100vh-24px-104px-42px-24px-24px)] overflow-hidden overflow-y-auto pb-[88px]">
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
                                    {item.song?.thumbnails?.length > 0 && (
                                      <img
                                        className="h-[27%] w-[27%] select-none rounded-full object-contain"
                                        src={item.song?.thumbnails[0]?.url}
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
                                {item.message}
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
              <div className="grid max-h-[calc(100vh-24px-104px-42px-24px-24px)] grid-cols-2 gap-4 overflow-y-auto pt-4 pb-[88px]">
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
                        {item.song?.thumbnails?.length > 0 && (
                          <img
                            className="h-[27%] w-[27%] select-none rounded-full object-contain"
                            src={item.song?.thumbnails[0]?.url}
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
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
                          {received[current].song?.title}
                        </span>
                        <span className="select-none truncate text-xs text-gray-500">
                          {received[current].song?.artistInfo?.artist[0]?.text}
                        </span>
                      </div>
                    </div>
                    <div className="select-none text-xs">
                      {received[current].song?.length}
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
                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
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
