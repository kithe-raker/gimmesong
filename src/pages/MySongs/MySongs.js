import { useState } from "react";

import New from "./components/New";
import Favorite from "./components/Favorite";

function MySongs() {
  const [page, setPage] = useState("new");
  const [playing, setPlaying] = useState(null);

  return (
    <div className="flex flex-col items-center min-h-screen pb-[120px] max-w-md mx-auto">
      <div className="p-5 mt-5 bg-gray-300 w-full max-w-[300px]">ADS</div>
      <div className="flex items-center mt-6">
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
          FAV
        </h1>
      </div>
      {page === "new" ? <New /> : <Favorite />}
      <div className="fixed bottom-0 flex justify-center items-center p-5 w-full max-w-md">
        <button className="flex h-16 mr-4 items-center bg-white hover:bg-gray-100 rounded-full p-3 pr-8 shadow-sm">
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
        </button>
        <button className="flex h-16 w-16 justify-center items-center bg-white hover:bg-gray-100 rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MySongs;
