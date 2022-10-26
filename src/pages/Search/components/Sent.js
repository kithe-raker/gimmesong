import React from "react";
import bg from "@assets/img/gimmesong_gradient_bg.png";
import disc from "@assets/img/gimmesong_logo.png";

function Sent({ next }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-48 w-72 flex flex-col items-center justify-center overflow-hidden rounded-3xl">
        <img
          className="absolute h-full w-full inset-0 object-cover"
          src={bg}
          alt="Congrats"
        />
        <div className="absolute flex w-64 flex-col items-center">
          <h1 className="gimmesong-primary-font text-white text-3xl mb-[5px]">
            Congratulation!
          </h1>
          <span className="text-white text-xs mb-[14px]">
            Your song already given!
          </span>
          <img className="h-[71px]" src={disc} alt="disc" />
        </div>
      </div>
      <span className="gimmesong-primary-font mt-4 text-sm">
        Songs have been given 123,456 times.
      </span>
      <button className="mt-6 h-12 w-[250px] gimmesong-primary-font bg-black rounded-full text-white">
        Get your own anonymous song!
      </button>
    </div>
  );
}

export default Sent;
