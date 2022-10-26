import React from "react";
import menu1 from "@assets/img/menu1.svg";
import menu2 from "@assets/img/menu2.svg";

function Menu() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-md mx-auto py-6">
      <h1 className="gimmesong-primary-font text-5xl mt-2 mb-2">GIMMESONG</h1>
      <span className="gimmesong-primary-font">
        Songs have been given 123,568 times.
      </span>
      <div className="relative h-64 w-64 mt-6 ">
        <img className="absolute w-fit" src={menu1} alt="my songs" />
        <div className="absolute flex top-3 right-3 items-center">
          <span className="gimmesong-primary-font">my songs</span>
          <svg
            className="w-4 h-4"
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
      <div className="relative h-64 w-64 mt-7">
        <img className="w-fit" src={menu2} alt="give a song" />
        <div className="absolute flex top-3 right-3 items-center">
          <span className="gimmesong-primary-font text-white">my songs</span>
          <svg
            className="w-4 h-4"
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
