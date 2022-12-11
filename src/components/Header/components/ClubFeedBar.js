import { useEffect, useRef, useContext } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { FeedContext } from "contexts/FeedContext";

function ClubFeedBar() {
  const navigate = useNavigate();

  const {
    data: { club },
  } = useContext(FeedContext);

  return (
    <div className="mt-2 mb-4 flex flex-row justify-between px-2">
      <div className="flex flex-row">
        <button
          onClick={() => navigate(-1)}
          className="group flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-black hover:bg-gray-100"
        >
          <svg
            className="text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="ml-5 flex flex-row items-center justify-center rounded-3xl bg-white px-3 py-2">
          <img
            className="mr-2 h-[17px] w-[17px]"
            src={club.emoji}
            alt="emoji"
          />
          <span className="gimmesong-secondary-font">{club.title}</span>
        </div>
      </div>

      
    </div>
  );
}

export default ClubFeedBar;
