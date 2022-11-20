import { useState, useEffect } from "react";

function ViewRequest() {
  const [pageLayout, setPageLayout] = useState("single");

  return (
    <div className="relative mx-auto flex max-w-md flex-col items-center py-6 pt-[60px]">
      <div className="mx-6 h-full w-full">
        <div className="flex justify-between">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="flex h-9 ">
            <button className="mr-2 flex items-center rounded-full border border-black px-3 py-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span className="gimmesong-secondary-font ml-1">Share</span>
            </button>
            <button className="flex items-center rounded-full border border-black px-3 py-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="gimmesong-secondary-font ml-1">Songs</span>
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center">
          <span className="gimmesong-secondary-font text-center text-xl font-semibold">
            Anonymous
          </span>
          <span className="gimmesong-secondary-font text-center text-xl">
            K-POP ที่อยากเต้น cover มากที่สุด
          </span>
          <div className="mt-8 flex justify-center">
            <div
              className="inline-flex rounded-xl border border-black"
              role="group"
            >
              <button
                type="button"
                onClick={() => setPageLayout("single")}
                className={`rounded-l-xl ${
                  pageLayout === "single"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } py-2 px-4 text-sm font-medium`}
              >
                <div className="flex items-center">
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
                    : "bg-white text-black"
                } py-2 px-4 text-sm font-medium`}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                  >
                    <rect width="3" height="3" rx="1.5" fill="currentColor" />
                    <rect
                      y="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      y="12"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
                    <rect
                      x="6"
                      width="3"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    />
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
                  <span className="gimmesong-secondary-font ml-2 text-base">
                    Grid
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ViewRequest;
