import { useState, useEffect } from "react";
import disc from "@assets/img/gimmesong_logo.png";

import { signInWithGoogle } from "@lib/firebase";
import GimmesongAPI from "@lib/gimmesong_api";

function Home() {
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
          count
        )}{" "}
        times.
      </span>
      <img className="mt-6 w-60" src={disc} alt="disc" />
      <h1 className="gimmesong-primary-font mt-6 text-5xl">GIMMESONG</h1>
      <span className="gimmesong-primary-font mt-3 text-center text-lg leading-6 text-gray-400">
        Give a song anonymously to <br />
        someone you&apos;re hiding.
      </span>
      <button
        onClick={signInWithGoogle}
        className="mt-12 flex h-12 w-[250px] items-center justify-center rounded-full bg-black font-bold text-white transition duration-150 ease-in-out hover:bg-gray-600"
      >
        <svg
          className="mr-3 h-4 w-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        <span>Continue with Google</span>
      </button>

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
