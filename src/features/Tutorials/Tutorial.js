import React from "react";
import { useNavigate } from "react-router-dom";

import WhereLink from "./components/WhereLink";
import WhereSongs from "./components/WhereSongs";
import HowShare from "./components/HowShare";
import HowGive from "./components/HowGive";

import Confuse from "@assets/img/confuse_emoji.png";

function Tutorial() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full">
      <button
        className="fixed top-[18px] left-[18px]"
        onClick={() => navigate("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8l-4 4 4 4M16 12H9" />
        </svg>
      </button>
      <div className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center">
        <img className="h-[60px] w-[60px]" src={Confuse} />
        <div className="mt-8 flex flex-col px-8">
          <WhereLink />
          <WhereSongs />
          <HowGive />
          <HowShare />
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
