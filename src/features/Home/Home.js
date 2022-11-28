import { useState, useEffect } from "react";
import disc from "@assets/img/gimmesong_logo.png";
import meme_icon from "@assets/img/meme_emoji.png";
import confuse_icon from "@assets/img/confuse_emoji.png";
import SignInMethod from "@components/SignInMethod";

import { useNavigate } from "react-router-dom";

import GimmesongAPI from "@lib/gimmesong_api";

import { accountingNum } from "@utils/number";

import ConnectWithUs from "@components/ConnectWithUs";

function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [] = useState(false);

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
      <span className="gimmesong-primary-font">
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
      <img className="mt-6 w-60" src={disc} alt="disc" />
      <h1 className="gimmesong-primary-font mt-6 text-5xl">GIMMESONG</h1>
      <span className="gimmesong-primary-font mt-3 text-center text-lg leading-6 text-gray-400">
        Give a song anonymously to <br />
        someone you&apos;re hiding.
      </span>
      <SignInMethod className="mt-12" />

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
      <ConnectWithUs className="mt-12" />
      <span className="text-xxs mt-4 text-black">
        by continue you already accept our{" "}
        <a href="#" className="underline">
          Term & Policy
        </a>
      </span>
    </div>
  );
}

export default Home;
