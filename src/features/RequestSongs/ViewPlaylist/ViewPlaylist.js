import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ReceivedSongs from "./components/ReceivedSongs";
import Empty from "./components/Empty";
import Loading from "@components/Loading";
import AddSongModal from "./AddSongModal/AddSongModal";

import Ads from "@lib/ads";

import { PlaylistContext } from "contexts/PlaylistContext";

function ViewPlaylist() {
  const navigate = useNavigate();
  const { id: shareLinkId } = useParams();

  const [pageLayout, setPageLayout] = useState("multiple");

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  const {
    state: { isLoadingInfo },
    data: { playlistInfo },
    action: { fetchPlaylistInfo },
  } = useContext(PlaylistContext);

  useEffect(() => {
    fetchPlaylistInfo(shareLinkId);
  }, []);

  return (
    <div
      className={`relative mx-auto flex ${
        pageLayout === "single" ? "h-full" : "min-h-full"
      } max-w-md flex-col items-center py-6 pt-[60px]`}
    >
      {/* <div className="gimmesong-bg fixed top-0 z-50 flex h-16 w-full max-w-md items-center justify-between px-2.5">
        
      </div> */}
      {isLoadingInfo ? (
        <Loading fullScreen />
      ) : playlistInfo ? (
        <div className="flex w-full max-w-md flex-col items-center">
          <div className="mt-2 flex flex-col">
            <span className="bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-center text-2xl font-semibold text-transparent">
              {playlistInfo.isAnonymous
                ? "Anonymous"
                : `@${playlistInfo.requester.username}`}
            </span>
            <span className="mt-1 max-w-full px-4 text-center font-semibold line-clamp-2">
              {playlistInfo.message}
            </span>
          </div>
          <div className="gimmesong-bg sticky top-[60px] z-[49] mt-4 flex w-full flex-col items-center p-3">
            <div className="inline-flex rounded-full" role="group">
              <button
                type="button"
                onClick={() => setPageLayout("single")}
                className={`rounded-l-xl ${
                  pageLayout === "single"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } h-10 min-w-[56px] py-2 px-4 text-sm font-medium`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="13"
                    viewBox="0 0 23 13"
                    fill="none"
                  >
                    <rect
                      x="5"
                      width="13"
                      height="13"
                      rx="6.5"
                      fill="currentColor"
                    />
                    <path
                      d="M0 4H0.5C1.88071 4 3 5.11929 3 6.5C3 7.88071 1.88071 9 0.5 9H0V4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M23 9H22.5C21.1193 9 20 7.88071 20 6.5C20 5.11929 21.1193 4 22.5 4H23V9Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="gimmesong-secondary-font ml-2 text-sm">
                    Full
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPageLayout("multiple")}
                className={`rounded-r-xl ${
                  pageLayout === "multiple"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } h-10 min-w-[56px] py-2 px-4 text-sm font-medium`}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                  >
                    <rect width="3" height="3" rx="1.5" fill="currentColor" />
                    <rect
                      y="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      y="12"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      y="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      y="12"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="gimmesong-secondary-font ml-2 text-sm">
                    Grid
                  </span>
                </div>
              </button>
            </div>
          </div>
          <ReceivedSongs layout={pageLayout} onLayoutChange={setPageLayout} />
        </div>
      ) : (
        <Empty
          title="Not found"
          message="Playlist that you are looking for may not exist."
        />
      )}
    </div>
  );
}

export default ViewPlaylist;
