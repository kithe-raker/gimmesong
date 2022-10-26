import React from "react";
import bg from "@assets/img/gimmesong_gradient_bg.png";

function GetLink() {
  return (
    <div className="relative h-48 w-72 flex justify-center items-center overflow-hidden rounded-3xl">
      <img
        className="absolute h-full w-full inset-0 object-cover"
        src={bg}
        alt="background"
      />
      <div className="absolute flex flex-col items-center">
        <span className="text-white gimmesong-primary-font text-2xl">
          Share with friends
        </span>
        <div className="relative w-[250px] mt-4">
          <div className="flex absolute inset-y-0 left-0 items-center pl-6 pointer-events-none">
            <svg
              className="text-gray-500 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <div className="h-12 w-full pl-12 pr-10 text-gray-800 bg-white rounded-full flex items-center overflow-hidden">
            <span className="gimmesong-primary-font text-lg truncate">
              gimmesong.link/@friend
            </span>
          </div>
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetLink;
