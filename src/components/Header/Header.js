import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "@hooks/useSession";
import { useLocation } from "react-router-dom";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import { signOut } from "@lib/firebase";
import logo from "@assets/img/gimmesong_logo.png";

function Header() {
  const { user } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <header className="gimmesong-bg fixed top-0 right-0 left-0 z-50 mx-auto flex h-[60px] w-full max-w-md items-center justify-between px-2.5">
      <span
        onClick={() => navigate("/")}
        className=" my-2 flex cursor-pointer items-center justify-center"
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
      {user ? (
        <div className="flex items-center">
          {user?.username && (
            <>
              <button
                onClick={() => navigate("/menu")}
                className={`group mr-1.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${
                  location.pathname === "/menu" ? "bg-black" : ""
                }`}
              >
                <svg
                  className={`${
                    location.pathname === "/menu"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.379,19.1403 L12.108,12.5993 L19.467,5.2413 L15.379,19.1403 Z M4.86,8.6213 L18.76,4.5343 L11.401,11.8923 L4.86,8.6213 Z M3.359,8.0213 C2.923,8.1493 2.87,8.7443 3.276,8.9483 L11.128,12.8733 L15.053,20.7243 C15.256,21.1303 15.852,21.0773 15.98,20.6413 L20.98,3.6413 C21.091,3.2623 20.739,2.9093 20.359,3.0213 L3.359,8.0213 Z"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  navigate("/request", {
                    state: {
                      reload: location.pathname.startsWith("/request")
                        ? true
                        : false,
                    },
                  })
                }
                className={`group mr-1.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${
                  location.pathname === "/request" ||
                  location.pathname === "/request/new"
                    ? "bg-black"
                    : ""
                }`}
              >
                <svg
                  className={`${
                    location.pathname === "/request" ||
                    location.pathname === "/request/new"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 17 17"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ transform: "rotate(-10deg)" }}
                >
                  <g clipPath="url(#clip0_469_826)">
                    <path
                      d="M13.846 1.60059C13.4967 1.60059 13.1632 1.72215 12.8515 1.94045L12.8495 1.93765C8.66654 4.97628 4.79095 5.20539 2.92835 5.31549L2.77875 5.32447C1.7337 5.38739 0.783153 6.06815 0.298173 7.10072C-0.0950119 7.93786 -0.0996396 8.94837 0.286051 9.80412C0.787298 10.9161 1.74683 11.5908 2.80216 11.5922C2.94552 11.591 3.11619 11.594 3.29888 11.5996C3.0934 13.0154 3.93171 14.4657 5.38434 15.095C5.85091 15.2972 6.34286 15.399 6.83033 15.399C7.21057 15.399 7.58811 15.3371 7.94876 15.2127C8.78275 14.9252 9.42746 14.3389 9.76404 13.5622C9.81139 13.453 9.84941 13.3403 9.88308 13.2265C10.8459 13.6783 11.8446 14.2483 12.8495 14.9783L12.8515 14.9755C13.1633 15.1938 13.4967 15.3153 13.8461 15.3153C15.6147 15.3153 17.0001 12.3033 17.0001 8.45807C17.0001 4.61283 15.6146 1.60059 13.846 1.60059ZM9.14009 13.2916C8.88025 13.8912 8.37848 14.3451 7.72697 14.5698C7.06448 14.7978 6.32864 14.7629 5.65468 14.471C4.46563 13.9557 3.7829 12.7712 3.97923 11.6363C5.28176 11.7388 7.15932 12.0612 9.25433 12.9469C9.22463 13.0644 9.18847 13.1801 9.14009 13.2916ZM2.79622 10.912C2.04739 10.9192 1.28913 10.3741 0.906065 9.52445C0.601048 8.84752 0.60388 8.04955 0.91387 7.38989C1.29293 6.58262 2.02315 6.0513 2.81963 6.00315L2.96841 5.99435C4.65257 5.89482 7.9278 5.70073 11.6264 3.547C11.0474 4.78368 10.6922 6.51335 10.6922 8.458C10.6922 10.4039 11.0479 12.1344 11.6276 13.3712C7.79273 11.1393 4.2591 10.8945 2.79622 10.912ZM13.3364 8.458C13.3364 9.51961 12.5439 10.3974 11.5199 10.5364C11.4266 9.89912 11.3722 9.20489 11.3722 8.458C11.3722 7.71103 11.4266 7.01673 11.5199 6.37938C12.544 6.51846 13.3364 7.39638 13.3364 8.458ZM13.846 14.6352C13.6471 14.6352 13.4462 14.5604 13.2488 14.4286L13.2493 14.428C13.2146 14.4028 13.1801 14.3815 13.1455 14.3566C12.524 13.8687 11.9557 12.7549 11.6377 11.2056C12.9807 11.0102 14.0166 9.85433 14.0166 8.45803C14.0166 7.06159 12.9807 5.90573 11.6378 5.71026C11.9557 4.16163 12.5236 3.04807 13.1448 2.55987C13.1798 2.53484 13.2143 2.51336 13.2493 2.4879L13.2489 2.48728C13.4462 2.35549 13.6471 2.28069 13.8461 2.28069C15.0408 2.28069 16.32 4.76292 16.32 8.45803C16.32 12.1531 15.0408 14.6352 13.846 14.6352Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_469_826">
                      <rect width="17" height="17" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button
                onClick={() => navigate("/mysongs")}
                className={`group mr-1.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${
                  location.pathname === "/mysongs" ? "bg-black" : ""
                }`}
              >
                <svg
                  className={`${
                    location.pathname === "/mysongs"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 15.9C7.17001 15.9 5.41496 15.173 4.12096 13.879C2.82696 12.585 2.1 10.83 2.1 9C2.1 7.17001 2.82696 5.41496 4.12096 4.12096C5.41496 2.82696 7.17001 2.1 9 2.1C10.83 2.1 12.585 2.82696 13.879 4.12096C15.173 5.41496 15.9 7.17001 15.9 9C15.9 10.83 15.173 12.585 13.879 13.879C12.585 15.173 10.83 15.9 9 15.9ZM9 17.1C11.1483 17.1 13.2085 16.2466 14.7276 14.7276C16.2466 13.2085 17.1 11.1483 17.1 9C17.1 6.85175 16.2466 4.79148 14.7276 3.27244C13.2085 1.75339 11.1483 0.9 9 0.9C6.85175 0.9 4.79148 1.75339 3.27244 3.27244C1.75339 4.79148 0.9 6.85175 0.9 9C0.9 11.1483 1.75339 13.2085 3.27244 14.7276C4.79148 16.2466 6.85175 17.1 9 17.1Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.2"
                  />
                  <path
                    d="M10.4849 10.4849C10.8788 10.0911 11.1 9.55695 11.1 9C11.1 8.44305 10.8788 7.9089 10.4849 7.51508C10.0911 7.12125 9.55695 6.9 9 6.9C8.44305 6.9 7.9089 7.12125 7.51508 7.51508C7.12125 7.9089 6.9 8.44305 6.9 9C6.9 9.55695 7.12125 10.0911 7.51508 10.4849C7.9089 10.8788 8.44305 11.1 9 11.1C9.55695 11.1 10.0911 10.8788 10.4849 10.4849ZM6.24228 6.24228C6.97368 5.51089 7.96566 5.1 9 5.1C9.15913 5.1 9.31174 5.03679 9.42426 4.92426C9.53679 4.81174 9.6 4.65913 9.6 4.5C9.6 4.34087 9.53679 4.18826 9.42426 4.07574C9.31174 3.96321 9.15913 3.9 9 3.9C7.6474 3.9 6.35019 4.43732 5.39376 5.39376C4.43732 6.35019 3.9 7.6474 3.9 9C3.9 9.15913 3.96321 9.31174 4.07574 9.42426C4.18826 9.53679 4.34087 9.6 4.5 9.6C4.65913 9.6 4.81174 9.53679 4.92426 9.42426C5.03679 9.31174 5.1 9.15913 5.1 9C5.1 7.96566 5.51089 6.97368 6.24228 6.24228ZM13.9243 8.57574C13.8117 8.46321 13.6591 8.4 13.5 8.4C13.3409 8.4 13.1883 8.46321 13.0757 8.57574C12.9632 8.68826 12.9 8.84087 12.9 9C12.9 10.0343 12.4891 11.0263 11.7577 11.7577C11.0263 12.4891 10.0343 12.9 9 12.9C8.84087 12.9 8.68826 12.9632 8.57574 13.0757C8.46321 13.1883 8.4 13.3409 8.4 13.5C8.4 13.6591 8.46321 13.8117 8.57574 13.9243C8.68826 14.0368 8.84087 14.1 9 14.1C10.3526 14.1 11.6498 13.5627 12.6062 12.6062C13.5627 11.6498 14.1 10.3526 14.1 9C14.1 8.84087 14.0368 8.68826 13.9243 8.57574Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.2"
                  />
                </svg>
                {/* <svg
              className={`${
                location.pathname === "/mysongs"
                  ? "text-white"
                  : "text-gray-800"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg> */}
              </button>
            </>
          )}
          <button
            onClick={onOpen}
            className={`group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm`}
          >
            <svg
              className={`text-gray-800`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
            </svg>
          </button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size="md"
          >
            <AlertDialogOverlay />
            <AlertDialogContent borderRadius={25} marginX={4}>
              <AlertDialogHeader>Sign out?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure you want to sign out? you won&apos;t see new
                received song until you signed in again.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  borderRadius="25"
                  ref={cancelRef}
                  onClick={onClose}
                  h={42}
                >
                  Cancel
                </Button>
                <Button
                  onClick={signOut}
                  borderRadius="25"
                  colorScheme="red"
                  ml={3}
                  h={42}
                >
                  Sign out
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            onClick={() =>
              navigate("/request", {
                state: {
                  reload: location.pathname.startsWith("/request")
                    ? true
                    : false,
                },
              })
            }
            className={`group mr-1.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${
              location.pathname === "/request" ||
              location.pathname === "/request/new"
                ? "bg-black"
                : ""
            }`}
          >
            <svg
              className={`${
                location.pathname === "/request" ||
                location.pathname === "/request/new"
                  ? "text-white"
                  : "text-gray-800"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 17 17"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ transform: "rotate(-10deg)" }}
            >
              <g clipPath="url(#clip0_469_826)">
                <path
                  d="M13.846 1.60059C13.4967 1.60059 13.1632 1.72215 12.8515 1.94045L12.8495 1.93765C8.66654 4.97628 4.79095 5.20539 2.92835 5.31549L2.77875 5.32447C1.7337 5.38739 0.783153 6.06815 0.298173 7.10072C-0.0950119 7.93786 -0.0996396 8.94837 0.286051 9.80412C0.787298 10.9161 1.74683 11.5908 2.80216 11.5922C2.94552 11.591 3.11619 11.594 3.29888 11.5996C3.0934 13.0154 3.93171 14.4657 5.38434 15.095C5.85091 15.2972 6.34286 15.399 6.83033 15.399C7.21057 15.399 7.58811 15.3371 7.94876 15.2127C8.78275 14.9252 9.42746 14.3389 9.76404 13.5622C9.81139 13.453 9.84941 13.3403 9.88308 13.2265C10.8459 13.6783 11.8446 14.2483 12.8495 14.9783L12.8515 14.9755C13.1633 15.1938 13.4967 15.3153 13.8461 15.3153C15.6147 15.3153 17.0001 12.3033 17.0001 8.45807C17.0001 4.61283 15.6146 1.60059 13.846 1.60059ZM9.14009 13.2916C8.88025 13.8912 8.37848 14.3451 7.72697 14.5698C7.06448 14.7978 6.32864 14.7629 5.65468 14.471C4.46563 13.9557 3.7829 12.7712 3.97923 11.6363C5.28176 11.7388 7.15932 12.0612 9.25433 12.9469C9.22463 13.0644 9.18847 13.1801 9.14009 13.2916ZM2.79622 10.912C2.04739 10.9192 1.28913 10.3741 0.906065 9.52445C0.601048 8.84752 0.60388 8.04955 0.91387 7.38989C1.29293 6.58262 2.02315 6.0513 2.81963 6.00315L2.96841 5.99435C4.65257 5.89482 7.9278 5.70073 11.6264 3.547C11.0474 4.78368 10.6922 6.51335 10.6922 8.458C10.6922 10.4039 11.0479 12.1344 11.6276 13.3712C7.79273 11.1393 4.2591 10.8945 2.79622 10.912ZM13.3364 8.458C13.3364 9.51961 12.5439 10.3974 11.5199 10.5364C11.4266 9.89912 11.3722 9.20489 11.3722 8.458C11.3722 7.71103 11.4266 7.01673 11.5199 6.37938C12.544 6.51846 13.3364 7.39638 13.3364 8.458ZM13.846 14.6352C13.6471 14.6352 13.4462 14.5604 13.2488 14.4286L13.2493 14.428C13.2146 14.4028 13.1801 14.3815 13.1455 14.3566C12.524 13.8687 11.9557 12.7549 11.6377 11.2056C12.9807 11.0102 14.0166 9.85433 14.0166 8.45803C14.0166 7.06159 12.9807 5.90573 11.6378 5.71026C11.9557 4.16163 12.5236 3.04807 13.1448 2.55987C13.1798 2.53484 13.2143 2.51336 13.2493 2.4879L13.2489 2.48728C13.4462 2.35549 13.6471 2.28069 13.8461 2.28069C15.0408 2.28069 16.32 4.76292 16.32 8.45803C16.32 12.1531 15.0408 14.6352 13.846 14.6352Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_469_826">
                  <rect width="17" height="17" fill="currentColor" />
                </clipPath>
              </defs>
            </svg>
          </button>
          {location.pathname !== "/" && (
            <button
              onClick={() => navigate("/")}
              className="flex h-[42px] items-center rounded-full border-[1.5px] border-black px-4 text-sm transition duration-150 ease-in-out"
            >
              <svg
                className={`mr-2 text-black`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
              </svg>
              Sign in
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
