import { createContext, useState, useEffect } from "react";
import GimmesongAPI from "@lib/gimmesong_api";
import { useParams } from "react-router-dom";

export const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const { id: shareLinkId } = useParams();

  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [items, setItems] = useState([]);

  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPlaylistInfo = async () => {
    try {
      setIsLoadingInfo(true);
      setIsError(false);

      const _playlistInfo = await GimmesongAPI.SongRequest.GetDetailsByLinkId(
        shareLinkId
      );

      if (_playlistInfo?.exists) {
        setPlaylistInfo(_playlistInfo.details);

        await GimmesongAPI.SongRequest.IncrementView(
          _playlistInfo.details.language,
          _playlistInfo.details.id
        );
      }
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoadingInfo(false);
    }
  };

  const fetchPlaylistItems = async (options = {}) => {
    const { reset = true, limit = 100 } = options;

    try {
      setIsLoadingItems(true);
      setIsError(false);

      let _items = await GimmesongAPI.SongRequest.QueryRequestItem(
        playlistInfo.language,
        playlistInfo.id,
        { lastItemId: reset ? null : items[items.length - 1]?.id, limit }
      );

      setItems(_items);
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchPlaylistInfo();
  }, []);

  useEffect(() => {
    if (!playlistInfo) return;
    fetchPlaylistItems();
  }, [playlistInfo]);

  const playlistStore = {
    isLoadingInfo,
    isLoadingItems,
    isError,
    data: {
      playlistInfo,
      items,
    },
    action: {
      fetchPlaylistItems,
    },
  };

  return (
    <PlaylistContext.Provider value={playlistStore}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
