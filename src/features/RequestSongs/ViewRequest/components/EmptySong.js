import React from "react";
import GetLink from "@components/GetLink";

function EmptySong({ message = "" }) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <div className="mb-6 flex flex-col items-center justify-center">
        <span className="gimmesong-primary-font text-md text-center">
          {message}
        </span>
        <span className="gimmesong-primary-font text-md text-center">
          Let's start sharing the link with someone.
        </span>
      </div>
    </div>
  );
}

export default EmptySong;
