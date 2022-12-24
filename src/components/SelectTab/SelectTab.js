import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * A template tab to be passed to SelectTab component. Switch between club and my songs page.
 */
export const ClubAndMySongsTabs = [
  {
    label: "Club",
    navigateTo: "/club",
  },
  {
    label: "My Songs",
    navigateTo: "/mysongs",
  },
];

/**
 * A group of button to select between multiple tabs. Will route the user to each specific tabs. This component will stick to the page right below the header component.
 * @param tabs a list of tabs to be rendered. must in shape of [{label: "label1", navigateTo: "/route1"}, {label: "label2", navigateTo: "route2"}, ...] Each tab will show its label and on clicked, will navigate to that route. This will also highlight a selected tab as a tab whose navigateTo is the beginning of the current url path (in other words, location.pathname.startsWith(tab.navigateTo)).
 * @returns
 */
function SelectTab({ tabs }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="gimmesong-bg sticky top-[52px] z-50 w-full max-w-md">
      <div className="mb-2 flex flex-row items-center justify-center font-bold">
        {tabs.map((item, i) => (
          <button
            key={i}
            className={`flex flex-1 items-center justify-center rounded-2xl p-3 transition duration-150 ease-in-out ${
              location.pathname.startsWith(item.navigateTo)
                ? "bg-black text-white shadow-lg hover:bg-gray-600"
                : "text-black hover:bg-gray-300"
            }`}
            onClick={() => navigate(item.navigateTo)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectTab;
