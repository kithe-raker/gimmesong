import { useState, useEffect, useRef } from "react";

import useAudioPlayer from "@hooks/useAudioPlayer";
import toast from "react-hot-toast";
import { durationToStr } from "@utils/audio";

import Loading from "@components/Loading";

import GimmesongAPI from "@lib/gimmesong_api";
import ytm from "@lib/ytm_api";

import { StreamingError, PlayerError } from "@lib/error";

function SearchSong({ next, onSelectSong, receiver }) {
  const {
    audioRef,
    playing,
    loading: loadingAudio,
    loadAudio,
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

  const handleSearching = (val) => {
    setSearchTerm(val);

    // search song when length of search term longer than 2 characters
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
      // loadAudio();
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
    // reload audio source when current.src is changed
    // reloadAudioSrc();
    // setPlaying(true);
  };

  const toggle = async (videoId) => {
    try {
      // get videoplayback url here
      await getPlaybackURL(videoId);
      // loadAudio();
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

    // setPlaying((prev) => !prev);
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
            {/* <source src={playbackURL[selected?.videoId]} /> */}
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
            {/* <source
              src="https://pipedproxy-bom-2.kavin.rocks/videoplayback?expire=1667909930&ei=yvRpY6_9J6W3rtoPkq626AU&ip=140.238.251.167&id=o-ADfIJGtB7xQB2_a9KUzFBf57Q_dBhQ6B6974MVGWMmMk&itag=251&source=youtube&requiressl=yes&mh=VR&mm=31%2C26&mn=sn-cvh7kn6s%2Csn-h557sn66&ms=au%2Conr&mv=m&mvi=1&pl=25&gcr=in&initcwndbps=3125000&spc=SFxXNj5iNkTMCyKytswiI38aV860xEY&vprv=1&svpuc=1&mime=audio%2Fwebm&gir=yes&clen=4285467&dur=257.601&lmt=1637730360087162&mt=1667887982&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=ANDROID&txp=5432434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgchxTpN8ptRFA8s_KXU8ClCbL-k2e2XnGNHEqrr1wpoECIQDDkEsuf7BE4-OAvN1NaauIPAlCj8t3uIsTv3rrGERUjA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgK71c6blatF6b5W6gk_yF-9mN48guYDO3g_3kzXDTl2QCIF4DSazjH6HysUBcRNrK0dmJxJLMleScuwcdgE6OEFBB&cpn=gHYtNfymaE_x0DDj&host=rr1---sn-cvh7kn6s.googlevideo.com"
              type="audio/webm"
            />
            <source
              src="https://pipedproxy-bom-2.kavin.rocks/videoplayback?expire=1667909930&ei=yvRpY6_9J6W3rtoPkq626AU&ip=140.238.251.167&id=o-ADfIJGtB7xQB2_a9KUzFBf57Q_dBhQ6B6974MVGWMmMk&itag=140&source=youtube&requiressl=yes&mh=VR&mm=31%2C26&mn=sn-cvh7kn6s%2Csn-h557sn66&ms=au%2Conr&mv=m&mvi=1&pl=25&gcr=in&initcwndbps=3125000&spc=SFxXNj5iNkTMCyKytswiI38aV860xEY&vprv=1&svpuc=1&mime=audio%2Fmp4&gir=yes&clen=4171895&dur=257.578&lmt=1637730379655136&mt=1667887982&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=ANDROID&txp=5432434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAKBtmSKlmxpUEkmWZemEemogHStDc_yf8OfPiDrPzoo1AiEA_2fAZmKnVHs1SueSiixuiPu5bHumCMS-Q_YJ_aiMdaQ%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgK71c6blatF6b5W6gk_yF-9mN48guYDO3g_3kzXDTl2QCIF4DSazjH6HysUBcRNrK0dmJxJLMleScuwcdgE6OEFBB&cpn=gHYtNfymaE_x0DDj&host=rr1---sn-cvh7kn6s.googlevideo.com"
              type="audio/mp4"
            /> */}
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
                    <div className="mx-2.5 flex min-w-0 max-w-[150px] flex-col">
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
                  <div className="text-xs">{/* {song.length} */}</div>
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
              <div className="mx-2.5 flex min-w-0 max-w-[150px] flex-col">
                <span className="select-none truncate text-sm">
                  {selected.title}
                </span>
                <span className="select-none truncate text-xs text-gray-500">
                  {selected.artistInfo?.artist[0]?.text}
                </span>
              </div>
            </div>
            <div className="select-none text-xs">
              {/* {duration > 0 ? durationToStr(duration) : selected.length} */}
            </div>
          </div>
        )}
      </div>
      {/* <button className="bg-red-400" onClick={loadAudio}>
        Load
      </button> */}

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
    </div>
  );
}

export default SearchSong;
