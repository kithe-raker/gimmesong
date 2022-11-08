import { useState, useEffect } from "react";
// import menu1 from "@assets/img/menu1.svg";
// import menu2 from "@assets/img/menu2.svg";
import logo from "@assets/img/gimmesong_logo.png";

import GetLink from "@components/GetLink";

import { useNavigate } from "react-router-dom";

import GimmesongAPI from "@lib/gimmesong_api";
import { Button } from "@chakra-ui/react";

import useScript from "@hooks/useScript";

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

  // Call Socialbar ads
  // useScript(
  //   "//pl17917006.highperformancecpmgate.com/5f/07/e2/5f07e2967fa096ccf2eaeb77f517ab9b.js"
  // );

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
      <div className="mt-8 flex flex-col items-center">
        <span className="font-light text-gray-400">Feedback us</span>
        <a
          href="https://www.instagram.com/gimmesong_official"
          className="mt-2 flex h-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-5 font-medium text-gray-800 hover:bg-gray-100"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="mr-2 h-4 w-4 text-gray-800"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
          </svg>
          gimmesong_official
        </a>
      </div>
    </div>
  );
}

export default Menu;
