import { useState, useEffect, useRef } from "react";

import useAudioPlayer from "@hooks/useAudioPlayer";
import toast, { Toaster } from "react-hot-toast";
import { durationToStr } from "@utils/audio";

import GimmesongAPI from "@lib/gimme_api";

function SearchSong({ next, onSelectSong, receiver }) {
  const { audioRef, duration, curTime, playing, setPlaying, reloadAudioSrc } =
    useAudioPlayer();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const [playbackURL, setPlaybackURL] = useState({});
  const searchDelay = useRef(null);

  const handleSearching = (val) => {
    setSearchTerm(val);

    // search song when length of search term longer than 2 characters
    if (val.length >= 2) {
      clearTimeout(searchDelay.current);
      searchDelay.current = setTimeout(async () => {
        // let data = [
        //   {
        //     videoId: "79ucr8WTBIY",
        //     title: "โต๊ะริม (Melt)",
        //     thumbnails: [
        //       {
        //         url: "https://lh3.googleusercontent.com/_nWDWWDYKNIhFfaKO4Z5ah-J1V9nLmfdYddF54WgRRCFP-43Z2jDly4WEt8ZEm40ZSjJ05bTmAkmJ3fp=w60-h60-l90-rj",
        //         width: 60,
        //         height: 60,
        //       },
        //     ],
        //     length: "4:08",
        //     artistInfo: {
        //       artist: [
        //         {
        //           text: "NONT TANONT",
        //           browseId: "UC0qrQfKKZnoP03_8s-2n8-g",
        //           pageType: "MUSIC_PAGE_TYPE_ARTIST",
        //         },
        //       ],
        //     },
        //   },
        //   {
        //     videoId: "6-IotY7xluM",
        //     title: "Zen Bang Bang",
        //     thumbnails: [
        //       {
        //         url: "https://lh3.googleusercontent.com/sjox1KDZpkfoI-jS_HyVsxWK1cGJxJLBdz6EYc889sRBtcQFd4_-mXmU4ZGHArJdLf2e2JWJrrpzZ-mZKA=w60-h60-l90-rj",
        //         width: 60,
        //         height: 60,
        //       },
        //     ],
        //     length: "4:32",
        //     artistInfo: {
        //       artist: [
        //         {
        //           text: "Indigo",
        //           browseId: "UCcWRWFBsm49ty0NvgaBFQ0w",
        //           pageType: "MUSIC_PAGE_TYPE_ARTIST",
        //         },
        //       ],
        //     },
        //   },
        //   {
        //     videoId: "yUZkzYm2d1s",
        //     title: "ลาก่อน",
        //     thumbnails: [
        //       {
        //         url: "https://lh3.googleusercontent.com/Ii9HHgmF5Qj7eZp11U_-pdW8bu3EdbEmktooEbOnoI-GVgBCodDDD44ThLugs2F77vknkBrWsfb52M8LDA=w60-h60-l90-rj",
        //         width: 60,
        //         height: 60,
        //       },
        //     ],
        //     length: "3:09",
        //     artistInfo: {
        //       artist: [
        //         {
        //           text: "YourMOOD",
        //           browseId: "UCFB_-OvPyFi7bPEjUMhSEZg",
        //           pageType: "MUSIC_PAGE_TYPE_ARTIST",
        //         },
        //       ],
        //     },
        //   },
        //   {
        //     videoId: "s8QzkOulL5w",
        //     title: "พิจารณา",
        //     thumbnails: [
        //       {
        //         url: "https://lh3.googleusercontent.com/tqN7LrQHQpvwq23XdmETy33awCYTsgXLPzrMpToRIA_i9K1Bx5XdmXCpeizkUrlhSDpDDhv9fLL9vWTh=w60-h60-l90-rj",
        //         width: 60,
        //         height: 60,
        //       },
        //     ],
        //     length: "4:07",
        //     artistInfo: {
        //       artist: [
        //         {
        //           text: "Musketeers",
        //           browseId: "UCt5x66zBgxyNcVU8R46kItA",
        //           pageType: "MUSIC_PAGE_TYPE_ARTIST",
        //         },
        //       ],
        //     },
        //   },
        // ];
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
        }
      }, 600);
    }
  };

  const handleSelectSong = (song) => {
    setSelected(song);
    if (song.videoId !== selected?.videoId) handlePlay(song.videoId);
  };

  const getPlaybackURL = async (videoId) => {
    // implement fetch videoplayback url here, then set to playbackURL object
    // to reuse in next time
    setPlaybackURL((prev) => {
      return {
        ...prev,
        [videoId]:
          videoId === "79ucr8WTBIY"
            ? "https://download.samplelib.com/mp3/sample-12s.mp3"
            : "https://download.samplelib.com/mp3/sample-15s.mp3",
      };
    });
  };

  const handlePlay = async (videoId) => {
    // get videoplayback url here
    await getPlaybackURL(videoId);
    // reload audio source when current.src is changed
    reloadAudioSrc();
    setPlaying(true);
  };

  const toggleAudio = async () => {
    setPlaying((prev) => !prev);
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
        <div className="h-[calc((64px*3)+22px)] overflow-y-auto overflow-x-hidden ">
          <audio ref={audioRef}>
            <source src={playbackURL[selected?.videoId]} />
            Your browser does not support the <code>audio</code> element.
          </audio>
          {results.map((song, i) => {
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
                    alt="thumbnail"
                    onError={handleImgError}
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
                <div className="text-xs">{song.length}</div>
              </div>
            );
          })}
        </div>
        {selected && (
          <div
            onClick={() => toggleAudio()}
            className="mt-2.5 flex h-16 w-full cursor-pointer items-center justify-between rounded-full bg-gray-100 p-3 pr-4 shadow-sm transition duration-150 ease-in-out hover:bg-gray-200"
          >
            <div className="flex items-center overflow-hidden">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black">
                {!playing ? (
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
              {duration > 0 ? durationToStr(duration) : selected.length}
            </div>
          </div>
        )}
      </div>

      <div className="my-4 flex flex-col items-center">
        <span className="gimmesong-primary-font text-sm text-gray-500">
          give this song to
        </span>
        <span className="bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-transparent">
          gimmesong.link/{receiver}
        </span>
      </div>
      <button
        onClick={submit}
        className="gimmesong-primary-font h-12 w-[250px] rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600"
      >
        NEXT
      </button>
      <Toaster />
    </div>
  );
}

export default SearchSong;
