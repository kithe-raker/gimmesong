import { useContext, useEffect, useState } from "react";

import GimmesongAPI from "@lib/gimmesong_api";

import Slider from "./component/Slider";
import { DiscListContext } from "contexts/DiscListContext";

/**
 * A component that display a list of all discs that the user own. Also has ability to highlight 1 disc (to mark as selected). This component uses data from DiscListContext (including fetchDiscs action, and discs data).
 * @param selectedDisc an index number of an disc (of discs data in DiscListContext) that will be highlighted (have gradient borders). The component will not highlight any discs if it is undefined.
 * @param setSelectedDisc a callback function to be called when the user click a specific disc. it will be passed an index of an disc in DiscListContext disc data.
 * @returns
 */
function DiscList({
  selectedDisc,
  setSelectedDisc,
  className = "",
  perView = 3,
}) {
  const {
    state: { isLoading },
    data: { discs },
    action: { fetchDiscs },
  } = useContext(DiscListContext);

  useEffect(() => {
    fetchDiscs();
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {isLoading && (
        <div className="my-12 flex items-center justify-center">
          <svg
            className="h-8 w-8 animate-spin text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {isLoading || (
        <Slider
          discs={discs}
          selectedDisc={selectedDisc}
          setSelectedDisc={setSelectedDisc}
          perView={perView}
        />
      )}
    </div>
  );
}

export default DiscList;
