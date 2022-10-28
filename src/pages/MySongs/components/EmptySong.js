import React from "react";
import GetLink from "@components/GetLink";

function EmptySong({ message }) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <div className="mb-6 flex flex-col items-center justify-center">
        <span className="gimmesong-primary-font text-center text-lg">
          {message}
        </span>
        <span className="gimmesong-primary-font text-center text-lg">
          Let's start sharing the link with someone.
        </span>
      </div>
      <GetLink />
    </div>
  );
}

export default EmptySong;
