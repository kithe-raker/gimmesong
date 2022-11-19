import { useState, useEffect } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import useSession from "@hooks/useSession";

import ReceivedSongs from "./components/ReceivedSongs";

import Ads from "@lib/ads";
import toast from "react-hot-toast";

function MySongs() {
  const [currentTab, setCurrentTab] = useState("new");
  const [pageLayout, setPageLayout] = useState("single");

  const { user } = useSession();
  const [value, copy] = useCopyToClipboard();

  const copyToClipboard = (val) => {
    copy(val);
    toast("Copied!", {
      style: {
        borderRadius: "25px",
        background: "#000",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (currentTab === "new") setPageLayout("single");
    else if (currentTab === "all") setPageLayout("multiple");
  }, [currentTab]);

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  return (
<<<<<<< Updated upstream
    <div className="relative mx-auto flex max-w-md flex-col items-center py-6 pt-[60px]">
      <div className="gimmesong-bg sticky top-[60px] z-[49] mt-[36px] flex w-full items-center justify-evenly p-4">
        <div></div>
        <div className="flex items-center">
          <h1
            onClick={() => setCurrentTab("new")}
            className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
              currentTab === "new" && "text-gray-900"
            }`}
=======
    <div className="relative mx-auto flex max-h-screen max-w-md flex-col items-center overflow-hidden py-6 pt-[60px]">
      <button
        className="flex items-center rounded-full bg-gray-100 px-2 py-2"
        onClick={() =>
          copyToClipboard(`https://gimmesong.link/@${user.username}`)
        }
      >
        <div className="w-25 h-25 rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
>>>>>>> Stashed changes
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>
        <span className="ml-1 gimmesong-secondary-foont text-xs">@bosoji</span>
      </button>
      <div className="flex w-full items-center justify-evenly px-4 pt-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center ">
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
          <div className="mt-8 inline-flex rounded-full" role="group">
            <button
              type="button"
              onClick={() => setPageLayout("single")}
              className={`rounded-l-xl ${
                pageLayout === "single"
                  ? "bg-black text-white"
                  : "bg-white text-gray-500"
              } py-2 px-4 text-sm font-medium`}
            >
              <div className="flex items-center">
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
                <span className="gimmesong-secondary-font ml-2 text-base">
                  Full
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPageLayout("multiple")}
              className={`rounded-r-xl ${
                pageLayout === "multiple"
                  ? "bg-black text-white"
                  : "bg-white text-gray-500"
              } py-2 px-4 text-sm font-medium`}
            >
              <div className="flex items-center">
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
                <span className="gimmesong-secondary-font ml-2 text-base">
                  Grid
                </span>
              </div>
            </button>
          </div>
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
