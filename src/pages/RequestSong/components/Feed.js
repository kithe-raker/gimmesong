import React from "react";
import AddRequest from "@assets/img/add_request.png";
import Help from "@assets/img/help_icon.png";

function feed() {
  return (
    <div className=" relative mx-6 w-full">
      <div>
        <div className=" flex items-center justify-between">
          <span className="gimmesong-secondary-font text-4xl font-bold">
            📣 Songs Request
          </span>
          <button className="">
            <img className="h-6" src={Help} />
          </button>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex ">
            <div className="rounded-full border mr-3 py-1 bg-black">
              <span className="gimmesong-secondary-font mx-3 my-4 text-xs font-semibold text-white">
                Most play
              </span>
            </div>
            <div className="rounded-full border mr-3 py-1">
              <span className="gimmesong-secondary-font mx-3 my-6 text-xs font-semibold">
                Newest
              </span>
            </div>
            <div className="rounded-full border mr-3 py-1">
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
