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
    <div
      className={`relative mx-auto flex ${
        pageLayout === "single" ? "h-full" : "min-h-full"
      } max-w-md flex-col items-center py-6 pt-[60px]`}
    >
      {/* <button
        className="flex items-center rounded-full bg-gray-100 px-2 py-2"
        onClick={() =>
          copyToClipboard(`https://gimmesong.link/@${user.username}`)
        }
      >
        <div className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>
        <span className="gimmesong-secondary-foont ml-1 text-xs">@bosoji</span>
      </button> */}

      <div className="gimmesong-bg sticky top-[60px] z-[49] flex w-full items-center justify-evenly p-3 pt-6">
        <div className="flex items-center">
          <h1
            onClick={() => setCurrentTab("new")}
            className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
              currentTab === "new" && "text-gray-900"
            }`}
          >
            NEW
          </h1>
          <span className="mx-4 h-5 w-[1px] bg-gray-400"></span>
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
            className={`rounded-l-xl ${
              pageLayout === "single"
                ? "bg-black text-white"
                : "bg-white text-black"
            } h-[10] min-w-[56px] py-2 px-4 text-sm font-medium`}
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="13"
                viewBox="0 0 23 13"
                fill="none"
              >
                <rect
                  x="5"
                  width="13"
                  height="13"
                  rx="6.5"
                  fill="currentColor"
                />
                <path
                  d="M0 4H0.5C1.88071 4 3 5.11929 3 6.5C3 7.88071 1.88071 9 0.5 9H0V4Z"
                  fill="currentColor"
                />
                <path
                  d="M23 9H22.5C21.1193 9 20 7.88071 20 6.5C20 5.11929 21.1193 4 22.5 4H23V9Z"
                  fill="currentColor"
                />
              </svg>
              <span className="gimmesong-secondary-font ml-2 text-sm">
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
                : "bg-white text-black"
            } h-10 min-w-[56px] py-2 px-4 text-sm font-medium`}
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
              >
                <rect width="3" height="3" rx="1.5" fill="currentColor" />
                <rect y="6" width="3" height="3" rx="1.5" fill="currentColor" />
                <rect
                  y="12"
                  width="3"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                />
                <rect x="6" width="3" height="3" rx="1.5" fill="currentColor" />
                <rect
                  x="6"
                  y="6"
                  width="3"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                />
                <rect
                  x="6"
                  y="12"
                  width="3"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                />
              </svg>
              <span className="gimmesong-secondary-font ml-2 text-sm">
                Grid
              </span>
            </div>
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
