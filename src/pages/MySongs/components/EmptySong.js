import React from "react";
import GetLink from "@components/GetLink";

function EmptySong({ message }) {
  return (
    <div className="mt-6 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <span className="gimmesong-primary-font text-lg text-center">
          {message}
        </span>
        <span className="gimmesong-primary-font text-lg text-center">
          Let's start sharing the link with someone.
        </span>
      </div>
      <GetLink />
    </div>
  );
}

export default EmptySong;
