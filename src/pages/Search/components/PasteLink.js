import React from "react";
import linkBg from "@assets/img/link_bg.png";

function PasteLink() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="gimmesong-primary-font text-gray-600 text-xl ">
        Paste receiver link here
      </span>
      <div className="relative w-[250px] mt-4">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="block h-12 w-[250px] pl-10 pr-12 w-full text-gray-900 bg-white rounded-full focus:outline-gray-500"
          placeholder="gimmesong.link/@friend"
          required
        />
        <button className="text-white absolute flex right-2 bottom-2 top-2 hover:bg-gray-100 focus:outline-none font-medium rounded-full text-sm h-8 w-8 justify-center items-center">
          <svg
            className="text-gray-400 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </button>
      </div>
      <button className="mt-5 h-12 w-[250px] gimmesong-primary-font bg-black hover:opacity-70 rounded-full text-white">
        NEXT
      </button>
    </div>
  );
}

export default PasteLink;
