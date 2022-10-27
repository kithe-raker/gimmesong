import { useState } from "react";

import NewReceived from "./components/NewReceived";
import AllReceived from "./components/AllReceived";

function MySongs() {
  const [currentPage, setCurrentPage] = useState("newReceived");

  let render = {
    newReceived: <NewReceived />,
    allReceived: <AllReceived />,
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen overflow-y-auto pb-[120px] max-w-md mx-auto py-6">
      <div className="p-5 my-5 bg-gray-300 w-full max-w-[300px]">ADS</div>
      <div className="flex items-center">
        <h1
          onClick={() => setCurrentPage("newReceived")}
          className={`gimmesong-primary-font text-4xl select-none cursor-pointer text-gray-400 ${
            currentPage === "newReceived" && "text-gray-900"
          }`}
        >
          NEW
        </h1>
        <span className="w-[1px] h-5 bg-gray-400 mx-6"></span>
        <h1
          onClick={() => setCurrentPage("allReceived")}
          className={`gimmesong-primary-font text-4xl select-none cursor-pointer text-gray-400 ${
            currentPage === "allReceived" && "text-gray-900"
          }`}
        >
          BOX
        </h1>
      </div>
      {render[currentPage]}
    </div>
  );
}

export default MySongs;
