import { useState, useEffect } from "react";
import disc from "@assets/img/gimmesong_logo.png";

import { useNavigate } from "react-router-dom";
import useSession from "@hooks/useSession";
import useScript from "@hooks/useScript";

import GimmesongAPI from "@lib/gimmesong_api";
import { accountingNum } from "@utils/number";

function Sent({ receiver }) {
  const navigate = useNavigate();
  const { user } = useSession();

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

  // Call Socialbar ads
  useScript(
    "//pl17917006.highperformancecpmgate.com/5f/07/e2/5f07e2967fa096ccf2eaeb77f517ab9b.js"
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-48 w-72 flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0]">
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
        Songs have been given{" "}
        {loading ? (
          <svg
            className="mx-1 inline h-3 w-3 animate-spin text-gray-500"
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
            style={{ fontFamily: "initial" }}
            className="mx-1 text-[0.95em]"
          >
            {accountingNum(count)}
          </span>
        )}{" "}
        times.
      </span>
      {!user?.username && (
        <button
          onClick={() => navigate("/")}
          className="mt-6 h-12 animate-bounce rounded-full bg-black px-6 text-white transition duration-150 ease-in-out hover:bg-gray-600"
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
