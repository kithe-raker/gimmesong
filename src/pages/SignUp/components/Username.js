import React from "react";

function Username() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="gimmesong-primary-font text-gray-600 text-xl ">
        Lorem Lorem Lorem Lorem
      </span>
      <div className="relative w-[250px] mt-4">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="text-gray-500 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <input
          type="text"
          className="block h-12 w-[250px] pl-10 pr-12 w-full text-gray-900 bg-white rounded-full focus:outline-gray-500"
          placeholder="@yourname"
          required
        />
      </div>
      <button className="mt-5 h-12 w-[250px] gimmesong-primary-font bg-black hover:opacity-70 rounded-full text-white">
        Let's go
      </button>
    </div>
  );
}

export default Username;
