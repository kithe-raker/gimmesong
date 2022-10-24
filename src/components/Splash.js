import disc from "@assets/img/disc.svg";
import React from "react";

function Splash() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <img className="w-60" src={disc} alt="disc" />
    </div>
  );
}

export default Splash;
