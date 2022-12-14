import { createContext, useState, useMemo, useCallback } from "react";
import GimmesongAPI from "@lib/gimmesong_api";

export const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [pageLayout, setPageLayout] = useState("multiple");

  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [items, setItems] = useState([]);

  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPlaylistInfo = async (shareLinkId) => {
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
    const { loading = true, reset = true, limit = 20 } = options;

    try {
      setIsLoadingMore(!reset);
      setIsLoadingItems(loading);
      setIsError(false);

      let _items = await GimmesongAPI.SongRequest.QueryRequestItem(
        playlistInfo.language,
        playlistInfo.id,
        { lastItemId: reset ? null : items[items.length - 1]?.id, limit }
      );
      if (reset) {
        setItems(_items);
      } else {
        setItems([...items, ..._items]);
      }
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoadingMore(false);
      setIsLoadingItems(false);
    }
  };

  const loadMore = (limit) => {
    fetchPlaylistItems({ loading: false, reset: false, limit });
  };

  /**
   * @notice
   * @dev
   */
  const hasNext = useMemo(() => {
    if (!playlistInfo) return false;
    const local = items.length - 1;
    const remote = playlistInfo.counter - 1;
    return remote > local;
  }, [items]);

  /**
   * @notice
   * @dev
   * @param {Integer} current current track index
   * @param {Integer} expectedRemaining
   */
  const shouldLoadMore = useCallback(
    (current, expectedRemaining) => {
      if (!playlistInfo) return false;
      const local = items.length - 1;
      return local - current < expectedRemaining;
    },
    [items]
  );

  const playlistStore = {
    data: {
      playlistInfo,
      pageLayout,
      items,
    },
    state: {
      isLoadingInfo,
      isLoadingItems,
      isLoadingMore,
      isError,
      hasNext,
    },
    action: {
      fetchPlaylistInfo,
      fetchPlaylistItems,
      shouldLoadMore,
      loadMore,
      setPageLayout,
    },
  };

  return (
    <PlaylistContext.Provider value={playlistStore}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
