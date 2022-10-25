import React from "react";
import bg from "@assets/img/sendComplete_bg.png";
import Disc from "@assets/img/disc.svg";

function OnSendComplete() {
  return (
    <div>
      <div className="container">
        <div className="column-1 flex w-full items-center justify-center">
          <img className="absolute" src={bg} alt="Congrate" />
          <div className="absolute flex w-64 flex-col items-center">
            <h1 className="gimmesong-primary-font text-white text-3xl mb-[5px]">
              Congratulation
            </h1>
            <span className="text-white text-xs mb-[14px]">
              Your song already given!
            </span>
            <img className="h-[71px]" src={Disc} alt="disc" />
          </div>
        </div>
      </div>
      <span className="container">Songs have been given 123,456 times.</span>
    </div>
  );
}

export default OnSendComplete;
