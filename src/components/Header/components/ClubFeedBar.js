import { useEffect, useRef, useContext } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { FeedContext } from "contexts/FeedContext";
import Dropdown from "@components/Dropdown";

function ClubFeedBar() {
  const navigate = useNavigate();

  const {
    data: { club, items, filter },
    action: { changeFilter, fetchContent },
  } = useContext(FeedContext);

  const { state } = useLocation();

  if (!club.title) {
    //TODO: user probably enter the url directly, so the emoji and title is not passed from parent, fetch it from location.pathname?
  }

  const options = ["Trend", "Newest", "Popular"];

  // TODO: use appropriate filter for each dropdown options.
  const optionFilter = {
    Newest: "newest",
    Popular: "most_play",
    Trend: "most_play",
  };

  /**
   * @dev To prevents the user's scroll from being reset.
   * before run this effect, we need to make sure that feed items is empty and navigate state.reload is true
   * remember, only thing to make the state.reload true, user need to navigate by pressing menu from the navbar.
   */
  useEffect(() => {
    if (items.length > 0 && !state?.reload) return;
    fetchContent({ loading: true, reset: true, filter });
  }, [state]);

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

      <Dropdown
        arrow
        options={options}
        onOptionSelected={(option) => changeFilter(optionFilter[option])}
        className="w-1/3"
        contentClassName="border border-black/[0.05] gimmesong-bg"
      />
    </div>
  );
}

export default ClubFeedBar;
