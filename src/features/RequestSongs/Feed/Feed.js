import { useState } from "react";

function Feed() {
  const [filter, setFilter] = useState("most_play");

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-6 pt-[60px]">
      <div className="flex w-full flex-col px-6">
        <div className="flex items-center justify-between">
          <span className="gimmesong-secondary-font text-3xl font-bold">
            📣 Songs Request
          </span>
          <button className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AEAEAE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex">
            <div
              className={`${
                filter === "most_play"
                  ? "bg-black text-white"
                  : "border-[1.5px] border-gray-300"
              } gimmesong-secondary-font mr-1.5 flex h-10 items-center rounded-full px-4 text-xs font-semibold`}
            >
              Most play
            </div>
            <div
              className={`${
                filter === "newest"
                  ? "bg-black text-white"
                  : "border-[1.5px] border-gray-300"
              } gimmesong-secondary-font mr-1.5 flex h-10 items-center rounded-full px-4 text-xs font-semibold`}
            >
              Newest
            </div>
            <div
              className={`${
                filter === "my_request"
                  ? "bg-black text-white"
                  : "border-[1.5px] border-gray-300"
              } gimmesong-secondary-font mr-1.5 flex h-10 items-center rounded-full px-4 text-xs font-semibold`}
            >
              My Request
            </div>
          </div>
          <button>TH</button>
        </div>
      </div>

      {/* <div className="bottom-0">
        <img src={AddRequest} />
      </div> */}
    </div>
  );
}

export default Feed;
