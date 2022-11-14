import { useState, useEffect } from "react";

import NewReceived from "./components/NewReceived";
import AllReceived from "./components/AllReceived";

import Ads from "@lib/ads";

function MySongs() {
  const [currentPage, setCurrentPage] = useState("newReceived");
  const [pageLayout, setPageLayout] = useState("single");

  useEffect(() => {
    if (currentPage === "newReceived") setPageLayout("single");
    else if (currentPage === "allReceived") setPageLayout("multiple");
  }, [currentPage]);

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  let render = {
    newReceived: (
      <NewReceived layout={pageLayout} onLayoutChange={setPageLayout} />
    ),
    allReceived: (
      <AllReceived layout={pageLayout} onLayoutChange={setPageLayout} />
    ),
  };

  return (
    <div className="relative mx-auto flex max-h-screen max-w-md flex-col items-center overflow-hidden py-6 pt-[60px]">
      <div className="mt-[36px] flex w-full items-center justify-evenly px-4">
        <div></div>
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
            ALL
          </h1>
        </div>
        <div className="ml-4 inline-flex rounded-full" role="group">
          <button
            type="button"
            onClick={() => setPageLayout("single")}
            className={`rounded-l-full ${
              pageLayout === "single"
                ? "bg-black text-white"
                : "bg-white text-gray-500"
            } py-2 px-4 text-sm font-medium`}
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
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="2.75"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setPageLayout("multiple")}
            className={`rounded-r-full ${
              pageLayout === "multiple"
                ? "bg-black text-white"
                : "bg-white text-gray-500"
            } py-2 px-4 text-sm font-medium`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="4.5" stroke="currentColor" />
              <circle
                cx="5.00023"
                cy="5.00023"
                r="1.55882"
                stroke="currentColor"
              />
              <circle cx="17" cy="5" r="4.5" stroke="currentColor" />
              <circle
                cx="17.0002"
                cy="5.00023"
                r="1.55882"
                stroke="currentColor"
              />
              <circle cx="5" cy="17" r="4.5" stroke="currentColor" />
              <circle
                cx="5.00023"
                cy="17.0002"
                r="1.55882"
                stroke="currentColor"
              />
              <circle cx="17" cy="17" r="4.5" stroke="currentColor" />
              <circle
                cx="17.0002"
                cy="17.0002"
                r="1.55882"
                stroke="currentColor"
              />
            </svg>
          </button>
        </div>
        {/* <button
          className={`group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#86C7DF] to-[#CFB6D0] shadow-sm`}
        >
          <svg
            className={`text-white`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 2v6h6M21.5 22v-6h-6" />
            <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />
          </svg>
        </button> */}
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
