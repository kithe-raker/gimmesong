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
      } max-w-md flex-col items-center py-6 pt-64`}
    >
      {/* <div className="gimmesong-bg fixed top-0 z-50 flex h-16 w-full max-w-md items-center justify-between px-2.5">
        
      </div> */}
      {isLoadingInfo ? (
        <Loading fullScreen />
      ) : playlistInfo ? (
        <div className="flex w-full max-w-md flex-col items-center">
          {/* <div className="gimmesong-bg sticky top-[60px] z-[49] mt-4 flex w-full flex-col items-center p-3">
            
          </div> */}
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
