import { useState } from "react";
import PasteLink from "./components/PasteLink.js";
import Sent from "./components/Sent.js";
import SearchSong from "./components/SearchSong.js";
import Send from "./components/Send.js";

function Search() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-md mx-auto py-6">
      <div className="p-5 my-5 bg-gray-300 w-full max-w-[300px]">ADS</div>
      <Send />
      <div className="flex fixed bottom-10 w-full flex-col items-center">
        {/* <button className=" h-12 w-[250px] gimmesong-primary-font bg-black rounded-full text-white">
          NEXT
        </button> */}
      </div>
    </div>
  );
}

export default Search;
