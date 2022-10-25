import React from "react";
import disc from "@assets/img/disc.svg";

function New() {
  return (
    <>
      <img className="w-72 mt-6" src={disc} alt="disc" />
      <span className="gimmesong-secondary-font mt-6 text-lg text-center text-gray-700 leading-6">
        Give a song anonymous to <br />
        someone you&apos;re hiding.
        <br /> แมนชั่นเมจิคสตรอเบอรีไฮเปอร์ <br />
        สคริปต์หมายปองบร็อกโคลีต่อรอง
      </span>
    </>
  );
}

export default New;
