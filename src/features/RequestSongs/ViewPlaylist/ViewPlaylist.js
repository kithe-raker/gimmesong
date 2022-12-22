import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ReceivedSongs from "./components/ReceivedSongs";
import Empty from "./components/Empty";
import Loading from "@components/Loading";
import AddSongModal from "./AddSongModal/AddSongModal";

import Ads from "@lib/ads";

import { PlaylistContext } from "contexts/PlaylistContext";
import Top from "./components/Top";

function ViewPlaylist() {
  const navigate = useNavigate();
  const { id: shareLinkId } = useParams();

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  const {
    state: { isLoadingInfo },
    data: { playlistInfo, pageLayout },
    action: { fetchPlaylistInfo, setPageLayout },
  } = useContext(PlaylistContext);

  useEffect(() => {
    fetchPlaylistInfo(shareLinkId);
  }, []);

  return (
    <div
      className={`relative mx-auto flex ${
        pageLayout === "single" ? "h-full" : "min-h-full"
      } max-w-md flex-col items-center`}
    >
      {isLoadingInfo ? (
        <Loading fullScreen />
      ) : (
        <>
          <Top />

          {playlistInfo ? (
            <div className="flex w-full max-w-md flex-col items-center">
              <ReceivedSongs
                layout={pageLayout}
                onLayoutChange={setPageLayout}
              />
            </div>
          ) : (
            <Empty
              title="Not found"
              message="Playlist that you are looking for may not exist."
            />
          )}
        </>
      )}
    </div>
  );
}

export default ViewPlaylist;
