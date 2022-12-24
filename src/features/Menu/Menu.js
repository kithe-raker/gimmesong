import { useState, useEffect, useContext } from "react";

import GetLink from "@components/GetLink";
import ConnectWithUs from "@components/ConnectWithUs";

import { useNavigate } from "react-router-dom";

import GimmesongAPI from "@lib/gimmesong_api";
import { accountingNum } from "@utils/number";

import meme_icon from "@assets/img/meme_emoji.png";
import confuse_icon from "@assets/img/confuse_emoji.png";
import { ThemeContext } from "contexts/ThemeContext";

function Menu() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const { logo } = useContext(ThemeContext);

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
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-[60px] pt-[80px]">
      <div className="my-2 flex items-center justify-center">
        <img className="mr-2 w-[46px] shrink-0" src={logo} alt="disc" />
        <h1 className="gimmesong-primary-font mt-4 text-5xl">GIMMESONG</h1>
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
          <span
            style={{ fontFamily: "serif" }}
            className="mx-[0.1rem] text-[0.95em]"
          >
            {accountingNum(count)}
          </span>
        )}{" "}
        times.
      </span>
      <GetLink />
      <div className="mt-6 flex w-72 items-center justify-between rounded-full bg-black p-3 pl-8">
        <span className="text-white">Give someone a song</span>
        <button
          onClick={() => navigate("/search")}
          className="group inline-flex h-[42px] w-[42px] animate-bounce-a-bit items-center justify-center rounded-full bg-gradient-to-r from-[#86C7DF] to-[#CFB6D0] transition duration-150 ease-in-out"
        >
          <svg
            className="h-4 w-4 text-white group-hover:text-white"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.379,19.1403 L12.108,12.5993 L19.467,5.2413 L15.379,19.1403 Z M4.86,8.6213 L18.76,4.5343 L11.401,11.8923 L4.86,8.6213 Z M3.359,8.0213 C2.923,8.1493 2.87,8.7443 3.276,8.9483 L11.128,12.8733 L15.053,20.7243 C15.256,21.1303 15.852,21.0773 15.98,20.6413 L20.98,3.6413 C21.091,3.2623 20.739,2.9093 20.359,3.0213 L3.359,8.0213 Z"
            />
          </svg>
        </button>
      </div>
      <div className="mt-4 flex">
        <a
          className="mr-3 flex items-center rounded-full border px-5 py-2"
          href="https://twitter.com/gimmesong_link/status/1594650998412566528"
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-[18px] w-[18px]" src={meme_icon} alt="" />
          <span className="ml-1 font-semibold">MEME</span>
        </a>
        <button
          className="flex items-center rounded-full border px-5 py-2"
          onClick={() => navigate("/tutorial")}
        >
          <img className="h-[18px]" src={confuse_icon} alt="" />
          <span className="ml-1 font-semibold">How to play</span>
        </button>
      </div>
      <ConnectWithUs direction="flex-row" className="mt-6" />
    </div>
  );
}

export default Menu;
