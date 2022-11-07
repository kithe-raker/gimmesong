import { useState, useEffect } from "react";
// import menu1 from "@assets/img/menu1.svg";
// import menu2 from "@assets/img/menu2.svg";
import logo from "@assets/img/gimmesong_logo.png";

import GetLink from "@components/GetLink";

import { useNavigate } from "react-router-dom";

import GimmesongAPI from "@lib/gimmesong_api";

function Menu() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getTotalSentSong = async () => {
      setLoading(true);
      try {
        const value = await GimmesongAPI.getTotalSongSent();
        setCount(value);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTotalSentSong();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <div className="my-2 flex items-center justify-center">
        <img
          className="mr-2 h-[46px] w-[46px] shrink-0"
          src={logo}
          alt="disc"
        />
        <h1 className="gimmesong-primary-font text-5xl">GIMMESONG</h1>{" "}
      </div>
      <span className="gimmesong-primary-font mb-6">
        Songs have been given{" "}
        {loading ? (
          <svg
            className="mx-1 inline h-4 w-4 animate-spin text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          count
        )}{" "}
        times.
      </span>
      <GetLink />
      <div className="mt-6 flex w-72 items-center justify-between rounded-full bg-black p-3 pl-8">
        <span className="text-white">Give someone a song</span>
        <button
          onClick={() => navigate("/search")}
          className="group inline-flex h-[42px] w-[42px] animate-bounce-a-bit items-center justify-center rounded-full bg-white bg-gradient-to-r text-gray-600 transition duration-150 ease-in-out hover:from-[#86C7DF] hover:to-[#CFB6D0] "
        >
          <svg
            className="h-4 w-4 text-gray-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h13M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {/* <div
        onClick={() => navigate("/mysongs")}
        className="relative mt-6 h-64 w-64 cursor-pointer"
      >
        <img className="absolute w-fit" src={menu1} alt="my songs" />
        <div className="absolute top-3 right-3 flex items-center">
          <span className="gimmesong-primary-font">my songs</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div> */}
      {/* <div
        onClick={() => navigate("/search")}
        className="relative mt-7 h-64 w-72 cursor-pointer"
      >
        <img className="absolute w-full" src={menu2} alt="give a song" />
        <div className="absolute top-3 right-3 flex items-center">
          <span className="gimmesong-primary-font text-white">send song</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div> */}
    </div>
  );
}

export default Menu;
