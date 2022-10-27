import { useState, useRef, useEffect } from "react";
import disc from "@assets/img/disc.png";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EmptySong from "./EmptySong";

function NewSong() {
  const [received, setReceived] = useState([]);

  const slider = useRef(null);
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [pause, setPause] = useState(true);

  // const { newReceivedSongs, setAuth } = useReceivedSong();

  const handleSwipe = () => {
    setPlaying(null);
  };

  const handlePlay = (song) => {
    setPlaying(song);
    setPause(false);
  };

  const handlePause = () => {
    setPause((prev) => !prev);
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "70px",
    slidesToShow: 1,
    speed: 500,
    beforeChange: (current, next) => {
      setCurrent(received[next]);
    },
  };

  const goTo = (index) => {
    slider.current.slickGoTo(index);
  };

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
      },
    ];
    setReceived(results);
    if (results.length > 0) setCurrent(results[0]);
  }, []);

  useEffect(() => {
    handleSwipe();
  }, [current]);

  return (
    <>
      {received.length > 0 ? (
        <div className="relative w-full overflow-hidden">
          <Slider ref={slider} {...settings}>
            {received.map((item, i) => {
              return (
                <div className="outline-none" key={i}>
                  <div className="flex flex-col items-center justify-center">
                    {/* <img className="w-72 mt-6" src={disc} alt="disc" /> */}
                    <div className="mt-6 w-[90%]">
                      <div
                        className={`relative w-full pt-[100%] ${
                          playing && playing.id === item.id
                            ? "animate-spin-slow"
                            : ""
                        } ${pause ? "animate-pause" : ""}`}
                      >
                        <img
                          className="absolute inset-0 w-full h-full object-contain select-none"
                          src={disc}
                          alt="disc"
                        />
                        {playing && playing.id === item.id ? (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                            {item.song?.thumbnails?.length > 0 && (
                              <img
                                className="w-[27%] h-[27%] rounded-full object-contain select-none"
                                src={item.song?.thumbnails[0]?.url}
                                alt="disc"
                              />
                            )}
                          </div>
                        ) : (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                            <img
                              className="w-[20%] h-[20%] object-contain select-none"
                              src={shushingEmoji}
                              alt="disc"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    {current === i && (
                      <span className="gimmesong-secondary-font mt-6 text-lg text-center text-gray-700 leading-6">
                        {item.message}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <EmptySong />
      )}
      {current && (
        <div className="fixed bottom-0 flex justify-center items-center p-5 w-full max-w-md">
          {!playing ? (
            <button
              onClick={() => handlePlay(current)}
              className="flex h-16 w-[250px] mr-4 items-center bg-white hover:bg-gray-100 rounded-full p-3 pr-8 shadow-sm"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4"
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
              <span className="ml-5 gimmesong-primary-font text-xl select-none">
                Tap to play this song
              </span>
            </button>
          ) : (
            <div
              onClick={() => handlePause()}
              className="flex items-center justify-between w-[250px] h-16 mr-4 bg-white hover:bg-gray-100 rounded-full p-3 pr-4 cursor-pointer"
            >
              <div className="flex items-center overflow-hidden">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  {pause ? (
                    <svg
                      className="w-4 h-4"
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
                      className="w-3 h-3"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="4" height="11" rx="2" fill="#FFFFFF" />
                      <rect x="7" width="4" height="11" rx="2" fill="#FFFFFF" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col mx-2.5 min-w-0 max-w-[150px]">
                  <span className="text-sm truncate select-none">
                    {playing.song?.title}
                  </span>
                  <span className="text-xs text-gray-500 truncate select-none">
                    {playing.song?.artistInfo?.artist[0]?.text}
                  </span>
                </div>
              </div>
              <div className="text-xs select-none">{playing.song?.length}</div>
            </div>
          )}
          <button className="flex h-16 w-16 justify-center items-center bg-white hover:bg-gray-100 rounded-full shadow-sm shrink-0">
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
  );
}

export default NewSong;
