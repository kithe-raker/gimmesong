import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loading({ fullScreen }) {
  return (
    <div
      className={`${
        fullScreen ? "fixed" : "absolute"
      } gimmesong-bg inset-0 z-[99] flex h-full w-full items-center justify-center`}
    >
      <ThreeDots
        height="60"
        width="60"
        radius="9"
        color="#8e79ff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
