import { useState } from "react";

import New from "./components/New";
import Favorite from "./components/Favorite";

function MySongs() {
  const [page, setPage] = useState("new");
  const [playing, setPlaying] = useState(null);

  return (
    <div className="flex flex-col items-center min-h-screen pb-[120px] max-w-md mx-auto py-6">
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
          FAV
        </h1>
      </div>
      {page === "new" ? <New /> : <Favorite />}
    </div>
  );
}

export default MySongs;
