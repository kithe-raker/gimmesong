import React from "react";
import menu1 from "@assets/img/menu1.svg";
import menu2 from "@assets/img/menu2.svg";

import GetLink from "@components/GetLink";

import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <h1 className="gimmesong-primary-font mt-2 mb-2 text-5xl">GIMMESONG</h1>
      <span className="gimmesong-primary-font mb-6">
        Songs have been given 123,568 times.
      </span>
      <GetLink />
      <div className="mt-6 flex w-72 items-center justify-between rounded-full bg-black p-3 pl-8">
        <span className="gimmesong-primary-font text-white">
          Give someone a song
        </span>
        <button
          onClick={() => navigate("/search")}
          className="group inline-flex h-[42px] w-[42px] animate-bounce-a-bit items-center justify-center rounded-full bg-white bg-gradient-to-r text-gray-600 transition duration-150 ease-in-out hover:from-[#86C7DF] hover:to-[#CFB6D0] "
        >
          <svg
            className="h-4 w-4 text-gray-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h13M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {/* <div
        onClick={() => navigate("/mysongs")}
        className="relative mt-6 h-64 w-64 cursor-pointer"
      >
        <img className="absolute w-fit" src={menu1} alt="my songs" />
        <div className="absolute top-3 right-3 flex items-center">
          <span className="gimmesong-primary-font">my songs</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div> */}
      {/* <div
        onClick={() => navigate("/search")}
        className="relative mt-7 h-64 w-72 cursor-pointer"
      >
        <img className="absolute w-full" src={menu2} alt="give a song" />
        <div className="absolute top-3 right-3 flex items-center">
          <span className="gimmesong-primary-font text-white">send song</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div> */}
    </div>
  );
}

export default Menu;
