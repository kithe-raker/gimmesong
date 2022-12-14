import { useEffect, useRef, useContext } from "react";

import PlaylistBubble from "@components/PlaylistBubble";
import Empty from "./components/Empty";
import NewRequest from "../NewRequest";

import LanguageTag from "@lib/languageTag";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import annouceEmoji from "@assets/img/annouce_emoji.png";

import { FeedContext } from "contexts/FeedContext";
import NativeBanner from "@components/Adsense/NativeBanner";

import useSession from "@hooks/useSession";
import { useLocation } from "react-router-dom";
import SignInMethod from "@components/SignInMethod";
import { useInView } from "react-cool-inview";

function Feed() {
  const {
    state: { isLoading, isLoadingMore, hasNext },
    data: { items, filter },
    action: { loadMore, changeFilter, fetchContent },
  } = useContext(FeedContext);

  const { observe: loadMoreRef } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "50px 0px",
    // When the last item comes to the viewport
    onEnter: () => {
      if (hasNext && !isLoadingMore) loadMore(20);
    },
  });

  const { state } = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { user } = useSession();

  const tag = LanguageTag.getPreferenceLanguage();
  const preferenceLang = ["th", "en"];

  // How many feed item per one ads banner
  const _adsRate = 10;
  var _feedCounter = 0;

  const handleOpenRequestSong = () => {
    onOpen();
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
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-6 pt-[60px]">
      <div className="mt-4 flex w-full flex-col px-4 pb-[80px]">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center">
            <img className=" mr-2 h-8 w-8" src={annouceEmoji} alt="" />
            <span className="gimmesong-secondary-font text-2xl font-bold">
              Songs Request
            </span>
            <span className="ml-2 rounded-lg bg-red-400 px-2 py-[1.5px] text-white">
              BETA
            </span>
          </div>
          {/* <button className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AEAEAE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button> */}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="overflow-x-auto">
            <div className="flex">
              <button
                onClick={() => changeFilter("newest")}
                className={`${
                  filter === "newest"
                    ? "bg-black text-white"
                    : "border-[1.5px] border-gray-300"
                } gimmesong-secondary-font mr-1.5 flex h-10 shrink-0 items-center rounded-full px-3.5 text-xs font-semibold`}
              >
                Newest
              </button>
              <button
                onClick={() => changeFilter("most_play")}
                className={`${
                  filter === "most_play"
                    ? "bg-black text-white"
                    : "border-[1.5px] border-gray-300"
                } gimmesong-secondary-font mr-1.5 flex h-10 shrink-0 items-center rounded-full px-3.5 text-xs font-semibold`}
              >
                Most play
              </button>
              {user?.username && (
                <button
                  onClick={() => changeFilter("my_request")}
                  className={`${
                    filter === "my_request"
                      ? "bg-black text-white"
                      : "border-[1.5px] border-gray-300"
                  } gimmesong-secondary-font flex h-10 shrink-0 items-center rounded-full px-3.5 text-xs font-semibold`}
                >
                  My Request
                </button>
              )}
            </div>
          </div>
          {/* <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="block rounded-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
          >
            {preferenceLang.map((la, index) => (
              <option key={`${la}-${index}`} value={la}>
                {la.toUpperCase()}
              </option>
            ))}
            {!preferenceLang.includes(lang) && (
              <option value={lang}>{lang.toUpperCase()}</option>
            )}
          </select> */}
        </div>
        {isLoading ? (
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
        ) : items.length > 0 ? (
          <>
            <div className="mt-6">
              {items.map((item) => {
                _feedCounter++;
                const showAds = _feedCounter >= _adsRate;

                if (showAds) _feedCounter = 0;

                return showAds ? (
                  <div key={`${item.id}`}>
                    <div className="mb-4">
                      <NativeBanner />
                    </div>

                    <PlaylistBubble data={item} />
                  </div>
                ) : (
                  <PlaylistBubble key={`${item.id}`} data={item} />
                );
              })}
            </div>
            {/* {hasNext && filter !== "most_play" && (
              <button
                onClick={loadMore}
                className={`gimmesong-secondary-font mr-1.5 flex h-10 w-fit shrink-0 items-center self-center rounded-full border-[1.5px] border-gray-300 px-3.5 text-xs font-semibold`}
              >
                Load more
              </button>
            )} */}
            {hasNext && filter !== "most_play" && (
              <div
                ref={loadMoreRef}
                className={`my-12 flex items-center justify-center`}
              >
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
          </>
        ) : (
          <Empty
            title="Oops, What an empty space"
            message="Let's create the world of music together."
          />
        )}
      </div>
      <div className="fixed bottom-0 z-20 mx-auto flex w-full max-w-md items-center justify-end py-6 px-5">
        <button
          onClick={handleOpenRequestSong}
          className={`flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] shadow-md`}
        >
          <svg
            className={`text-white`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 17 17"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ transform: "scale(-1,1) rotate(-10deg)" }}
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
      </div>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="md"
      >
        <AlertDialogOverlay />
        <AlertDialogContent borderRadius={36} marginX={4} py={4}>
          <div className="flex w-full items-center justify-between py-2 px-6">
            <div className="flex items-center">
              <img className=" mr-1 h-7 w-7" src={annouceEmoji} alt="" />
              <span className="text-xl font-semibold">Request Songs</span>
            </div>
            <button
              onClick={onClose}
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-gray-200"
            >
              <svg
                className="text-gray-600"
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <AlertDialogBody>
            {!user?.username ? (
              <div className="flex max-w-md flex-col items-center justify-center">
                Please sign in before start requesting songs from others.
                <SignInMethod className="mt-4" />
              </div>
            ) : (
              <NewRequest />
            )}
            {/* Are you sure you want to sign out? you won&apos;t see new received
            song until you signed in again. */}
          </AlertDialogBody>
          {/* <AlertDialogFooter>
            <Button borderRadius="25" ref={cancelRef} onClick={onClose} h={42}>
              Cancel
            </Button>
            <Button borderRadius="25" colorScheme="red" ml={3} h={42}>
              Sign out
            </Button>
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Feed;
