import { useState, useRef, useEffect } from "react";
import disc from "@assets/img/disc.png";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EmptySong from "./EmptySong";

function NewSong({ playing, pause, onSwipe }) {
  const [received, setReceived] = useState([]);
  const [current, setCurrent] = useState(null);
  const slider = useRef(null);

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
    if (results.length > 0) setCurrent(0);
  }, []);

  useEffect(() => {
    if (current !== null) onSwipe(received[current]);
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
    </>
  );
}

export default NewSong;
