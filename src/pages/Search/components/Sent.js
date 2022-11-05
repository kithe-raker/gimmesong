import React from "react";
// import bg from "@assets/img/gimmesong_gradient_bg.png";
import disc from "@assets/img/gimmesong_logo.png";

import { useNavigate } from "react-router-dom";
import useSession from "@hooks/useSession";

function Sent({ receiver }) {
  const navigate = useNavigate();
  const { user } = useSession();

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-48 w-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0]">
        {/* <img
          className="absolute inset-0 h-full w-full object-cover"
          src={bg}
          alt="Congrats"
        /> */}
        <div className="absolute flex w-64 flex-col items-center">
          <h1 className="gimmesong-primary-font mb-[5px] text-3xl text-white">
            Congratulation!
          </h1>
          <span className="mb-[14px] text-xs text-white">
            Your song already given!
          </span>
          <img className="h-[71px]" src={disc} alt="disc" />
        </div>
      </div>
      <span className="gimmesong-primary-font mt-4 text-sm">
        Songs have been given 123,456 times.
      </span>
      {!user?.username && (
        <button
          onClick={() => navigate("/")}
          className="mt-6 h-12 rounded-full bg-black px-6 text-white transition duration-150 ease-in-out hover:bg-gray-600"
        >
          Get your own anonymous song!
        </button>
      )}
      <a
        href={`/@${receiver}`}
        className="mt-3 cursor-pointer text-gray-500 underline"
      >
        Send another song
      </a>
    </div>
  );
}

export default Sent;
