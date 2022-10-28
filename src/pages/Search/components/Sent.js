import React from "react";
import bg from "@assets/img/gimmesong_gradient_bg.png";
import disc from "@assets/img/gimmesong_logo.png";

function Sent({ next }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-48 w-72 flex-col items-center justify-center overflow-hidden rounded-3xl">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={bg}
          alt="Congrats"
        />
        <div className="absolute flex w-64 flex-col items-center">
          <h1 className="gimmesong-primary-font mb-[5px] text-3xl text-white">
            Congratulation!
          </h1>
          <span className="mb-[14px] text-xs text-white">
            Your song already given!
          </span>
          <img className="h-[71px]" src={disc} alt="disc" />
        </div>
      </div>
      <span className="gimmesong-primary-font mt-4 text-sm">
        Songs have been given 123,456 times.
      </span>
      <button className="gimmesong-primary-font mt-6 h-12 w-[250px] rounded-full bg-black text-white">
        Get your own anonymous song!
      </button>
    </div>
  );
}

export default Sent;
