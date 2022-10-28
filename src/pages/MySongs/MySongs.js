import { useState } from "react";

import NewReceived from "./components/NewReceived";
import AllReceived from "./components/AllReceived";

function MySongs() {
  const [currentPage, setCurrentPage] = useState("newReceived");

  let render = {
    newReceived: <NewReceived />,
    allReceived: <AllReceived />,
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col  items-center overflow-y-auto py-6">
      <div className="my-5 w-full max-w-[300px] bg-gray-300 p-5">ADS</div>
      <div className="flex items-center">
        <h1
          onClick={() => setCurrentPage("newReceived")}
          className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
            currentPage === "newReceived" && "text-gray-900"
          }`}
        >
          NEW
        </h1>
        <span className="mx-6 h-5 w-[1px] bg-gray-400"></span>
        <h1
          onClick={() => setCurrentPage("allReceived")}
          className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
            currentPage === "allReceived" && "text-gray-900"
          }`}
        >
          BOX
        </h1>
        <div className="ml-4 inline-flex rounded-full" role="group">
          <button
            type="button"
            className="rounded-l-full bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 "
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8.5"
                cy="8.5"
                r="7.75"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
                strokeWidth="1.5"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="2.75"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-r-full bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 "
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="5"
                cy="5"
                r="4.5"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
              <circle
                cx="5.00023"
                cy="5.00023"
                r="1.55882"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
              <circle
                cx="17"
                cy="5"
                r="4.5"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
              <circle
                cx="17.0002"
                cy="5.00023"
                r="1.55882"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
              <circle
                cx="5"
                cy="17"
                r="4.5"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
              <circle
                cx="5.00023"
                cy="17.0002"
                r="1.55882"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
              <circle
                cx="17"
                cy="17"
                r="4.5"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
              <circle
                cx="17.0002"
                cy="17.0002"
                r="1.55882"
                stroke="rgb(156 163 175 / var(--tw-text-opacity))"
              />
            </svg>
          </button>
        </div>
        {/* <button
          type="button"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-sm font-medium text-gray-500 hover:bg-gray-100"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="5"
              cy="5"
              r="4.5"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
            <circle
              cx="5.00023"
              cy="5.00023"
              r="1.55882"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
            <circle
              cx="17"
              cy="5"
              r="4.5"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
            <circle
              cx="17.0002"
              cy="5.00023"
              r="1.55882"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
            <circle
              cx="5"
              cy="17"
              r="4.5"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
            <circle
              cx="5.00023"
              cy="17.0002"
              r="1.55882"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
            <circle
              cx="17"
              cy="17"
              r="4.5"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
            <circle
              cx="17.0002"
              cy="17.0002"
              r="1.55882"
              stroke="rgb(156 163 175 / var(--tw-text-opacity))"
            />
          </svg>
        </button> */}
      </div>
      {render[currentPage]}
    </div>
  );
}

export default MySongs;
