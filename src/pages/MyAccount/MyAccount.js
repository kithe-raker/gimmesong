import { useState } from "react";
import GetLink from "@components/GetLink";

import { signOut } from "@lib/firebase";

function MyAccount() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <div className="my-4 w-full max-w-[300px] bg-gray-300 p-5">ADS</div>
      <GetLink />
      <button
        onClick={signOut}
        className="mt-6 inline-flex h-12 items-center rounded-full bg-black px-6 text-white transition duration-150 ease-in-out hover:bg-gray-600"
      >
        <svg
          className="mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
        </svg>
        Sign out
      </button>
    </div>
  );
}

export default MyAccount;
