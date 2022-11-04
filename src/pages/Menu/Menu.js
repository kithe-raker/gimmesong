import React from "react";
import menu1 from "@assets/img/menu1.svg";
import menu2 from "@assets/img/menu2.svg";

import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <h1 className="gimmesong-primary-font mt-2 mb-2 text-5xl">GIMMESONG</h1>
      <span className="gimmesong-primary-font">
        Songs have been given 123,568 times.
      </span>
      <div
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
      </div>
      <div
        onClick={() => navigate("/search")}
        className="relative mt-7 h-64 w-64 cursor-pointer"
      >
        <img className="w-fit" src={menu2} alt="give a song" />
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
      </div>
    </div>
  );
}

export default Menu;
