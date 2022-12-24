import { useState, useContext, useEffect } from "react";

import toast from "react-hot-toast";

import { useCopyToClipboard } from "usehooks-ts";

import { useNavigate, useLocation } from "react-router-dom";

import { PlaylistContext } from "contexts/PlaylistContext";

import SelectPageLayout from "@components/SelectPageLayout";

import AddSongModal from "@features/RequestSongs/ViewPlaylist/AddSongModal";

import heartEmoji from "@assets/img/heart_emoji.png";
import headphoneEmoji from "@assets/img/headphone_emoji.png";
import disc from "@assets/img/disc.png";

function Top() {
  const navigate = useNavigate();

  const {
    state: { isLoadingInfo },
    data: { playlistInfo, pageLayout, stats },
    action: { fetchPlaylistInfo, setPageLayout },
  } = useContext(PlaylistContext);

  if (stats.views < 0) {
    // user probably enter url directly, so the data is not passed from the parent. maybe fetch the stats from api?
  }

  const [value, copy] = useCopyToClipboard();

  const copyToClipboard = (val) => {
    copy(val);
    toast("Copied!", {
      style: {
        borderRadius: "25px",
        background: "#000",
        color: "#fff",
      },
    });
  };

  return (
    <div className="gimmesong-bg sticky top-0 right-0 left-0 z-50 mx-auto flex w-full max-w-md items-center justify-between px-2.5 pt-1">
      <div className="my-2 flex w-full flex-col">
        <div className="flex flex-row items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full shadow-sm hover:bg-gray-100"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="35"
                height="35"
                rx="17.5"
                stroke="black"
              />
              <path
                d="M12.4697 17.4697C12.1768 17.7626 12.1768 18.2374 12.4697 18.5303L17.2426 23.3033C17.5355 23.5962 18.0104 23.5962 18.3033 23.3033C18.5962 23.0104 18.5962 22.5355 18.3033 22.2426L14.0607 18L18.3033 13.7574C18.5962 13.4645 18.5962 12.9896 18.3033 12.6967C18.0104 12.4038 17.5355 12.4038 17.2426 12.6967L12.4697 17.4697ZM24 17.25H13V18.75H24V17.25Z"
                fill="black"
              />
            </svg>
          </button>
          {isLoadingInfo || <AddSongModal />}
        </div>

        {isLoadingInfo || (
          <div className="mt-2 flex flex-col">
            <span className="bg-gradient-to-r from-[#8583D6] via-[#86C7DF] to-[#C697C8] bg-clip-text text-center text-xl font-semibold text-transparent">
              {playlistInfo.isAnonymous
                ? "Anonymous"
                : `@${playlistInfo.requester.username}`}
            </span>
            <span className="mt-1 max-w-full px-4 text-center font-semibold line-clamp-2">
              {playlistInfo.message}
            </span>

            <div className="mt-6 flex flex-row items-center justify-center">
              <div className="mr-2 flex min-w-[75px] flex-row items-center justify-center rounded-3xl bg-[#f6f6f6] px-5 py-2 shadow-lg">
                <img
                  className="mr-1 h-[17px] w-[17px]"
                  src={disc}
                  alt="songs"
                />
                <span>{stats.counter}</span>
              </div>

              <div className="mr-2 flex min-w-[75px] flex-row items-center justify-center rounded-3xl bg-[#f6f6f6] px-5 py-2 shadow-lg">
                <img
                  className="mr-1 h-[17px] w-[17px]"
                  src={headphoneEmoji}
                  alt="views"
                />
                <span>{stats.views}</span>
              </div>

              <div className="flex min-w-[75px] flex-row items-center justify-center rounded-3xl bg-white px-5 py-2 shadow-lg">
                <img
                  className="mr-1 h-[17px] w-[17px]"
                  src={heartEmoji}
                  alt="like"
                />
                <span>{stats.likes}</span>
              </div>
            </div>

            <div className="mx-3 mt-8 flex flex-row justify-between">
              <button
                className="group mr-1.5 flex h-[42px] shrink-0 items-center justify-center rounded-lg bg-white px-4 text-sm shadow-sm hover:bg-gray-100"
                onClick={() => {
                  copyToClipboard(
                    `https://gimmesong.link/playlist/${playlistInfo.shareLinkId}`
                  );
                }}
              >
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
                <span className="gimmesong-secondary-font ml-1 font-bold">
                  share playlist
                </span>
              </button>

              <SelectPageLayout
                setPageLayout={setPageLayout}
                pageLayout={pageLayout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Top;