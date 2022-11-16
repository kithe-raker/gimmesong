import React from "react";

function OnFailed() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <span className=" text-9xl">😕</span>
      <span className=" gimmesong-primary-font mt-9 text-4xl">Failed</span>
      <p className=" gimmesong-secondary-font mx-[62px] mt-2 text-center text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button className=" mt-9">
        <div className="flex w-44 h-11 items-center justify-center rounded-full bg-black text-white">
          <span className="text-base">Try Again</span>
        </div>
      </button>
    </div>
  );
}

export default OnFailed;
