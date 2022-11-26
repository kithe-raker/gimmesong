import React from "react";
import { useNavigate } from "react-router-dom";

import WhereLink from "./components/WhereLink";
import WhereSongs from "./components/WhereSongs";
import HowShare from "./components/HowShare";
import HowGive from "./components/HowGive";

import Confuse from "@assets/img/confuse_emoji.png";
import NewRequest from "./components/NewRequest";
import ShareRequest from "./components/ShareRequest";
import AddSongToRequest from "./components/AddSongToRequest";

function Tutorial() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
      <div className="fixed top-0 z-20 mx-auto flex w-full max-w-md items-center py-6 px-5">
        <button
          onClick={() => navigate("/")}
          className="group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border"
        >
          <svg
            className="text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </button>
      </div>
      <div className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center">
        <img className="h-[60px] w-[60px]" src={Confuse} alt="" />
        <div className="mt-6 flex flex-col px-8">
          <WhereLink />
          <WhereSongs />
          <HowGive />
          <HowShare />
          <NewRequest />
          <ShareRequest />
          <AddSongToRequest />
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
