import React from "react";
// import bg from "@assets/img/gimmesong_gradient_bg.png";

import { useCopyToClipboard } from "usehooks-ts";
import useSession from "@hooks/useSession";

function GetLink() {
  const { user } = useSession();
  const [value, copy] = useCopyToClipboard();

  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0]">
      {/* <img
        className="absolute inset-0 h-full w-full object-cover"
        src={bg}
        alt="background"
      /> */}
      <div className="absolute flex flex-col items-center">
        <span className="gimmesong-primary-font text-2xl text-white">
          Share with friends
        </span>
        <div className="relative mt-4 w-[250px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
            <svg
              className="h-4 w-4 text-gray-500"
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
          <div className="flex h-12 w-full items-center overflow-hidden rounded-full bg-white pl-12 pr-10 text-gray-800">
            <span className="gimmesong-primary-font overflow-x-scroll whitespace-nowrap text-lg">
              https://gimmesong.link/@{user.username}
            </span>
          </div>
          <button
            onClick={() => copy(`https://gimmesong.link/@${user.username}`)}
            className="absolute right-2 bottom-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="h-5 w-5 text-gray-400"
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
