import { useState, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import useSession from "@hooks/useSession";

import { PlaylistContext } from "contexts/PlaylistContext";

import disc from "@assets/img/disc.webp";
import heartEmoji from "@assets/img/heart_emoji.png";
import headphoneEmoji from "@assets/img/headphone_emoji.png";

function PlaylistBubble({ data }) {
  const { user } = useSession();
  const navigate = useNavigate();

  const {
    action: { setViews, setCounter, setLikes },
  } = useContext(PlaylistContext);

  const {
    counter,
    shareLinkId,
    isAnonymous,
    views,
    message,
    recentlyAdded = [],
  } = data;
  // let createdAt = new Date(data.createdAt._seconds);

  let _recentlyAdded = [...recentlyAdded];

  const navigateToPlaylist = () => {
    setViews(views);
    setCounter(counter);
    //TODO: fetch number of likes from api
    setLikes(0);
    navigate(`/playlist/${shareLinkId}`);
  };

  return (
    <div
      onClick={navigateToPlaylist}
      className="mb-4 flex w-full cursor-pointer flex-col items-center justify-evenly overflow-hidden rounded-3xl bg-white p-4 shadow-md"
    >
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start">
          <span className="bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-center text-xs font-semibold text-transparent">
            {isAnonymous
              ? "Anonymous"
              : `@${data.requester.username ?? user?.username}`}
          </span>
          {/* <span className="text-xs text-black">{createdAt.toString()}</span> */}
        </div>
        {/* <span className="text-sm font-semibold text-black">icon</span> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h13M12 5l7 7-7 7" />
        </svg>
      </div>
      <h4 className="mt-2 w-full line-clamp-1">{message}</h4>
      <div className="mt-6 flex w-full justify-between">
        {_recentlyAdded.length > 0 ? (
          <div className="flex">
            {_recentlyAdded.reverse().map((item, index) => {
              return (
                <div
                  className={`-ml-5 first:ml-0`}
                  style={{ zIndex: Math.abs(index - _recentlyAdded.length) }}
                  key={item.itemId}
                >
                  <div className={`relative w-10 pt-[100%]`}>
                    <img
                      className="absolute inset-0 h-full w-full select-none object-contain"
                      src={disc}
                      alt="disc"
                    />
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                      <img
                        className="h-[27%] w-[27%] select-none rounded-full object-contain"
                        src={item.thumbnail.url}
                        alt="thumbnail"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div> // just for flex between
        )}
        <div className="flex items-center">
          <div className="mr-1 flex min-w-[60px] flex-row items-center justify-center rounded-3xl bg-black/[0.05] px-3 py-2">
            <img className="mr-1 h-[15px] w-[15px]" src={disc} alt="songs" />
            <span className="text-sm font-bold">{counter}</span>
          </div>

          <div className="mr-1 flex min-w-[60px] flex-row items-center justify-center rounded-3xl bg-black/[0.05] px-3 py-2">
            <img
              className="mr-1 h-[15px] w-[15px]"
              src={headphoneEmoji}
              alt="views"
            />
            <span className="text-sm font-bold">{views}</span>
          </div>

          <div className="flex min-w-[60px] flex-row items-center justify-center rounded-3xl border-2 border-black/[0.05] px-3 py-2">
            <img
              className="mr-1 h-[15px] w-[15px]"
              src={heartEmoji}
              alt="like"
            />
            {/* TODO: fetch number of likes from api */}
            <span className="text-sm font-bold">123</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistBubble;
