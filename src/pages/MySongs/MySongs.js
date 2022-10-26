import { useState } from "react";

import NewSong from "./components/NewSong";
import FavoriteSong from "./components/FavoriteSong";

function MySongs() {
  const [page, setPage] = useState("new");
  const [playing, setPlaying] = useState(null);

  return (
    <div className="flex flex-col items-center min-h-screen overflow-y-auto pb-[120px] max-w-md mx-auto py-6">
      <div className="p-5 my-5 bg-gray-300 w-full max-w-[300px]">ADS</div>
      <div className="flex items-center">
        <h1
          onClick={() => setPage("new")}
          className={`gimmesong-primary-font text-4xl select-none cursor-pointer text-gray-400 ${
            page === "new" && "text-gray-900"
          }`}
        >
          NEW
        </h1>
        <span className="w-[1px] h-5 bg-gray-400 mx-6"></span>
        <h1
          onClick={() => setPage("favorite")}
          className={`gimmesong-primary-font text-4xl select-none cursor-pointer text-gray-400 ${
            page === "favorite" && "text-gray-900"
          }`}
        >
          BOX
        </h1>
      </div>
      {page === "new" ? <NewSong /> : <FavoriteSong />}
      <div className="fixed bottom-0 flex justify-center items-center p-5 w-full max-w-md">
        {/* <button className="flex h-16 mr-4 items-center bg-white hover:bg-gray-100 rounded-full p-3 pr-8 shadow-sm">
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
          <span className="ml-5 gimmesong-primary-font text-xl">
            Tap to play this song
          </span>
        </button> */}
        <div className="flex items-center justify-between h-16 mr-4 w-full bg-white hover:bg-gray-100 rounded-full p-3 pr-4 cursor-pointer">
          <div className="flex items-center overflow-hidden">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
            <div className="flex flex-col mx-2.5 min-w-0 max-w-[150px]">
              <span className="text-sm truncate">
                Pink VenomPink VenomPink VenomPink Venom
              </span>
              <span className="text-xs text-gray-500 truncate">
                BlackpinkBlackpinkBlackpinkBlackpinkBlackpink
              </span>
            </div>
          </div>
          <div className="text-xs">3:02</div>
        </div>
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
    </div>
  );
}

export default MySongs;
