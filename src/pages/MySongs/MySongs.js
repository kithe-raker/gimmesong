import React from "react";
import disc from "@assets/img/disc.svg";

function MySongs() {
  return (
    <div className="flex flex-col items-center min-h-screen max-w-md mx-auto">
      <div className="p-5 mt-5 bg-gray-500 w-full max-w-[300px]">ADS</div>
      <div className="flex items-center mt-6">
        <h1 className="gimmesong-primary-font text-4xl select-none cursor-pointer">
          NEW
        </h1>
        <span className="w-[1px] h-5 bg-gray-400 mx-6"></span>
        <h1 className="gimmesong-primary-font text-4xl select-none cursor-pointer">
          FAV
        </h1>
      </div>
      <img className="w-72 mt-6" src={disc} alt="disc" />
      <span className="gimmesong-secondary-font mt-6 text-lg text-center text-gray-700 leading-6">
        Give a song anonymous to <br />
        someone you&apos;re hiding.
        <br /> แมนชั่นเมจิคสตรอเบอรีไฮเปอร์ <br />
        สคริปต์หมายปองบร็อกโคลีต่อรอง
      </span>
      <div className="fixed bottom-0 p-5 bg-gray-500 w-full max-w-md">
        Player
      </div>
    </div>
  );
}

export default MySongs;
