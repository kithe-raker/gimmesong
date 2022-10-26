import React from "react";
import GetLink from "./GetLink";

function EmptySong() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col items-center justify-center ">
        <span className="gimmesong-secondary-font">
          Oops, it seems like no one sent you songs.
        </span>
        <span className="mb-6 gimmesong-secondary-font">
          Let’s start with sharing the link with someone.
        </span>
      </div>
      <GetLink />
    </div>
  );
}

export default EmptySong;
