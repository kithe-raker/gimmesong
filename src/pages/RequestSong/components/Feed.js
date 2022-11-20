import React from "react";
import AddRequest from "@assets/img/add_request.png";

function feed() {
  return (
    <div className=" relative mx-6 w-full">
      <div>
        <div className=" flex items-center justify-between">
          <span className="gimmesong-secondary-font text-4xl font-bold">
            📣 Songs Request
          </span>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AEAEAE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>{" "}
          </button>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex ">
            <div className="mr-3 rounded-full border bg-black py-1">
              <span className="gimmesong-secondary-font mx-3 my-4 text-xs font-semibold text-white">
                Most play
              </span>
            </div>
            <div className="mr-3 rounded-full border py-1">
              <span className="gimmesong-secondary-font mx-3 my-6 text-xs font-semibold">
                Newest
              </span>
            </div>
            <div className="mr-3 rounded-full border py-1">
              <span className="gimmesong-secondary-font mx-3 my-6 text-xs font-semibold">
                My Request
              </span>
            </div>
          </div>
          <button>th</button>
        </div>
      </div>

      {/* <div className="bottom-0">
        <img src={AddRequest} />
      </div> */}
    </div>
  );
}

export default feed;
