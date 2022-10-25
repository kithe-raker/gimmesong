import React from "react";
import PasteLink from "./components/PasteLink.js";
import OnSendComplete from "./components/OnComplete.js";

function Search() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-md mx-auto">
      <PasteLink />
      <div className="flex fixed bottom-10 w-full flex-col items-center">
        {/* <button className=" h-12 w-[250px] gimmesong-primary-font bg-black rounded-full text-white">
          NEXT
        </button> */}
      </div>
    </div>
  );
}

export default Search;
