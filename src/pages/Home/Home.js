import React from "react";
import disc from "@assets/img/gimmesong_logo.png";

function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6">
      <span className="gimmesong-primary-font">
        Songs have been given 123,568 times.
      </span>
      <img className="mt-6 w-72" src={disc} alt="disc" />
      <h1 className="gimmesong-primary-font mt-6 text-5xl">GIMMESONG</h1>
      <span className="gimmesong-primary-font mt-3 text-center text-lg leading-6 text-gray-400">
        Give a song anonymous to <br />
        someone you&apos;re hiding.
      </span>
      <button className="mt-12 flex h-12 w-[250px] items-center justify-center rounded-full bg-black font-bold text-white hover:opacity-70">
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
