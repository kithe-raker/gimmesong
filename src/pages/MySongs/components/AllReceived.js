import { useState, useEffect } from "react";
import EmptySong from "./EmptySong";
import disc from "@assets/img/disc.png";
import shushingEmoji from "@assets/img/shushing_emoji.png";

function AllReceived({ onSwipe, onPlay }) {
  const [received, setReceived] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

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
        played: true,
      },
      {
        id: 3,
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
        played: true,
      },
    ];
    if (results.length > 0) {
      setReceived(results);
      setCurrent(0);
    }
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 w-full h-full bg-white z-10 flex justify-center items-center">
          Loading
        </div>
      )}
      {received.length > 0 ? (
        <div class="grid grid-cols-2 gap-4 mt-6">
          {received.map((item, i) => (
            <div
              key={i}
              className={`relative w-[160px] aspect-square pointer-events-none`}
            >
              <img
                className="absolute inset-0 w-full h-full object-contain select-none"
                src={disc}
                alt="disc"
              />
              {item.played ? (
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
          ))}
        </div>
      ) : (
        <EmptySong message={`Oops, it seems like no one sent you songs.`} />
      )}
    </>
  );
}

export default AllReceived;