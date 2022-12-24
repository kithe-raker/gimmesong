import { useEffect, useRef, useContext, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { FeedContext } from "contexts/FeedContext";
import Dropdown from "@components/Dropdown";

function Top() {
  const navigate = useNavigate();

  const {
    data: { club, items, filter },
    action: { changeFilter, fetchContent },
  } = useContext(FeedContext);

  const { state } = useLocation();

  if (!club.title) {
    //TODO: user probably enter the url directly, so the emoji and title is not passed from parent, fetch it from location.pathname?
  }

  const [selectedOption, setSelectedOption] = useState(0);
  const options = ["Trend", "Newest", "Popular"];
  // TODO: use appropriate filter for each dropdown options.
  const optionFilter = ["most_play", "newest", "most_play"];

  const optionChanged = (index) => {
    changeFilter(optionFilter[index]);
    setSelectedOption(index);
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
    <div className="gimmesong-bg sticky top-[108px] z-50 pt-2 flex w-full flex-row justify-between px-2 pb-3">
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
        selectedOption={selectedOption}
        onOptionSelected={optionChanged}
        className="w-1/3"
        contentClassName="border border-black/[0.05] gimmesong-bg"
      />
    </div>
  );
}

export default Top;
