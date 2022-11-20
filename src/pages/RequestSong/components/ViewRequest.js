import React from "react";

import back_icon from "@assets/img/back_icon.png";

function ViewRequest() {
  return (
    <div className="mx-6 h-full w-full">
      <div className="flex justify-between">
        <button className="h-9">
          <img src={back_icon} />
        </button>
        <div className="flex h-9 ">
          <button className="flex items-center rounded-full border border-black px-3 py-[5px] mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span className="gimmesong-secondary-font ml-1">Share</span>
          </button>
          <button className="flex items-center rounded-full border border-black px-3 py-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="gimmesong-secondary-font ml-1">Songs</span>
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-center">
        <span className="gimmesong-secondary-font text-center text-xl font-semibold">
          Anonymous
        </span>
        <span className="gimmesong-secondary-font text-center text-xl">
          K-POP ที่อยากเต้น cover มากที่สุด
        </span>
        <div className="mt-8 flex items-center justify-center">
          <button className="flex w-max rounded-tl-xl rounded-bl-xl border border-black px-2 py-1">
            full
          </button>
          <button className="flex w-max rounded-tr-xl rounded-br-xl border border-black px-2 py-1">
            grid
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ViewRequest;
