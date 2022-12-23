import { useNavigate, useLocation } from "react-router-dom";

import logo from "@assets/img/gimmesong_logo.png";
import ClubFeedBar from "./ClubFeedBar";

function OnMainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isClubFeed =
    location.pathname.startsWith("/club") &&
    location.pathname.length > "/club".length;

  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="flex flex-row items-center justify-between">
        <span
          onClick={() => navigate("/mysongs")}
          className="my-2 flex cursor-pointer items-center justify-center"
        >
          <img
            className="mr-2 h-[26px] w-[26px] shrink-0"
            src={logo}
            alt="disc"
          />
          <h1 className="gimmesong-primary-font select-none text-2xl">
            GIMMESONG
          </h1>
        </span>
        <div className="flex flex-row items-center justify-center">
          <>
            <button
              onClick={() => navigate("/menu")}
              className="group mr-1.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.0837 1.91797L10.542 12.4596"
                  stroke="black"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.0837 1.91797L14.3753 21.0846L10.542 12.4596L1.91699 8.6263L21.0837 1.91797Z"
                  stroke="black"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                navigate("/shop")
              }
              className="group mr-1.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4485 5.13615C19.411 4.723 19.0636 4.40376 18.6457 4.40376H16.1528C16.0213 1.95305 13.9884 0 11.5049 0C9.02131 0 6.98844 1.95305 6.85699 4.40376H4.36403C3.94619 4.40376 3.59877 4.723 3.56121 5.13615L2.26544 19.7371C2.26544 19.7606 2.26074 19.784 2.26074 19.8075C2.26074 21.5681 3.86638 23 5.83821 23H17.1622C19.134 23 20.7396 21.5681 20.7396 19.8075C20.7396 19.784 20.7396 19.7606 20.7349 19.7371L19.4485 5.13615ZM11.5049 1.61033C13.1011 1.61033 14.411 2.84038 14.5377 4.40376H8.47201C8.59877 2.84038 9.90863 1.61033 11.5049 1.61033ZM17.1668 21.3944H5.8429C4.77248 21.3944 3.89455 20.6995 3.87577 19.8404L5.10581 6.01408H6.85229V7.73239C6.85229 8.1784 7.21379 8.53991 7.6598 8.53991C8.10581 8.53991 8.46732 8.1784 8.46732 7.73239V6.01408H14.5565V7.73239C14.5565 8.1784 14.918 8.53991 15.3593 8.53991C15.8053 8.53991 16.1668 8.1784 16.1668 7.73239V6.01408H17.9133L19.1434 19.8404C19.1152 20.6995 18.242 21.3944 17.1668 21.3944Z"
                  fill="black"
                />
                <path
                  d="M13.6548 11.7164L10.528 14.8431L9.3543 13.6694C9.03975 13.3549 8.52801 13.3549 8.21345 13.6694C7.8989 13.984 7.8989 14.4957 8.21345 14.8103L9.95524 16.5521C10.1102 16.707 10.3167 16.7868 10.5233 16.7868C10.7299 16.7868 10.9365 16.707 11.0914 16.5521L14.7862 12.8572C15.1008 12.5427 15.1008 12.0309 14.7862 11.7164C14.4811 11.4018 13.9693 11.4018 13.6548 11.7164Z"
                  fill="black"
                />
              </svg>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="group mr-1.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.64413 11.1398L6.22684 4.6398C6.8849 3.44589 8.1228 2.70703 9.46507 2.70703H16.5356C17.8778 2.70703 19.1157 3.44589 19.7739 4.6398L23.3566 11.1398C23.9927 12.294 23.9927 13.7034 23.3566 14.8576L19.7739 21.3576C19.1157 22.5515 17.8778 23.2904 16.5356 23.2904H9.46507C8.1228 23.2904 6.8849 22.5515 6.22684 21.3576L2.64413 14.8576C2.00795 13.7034 2.00795 12.294 2.64413 11.1398ZM4.03196 11.9365L7.61465 5.43647C7.99069 4.75423 8.69806 4.33203 9.46507 4.33203H16.5356C17.3026 4.33203 18.01 4.75423 18.386 5.43647L21.9687 11.9365C22.3323 12.596 22.3323 13.4014 21.9687 14.0609L18.386 20.5609C18.01 21.2432 17.3026 21.6654 16.5356 21.6654H9.46507C8.69806 21.6654 7.99069 21.2432 7.61465 20.5609L4.03196 14.0609C3.66841 13.4014 3.66841 12.596 4.03196 11.9365Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0003 10.5625C11.6812 10.5625 10.6118 11.6539 10.6118 13C10.6118 14.3461 11.6812 15.4375 13.0003 15.4375C14.3194 15.4375 15.3887 14.3461 15.3887 13C15.3887 11.6539 14.3194 10.5625 13.0003 10.5625ZM9.01953 13C9.01953 10.7563 10.8018 8.9375 13.0003 8.9375C15.1988 8.9375 16.9811 10.7563 16.9811 13C16.9811 15.2437 15.1988 17.0625 13.0003 17.0625C10.8018 17.0625 9.01953 15.2437 9.01953 13Z"
                  fill="black"
                />
              </svg>
            </button>
          </>
        </div>
      </div>

      {/* <div className="gimmesong-bg mt-3 w-full max-w-md">
        <div className="mx-8 mb-2 flex flex-row items-center justify-center font-bold">
          <button
            className={`flex w-1/2 items-center justify-center rounded-2xl p-3 transition duration-150 ease-in-out ${
              location.pathname.startsWith("/club")
                ? "bg-black text-white hover:bg-gray-600"
                : "text-black hover:bg-gray-300"
            }`}
            onClick={() => navigate("/club")}
          >
            <span>Club</span>
          </button>
          <button
            className={`flex w-1/2 items-center justify-center rounded-2xl p-3 transition duration-150 ease-in-out hover:bg-gray-600 ${
              location.pathname.startsWith("/mysongs")
                ? "bg-black text-white hover:bg-gray-600"
                : "text-black hover:bg-gray-300"
            }`}
            onClick={() => navigate("/mysongs")}
          >
            <span>My Songs</span>
          </button>
        </div>
      </div> */}

      {isClubFeed && <ClubFeedBar />}
    </div>
  );
}

export default OnMainPage;
