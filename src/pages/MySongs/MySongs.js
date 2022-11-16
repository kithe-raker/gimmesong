import { useState, useEffect } from "react";

import ReceivedSongs from "./components/ReceivedSongs";

import Ads from "@lib/ads";

function MySongs() {
  const [currentTab, setCurrentTab] = useState("new");
  const [pageLayout, setPageLayout] = useState("single");

  useEffect(() => {
    if (currentTab === "new") setPageLayout("single");
    else if (currentTab === "all") setPageLayout("multiple");
  }, [currentTab]);

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  return (
    <div className="relative mx-auto flex max-h-screen max-w-md flex-col items-center overflow-hidden py-6 pt-[60px]">
      <div className="mt-[36px] flex w-full items-center justify-evenly px-4">
        <div></div>
        <div className="flex items-center">
          <h1
            onClick={() => setCurrentTab("new")}
            className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
              currentTab === "new" && "text-gray-900"
            }`}
          >
            NEW
          </h1>
          <span className="mx-6 h-5 w-[1px] bg-gray-400"></span>
          <h1
            onClick={() => setCurrentTab("all")}
            className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
              currentTab === "all" && "text-gray-900"
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
      </div>
      <ReceivedSongs
        tab={currentTab}
        layout={pageLayout}
        onLayoutChange={setPageLayout}
      />
    </div>
  );
}

export default MySongs;
