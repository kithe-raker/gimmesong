import { useState, useContext, useEffect } from "react";

import { PlaylistContext } from "contexts/PlaylistContext";
import Dropdown from "@components/Dropdown";

function SelectPageLayout({ setPageLayout, pageLayout }) {
  const single = (
    <div className="flex w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="13"
        viewBox="0 0 23 13"
        fill="white"
      >
        <rect x="5" width="13" height="13" rx="6.5" fill="white" />
        <path
          d="M0 4H0.5C1.88071 4 3 5.11929 3 6.5C3 7.88071 1.88071 9 0.5 9H0V4Z"
          fill="white"
        />
        <path
          d="M23 9H22.5C21.1193 9 20 7.88071 20 6.5C20 5.11929 21.1193 4 22.5 4H23V9Z"
          fill="white"
        />
      </svg>
      <span className="gimmesong-secondary-font ml-3 text-sm text-white">
        Full
      </span>
    </div>
  );

  const multiple = (
    <div className="flex w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="white"
      >
        <rect width="3" height="3" rx="1.5" fill="white" />
        <rect y="6" width="3" height="3" rx="1.5" fill="white" />
        <rect y="12" width="3" height="3" rx="1.5" fill="white" />
        <rect x="6" width="3" height="3" rx="1.5" fill="white" />
        <rect x="6" y="6" width="3" height="3" rx="1.5" fill="white" />
        <rect x="6" y="12" width="3" height="3" rx="1.5" fill="white" />
      </svg>
      <span className="gimmesong-secondary-font ml-3 text-sm text-white">
        Grid
      </span>
    </div>
  );

  const options = [
    { value: "single", component: single },
    { value: "multiple", component: multiple },
  ];

  const selectedOption = pageLayout === "single" ? 0 : 1;

  return (
    <Dropdown
      options={options}
      selectedOption={selectedOption}
      onOptionSelected={(index) => setPageLayout(options[index].value)}
      hideSelectedOption
      className="h-full w-24"
      contentClassName="rounded-lg bg-black py-1"
    />
  );
}

export default SelectPageLayout;
