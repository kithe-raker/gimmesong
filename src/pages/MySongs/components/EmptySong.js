import React from "react";
import GetLink from "./GetLink";

function EmptySong() {
  return (
    <div className="mt-6 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <span className="gimmesong-primary-font text-lg">
          Oops, it seems like no one sent you songs.
        </span>
        <span className="gimmesong-primary-font text-lg">
          Let's start sharing the link with someone.
        </span>
      </div>
      <GetLink />
    </div>
  );
}

export default EmptySong;
