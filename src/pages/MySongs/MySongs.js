import { useState } from "react";

import NewSong from "./components/NewSong";
import FavoriteSong from "./components/FavoriteSong";

// import useReceivedSong from "@store/receivedSong";

function MySongs() {
  const [page, setPage] = useState("new_song");

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
      {page === "new_song" ? <NewSong /> : <FavoriteSong />}
    </div>
  );
}

export default MySongs;
