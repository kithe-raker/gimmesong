import React from "react";
import bg from "@assets/img/getLink_bg.png";

function GetLink() {
  return (
      <div className="realative flex justify-center items-center">
        <img className="absolute" src={bg} />
        <div className="absolute flex flex-col items-center">
          <span className="text-white gimmesong-primary-font text-2xl">
            Share with friends
          </span>
          <div class="relative w-[250px] mt-4">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
            <div className="h-12 w-[250px] pl-10 pr-6 text-gray-800 bg-white rounded-full flex items-center overflow-hidden">
              <span className="gimmesong-primary-font text-lg">
                gimmesong.link/@friend
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default GetLink;
