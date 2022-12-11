import { useState, useContext, useEffect } from "react";

import toast from "react-hot-toast";

import { useCopyToClipboard } from "usehooks-ts";

import { useNavigate, useLocation } from "react-router-dom";

import { PlaylistContext } from "contexts/PlaylistContext";

import AddSongModal from "@features/RequestSongs/ViewPlaylist/AddSongModal";

function OnViewPlaylistPage() {
  const navigate = useNavigate();

  const {
    data: { playlistInfo },
  } = useContext(PlaylistContext);

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
    <>
      <button
        onClick={() => navigate(-1)}
        className="group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
      </button>
      {playlistInfo && (
        <div className="flex">
          <button
            className="group mr-1.5 flex h-[42px] shrink-0 items-center justify-center rounded-full bg-white px-4 text-sm shadow-sm"
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
            <span className="gimmesong-secondary-font ml-1">Share</span>
          </button>
          <AddSongModal />
        </div>
      )}
    </>
  );
}

export default OnViewPlaylistPage;
