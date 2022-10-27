import { useState, useEffect } from "react";

import NewSong from "./components/NewSong";
import FavoriteSong from "./components/FavoriteSong";

// import useReceivedSong from "@store/receivedSong";

function MySongs() {
  const [page, setPage] = useState("new_song");
  const [current, setCurrent] = useState(null); // received song obj
  const [playing, setPlaying] = useState(null); // received song obj
  const [pause, setPause] = useState(true); // received song obj

  // const { newReceivedSongs, setAuth } = useReceivedSong();

  const handleSwipe = (song) => {
    setCurrent(song);
    setPlaying(null);
  };

  const handlePlay = (song) => {
    setPlaying(song);
    setPause(false);
  };

  const handlePause = () => {
    setPause((prev) => !prev);
  };

  useEffect(() => {
    setCurrent(null);
    setPlaying(null);
  }, [page]);

  return (
    <div className="flex flex-col items-center min-h-screen overflow-y-auto pb-[120px] max-w-md mx-auto py-6">
      <div className="p-5 my-5 bg-gray-300 w-full max-w-[300px]">ADS</div>
      <div className="flex items-center">
        <h1
          onClick={() => setPage("new_song")}
          className={`gimmesong-primary-font text-4xl select-none cursor-pointer text-gray-400 ${
            page === "new_song" && "text-gray-900"
          }`}
        >
          NEW
        </h1>
        <span className="w-[1px] h-5 bg-gray-400 mx-6"></span>
        <h1
          onClick={() => setPage("favorite_song")}
          className={`gimmesong-primary-font text-4xl select-none cursor-pointer text-gray-400 ${
            page === "favorite_song" && "text-gray-900"
          }`}
        >
          BOX
        </h1>
      </div>
      {page === "new_song" ? (
        <NewSong playing={playing} pause={pause} onSwipe={handleSwipe} />
      ) : (
        <FavoriteSong />
      )}
      {current && (
        <div className="fixed bottom-0 flex justify-center items-center p-5 w-full max-w-md">
          {!playing ? (
            <button
              onClick={() => handlePlay(current)}
              className="flex h-16 w-[250px] mr-4 items-center bg-white hover:bg-gray-100 rounded-full p-3 pr-8 shadow-sm"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 11 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 4.76795C11.3333 5.53775 11.3333 7.46225 10 8.23205L3.25 12.1292C1.91666 12.899 0.249999 11.9367 0.249999 10.3971L0.25 2.60288C0.25 1.06328 1.91667 0.101034 3.25 0.870834L10 4.76795Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
              <span className="ml-5 gimmesong-primary-font text-xl select-none">
                Tap to play this song
              </span>
            </button>
          ) : (
            <div
              onClick={() => handlePause()}
              className="flex items-center justify-between w-[250px] h-16 mr-4 bg-white hover:bg-gray-100 rounded-full p-3 pr-4 cursor-pointer"
            >
              <div className="flex items-center overflow-hidden">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  {pause ? (
                    <svg
                      className="w-4 h-4"
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
                      className="w-3 h-3"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="4" height="11" rx="2" fill="#FFFFFF" />
                      <rect x="7" width="4" height="11" rx="2" fill="#FFFFFF" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col mx-2.5 min-w-0 max-w-[150px]">
                  <span className="text-sm truncate select-none">
                    {playing.song?.title}
                  </span>
                  <span className="text-xs text-gray-500 truncate select-none">
                    {playing.song?.artistInfo?.artist[0]?.text}
                  </span>
                </div>
              </div>
              <div className="text-xs select-none">{playing.song?.length}</div>
            </div>
          )}
          <button className="flex h-16 w-16 justify-center items-center bg-white hover:bg-gray-100 rounded-full shadow-sm shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default MySongs;
