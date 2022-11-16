import { useState, useRef } from "react";

import Loading from "@components/Loading";

import toast from "react-hot-toast";
import useSession from "@hooks/useSession";
import { useNavigate } from "react-router-dom";
import useAudioPlayer from "@hooks/useAudioPlayer";

import { StreamingError, PlayerError } from "@lib/error";
import GimmesongAPI from "@lib/gimmesong_api";
import ytm from "@lib/ytm_api";
import Ads from "@lib/ads";

function SearchSong({ next, onSelectSong, receiver }) {
  const navigate = useNavigate();
  const { user } = useSession();

  const {
    audioRef,
    playing,
    loading: loadingAudio,
    toggleAudio,
    stopAudio,
  } = useAudioPlayer();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const [loadingStreamingData, setLoadingStreamingData] = useState(false);
  const [loading, setLoading] = useState(false);

  const [playbackURL, setPlaybackURL] = useState({});
  const searchDelay = useRef(null);

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  const handleSearching = (val) => {
    setSearchTerm(val);

    // search song when length of search term equal or longer than 2 characters
    if (val.length >= 2) {
      setLoading(true);
      clearTimeout(searchDelay.current);
      searchDelay.current = setTimeout(async () => {
        try {
          let results = await GimmesongAPI.searchSongs({
            text: val,
          });
          setResults(results);
        } catch (err) {
          toast(err.message, {
            style: {
              borderRadius: "25px",
              background: "#FF6464",
              color: "#fff",
            },
          });
          console.error(err);
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
  };

  const handleSelectSong = (song) => {
    setSelected(song);
    if (song.videoId !== selected?.videoId) {
      if (selected) stopAudio();
      handlePlay(song.videoId);
    }
  };

  const getPlaybackURL = async (videoId) => {
    // check object key before query, if not found will query new playback url
    if (!playbackURL[videoId]) {
      try {
        setLoadingStreamingData(true);
        // implement fetch playback url here, then set to playbackURL object
        // to reuse in next time
        const streamsData = await ytm.getStreamsUrl(videoId);

        setPlaybackURL((prev) => {
          return {
            ...prev,
            [videoId]: streamsData,
          };
        });
      } catch (err) {
        throw err;
      } finally {
        setLoadingStreamingData(false);
      }
    }
  };

  const handlePlay = async (videoId) => {
    try {
      // get videoplayback url here
      await getPlaybackURL(videoId);
      await toggleAudio();
    } catch (err) {
      let msg = "";
      if (err instanceof StreamingError) {
        msg =
          "This song is unplayable, but you can still send it to " + receiver;
      } else if (err instanceof PlayerError) {
        if (err.message.includes("denied permission")) {
        } else {
          msg = "PlayerError: " + err.message;
        }
      }
      if (msg) {
        toast(msg, {
          style: {
            borderRadius: "25px",
            background: "#FF6464",
            color: "#fff",
          },
        });
      }
      console.error(err);
    }
  };

  const toggle = async (videoId) => {
    try {
      // get videoplayback url here
      await getPlaybackURL(videoId);
      await toggleAudio();
    } catch (err) {
      let msg = "";
      if (err instanceof StreamingError) {
        msg =
          "This song is unplayable, but you can still send it to " + receiver;
      } else if (err instanceof PlayerError) {
        if (err.message.includes("denied permission")) {
        } else {
          msg = "PlayerError: " + err.message;
        }
      }
      if (msg) {
        toast(msg, {
          style: {
            borderRadius: "25px",
            background: "#FF6464",
            color: "#fff",
          },
        });
      }
      console.error(err);
    }
  };

  const submit = () => {
    // implement validation logic here
    if (!selected) {
      toast("Please select a song", {
        style: {
          borderRadius: "25px",
          background: "#FF6464",
          color: "#fff",
        },
      });
      return;
    }
    onSelectSong(selected);
    next();
  };

  const handleImgError = (e) => {
    e.currentTarget.src = "";
  };

  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center">
      <span className="gimmesong-primary-font text-xl text-gray-600 ">
        Give me song anonymously!
      </span>
      <div className="relative mt-3 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          value={searchTerm}
          onChange={(e) => handleSearching(e.target.value)}
          type="text"
          className="block h-12 w-full rounded-full bg-white pl-10 pr-6 text-gray-900 focus:outline-gray-500"
          placeholder="search song"
          required
        />
      </div>
      <div className="mt-3 w-full rounded-[36px] bg-white p-3">
        <div className="relative h-[calc((64px*3)+22px)] overflow-y-auto overflow-x-hidden">
          <audio
            ref={audioRef}
            preload="metadata"
            src={
              playbackURL[selected?.videoId] &&
              playbackURL[selected?.videoId]["audio/mp4"]
            }
          >
            Your browser does not support the <code>audio</code> element.
            {/* {playbackURL[selected?.videoId] &&
              Object.entries(playbackURL[selected?.videoId]).map(
                ([mimeType, url]) => {
                  return (
                    <source
                      key={`${selected?.videoId}-${mimeType}`}
                      src={url}
                      type={mimeType}
                    />
                  );
                }
              )} */}
          </audio>
          {loading ? (
            <Loading disableBg />
          ) : (
            results.map((song, i) => {
              let isSelected = selected?.videoId === song?.videoId;
              return (
                <div
                  onClick={() => handleSelectSong(song)}
                  key={i}
                  className={`${
                    isSelected
                      ? "bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0]"
                      : ""
                  } ${
                    isSelected ? "text-white" : "text-gray-800"
                  } mb-2.5 flex h-16 w-full cursor-pointer items-center justify-between rounded-full bg-white p-3 pr-4 last:mb-0 hover:bg-gray-100`}
                >
                  <div className="flex items-center overflow-hidden">
                    <img
                      className="h-10 w-10 shrink-0 select-none rounded-full object-contain"
                      src={song.thumbnails[0]?.url}
                      onError={handleImgError}
                      alt="thumbnail"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="mx-2.5 flex min-w-0 flex-col">
                      <span className={`truncate text-sm`}>{song.title}</span>
                      <span
                        className={`truncate text-xs ${
                          isSelected ? "text-white" : "text-gray-500 "
                        }`}
                      >
                        {song.artistInfo?.artist[0]?.text}
                      </span>
                    </div>
                  </div>
                  {/* <div className="text-xs">{song.length}</div> */}
                </div>
              );
            })
          )}
        </div>
        {selected && (
          <div
            onClick={() => toggle(selected?.videoId)}
            className="mt-2.5 flex h-16 w-full cursor-pointer items-center justify-between rounded-full bg-gray-100 p-3 pr-4 shadow-sm transition duration-150 ease-in-out"
          >
            <div className="flex items-center overflow-hidden">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black">
                {loadingStreamingData || loadingAudio ? (
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : !playing ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 11 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 4.76795C11.3333 5.53775 11.3333 7.46225 10 8.23205L3.25 12.1292C1.91666 12.899 0.249999 11.9367 0.249999 10.3971L0.25 2.60288C0.25 1.06328 1.91667 0.101034 3.25 0.870834L10 4.76795Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="4" height="11" rx="2" fill="#FFFFFF" />
                    <rect x="7" width="4" height="11" rx="2" fill="#FFFFFF" />
                  </svg>
                )}
              </div>
              <div className="mx-2.5 flex min-w-0 flex-col">
                <span className="select-none truncate text-sm">
                  {selected.title}
                </span>
                <span className="select-none truncate text-xs text-gray-500">
                  {selected.artistInfo?.artist[0]?.text}
                </span>
              </div>
            </div>
            {/* <div className="select-none text-xs">
              {duration > 0 ? durationToStr(duration) : selected.length}
            </div> */}
          </div>
        )}
      </div>
      <div className="my-4 flex flex-col items-center">
        <span className="gimmesong-primary-font text-sm text-gray-500">
          give this song to
        </span>
        <span className="bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-transparent">
          gimmesong.link/@{receiver}
        </span>
      </div>
      <button
        onClick={submit}
        className="gimmesong-primary-font h-12 w-[250px] rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600"
      >
        NEXT
      </button>
      {!user?.username && (
        <button
          onClick={() => navigate("/")}
          className="mt-6 h-12 animate-bounce rounded-full bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] px-6 text-white transition duration-150 ease-in-out hover:bg-gray-600"
        >
          Get your own anonymous song!
        </button>
      )}
    </div>
  );
}

export default SearchSong;
