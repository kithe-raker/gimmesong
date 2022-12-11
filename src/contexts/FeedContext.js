import { createContext, useState, useEffect } from "react";
import GimmesongAPI from "@lib/gimmesong_api";

import { useLocation } from "react-router-dom";
import useScrollPosition from "@hooks/useScrollPosition";

import LanguageTag from "@lib/languageTag";

export const FeedContext = createContext();

const FeedProvider = ({ children }) => {
  const { pathname } = useLocation();

  const tag = LanguageTag.getPreferenceLanguage();

  const scrollY = useScrollPosition();
  const [scrollPosition, setScrollPosition] = useState(0);

  const [items, setItems] = useState([]);
  const [lang, setLang] = useState(tag);
  const [filter, setFilter] = useState("newest");
  const [hasNext, setHasNext] = useState(true);

  // TODO: Data for club. I don't know how the api will work yet so this is a placeholder
  const [isClubFeed, setIsClubFeed] = useState(false);
  const [clubLink, setClubLink] = useState("");
  const [clubEmoji, setClubEmoji] = useState("");
  const [clubTitle, setClubTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchContent = async (options = {}) => {
    // TODO: also fetch content by club link?
    const { loading = true, reset = false, filter, limit = 20 } = options;

    try {
      setIsError(false);
      setIsLoading(loading);
      setIsLoadingMore(!reset);

      let results;
      let lastItem = reset ? null : items[items.length - 1]?.id;

      if (filter === "most_play") {
        results = await GimmesongAPI.SongRequest.QueryMostView(lang, {
          lastRequestId: lastItem,
          limit: 20,
        });
      } else if (filter === "newest") {
        results = await GimmesongAPI.SongRequest.QueryNewest(lang, {
          lastRequestId: lastItem,
          limit,
        });
      } else if (filter === "my_request") {
        results = await GimmesongAPI.SongRequest.QueryUserRequest({
          lastRequestId: lastItem,
          limit,
        });
      }

      if (reset) {
        setItems(results);
        setHasNext(true);
      } else {
        setItems([...items, ...results]);
      }
      if (results.length === 0) setHasNext(false);
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const changeClub = (clubData) => {
    // TODO: Maybe you want to change how we handle this club topic data?
    const { title, emoji, urllink } = clubData;
    setClubLink(urllink);
    setClubEmoji(emoji);
    setClubTitle(title);

    setIsClubFeed(true);
  };

  const updateFeedItemInfo = async (shareLinkId) => {
    if (items.length === 0) return;

    try {
      setIsError(false);

      const _playlistInfo = await GimmesongAPI.SongRequest.GetDetailsByLinkId(
        shareLinkId
      );

      if (_playlistInfo?.exists) {
        let _playlist = _playlistInfo.details;
        let updated = items.map((item) =>
          item.id === _playlist.id ? { ..._playlist } : item
        );
        setItems(updated);
      }
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  };

  const loadMore = (limit) => {
    fetchContent({ loading: false, reset: false, filter, limit });
  };

  const changeFilter = (val) => {
    setFilter(val);
    fetchContent({ loading: true, reset: true, filter: val });
  };

  const onCreatedRequest = () => {
    setScrollPosition(0);
    fetchContent({ loading: true, reset: true, filter });
  };

  useEffect(() => {
    if (!pathname.startsWith("/request")) return;
    setScrollPosition(scrollY);
  }, [scrollY]);

  useEffect(() => {
    if (!pathname.startsWith("/request")) return;
    window.scrollTo(0, scrollPosition);
  }, [pathname]);

  const club = {
    title: clubTitle,
    emoji: clubEmoji,
    urllink: clubLink,
  };

  const feedStore = {
    state: {
      isLoading,
      isLoadingMore,
      isError,
      hasNext,
    },
    data: {
      items,
      filter,
      isClubFeed,
      club,
    },
    action: {
      changeFilter,
      changeLang: setLang,
      changeClub,
      loadMore,
      onCreatedRequest,
      fetchContent,
      updateFeedItemInfo,
    },
  };

  return (
    <FeedContext.Provider value={feedStore}>{children}</FeedContext.Provider>
  );
};

export default FeedProvider;
