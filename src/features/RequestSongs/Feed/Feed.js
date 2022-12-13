import { useEffect, useRef, useContext } from "react";

import PlaylistBubble from "@components/PlaylistBubble";
import Empty from "./components/Empty";
import NewRequest from "../NewRequest";

import LanguageTag from "@lib/languageTag";

import annouceEmoji from "@assets/img/annouce_emoji.png";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { FeedContext } from "contexts/FeedContext";
import NativeBanner from "@components/Adsense/NativeBanner";

import useSession from "@hooks/useSession";
import { useLocation } from "react-router-dom";
import SignInMethod from "@components/SignInMethod";
import { useInView } from "react-cool-inview";

function Feed() {
  const {
    state: { isLoading, isLoadingMore, hasNext },
    data: { items, filter, club },
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

  return (
    <div className="mx-auto mt-20 flex w-full max-w-md flex-col items-center py-6">
      <div className="flex w-full flex-col px-4 pb-[80px]">
        <div className="flex items-center justify-between">
          {/* <div className="relative flex items-center">
            <img className=" mr-2 h-8 w-8" src={annouceEmoji} alt="" />
            <span className="gimmesong-secondary-font text-2xl font-bold">
              Songs Request
            </span>
            <span className="ml-2 rounded-lg bg-red-400 px-2 py-[1.5px] text-white">
              BETA
            </span>
          </div> */}
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
        {/* <div className="mt-5 flex items-center justify-between">
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
          <select
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
          </select>
        </div> */}
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
          className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-3xl bg-gradient-to-b from-[#8583D6] to-[#C697C8] shadow-md`}
        >
          <div className="m-0.5 w-[70px] h-[70px] flex items-center justify-center rounded-3xl bg-white hover:bg-gray-100">
            <img
              src={annouceEmoji}
              alt="Announce Emoji"
              className="h-[28px] w-[28px]"
            />
          </div>
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
        <AlertDialogContent borderRadius={36}>
          <div className="rounded-[36px] bg-gradient-to-b from-[#8583D6] to-[#C697C8]">
            <div className="m-0.5 rounded-[36px]  bg-white">
              <div className="flex flex-col py-4">
                <div className="mx-3 flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center rounded-3xl border border-black/[0.15] px-3 py-2">
                    <img
                      className="mr-2 h-[17px] w-[17px]"
                      src={club.emoji}
                      alt="emoji"
                    />
                    <span className="gimmesong-secondary-font">
                      {club.title}
                    </span>
                  </div>

                  <button
                    onClick={onClose}
                    className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
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

                <div className="mt-7 flex w-full items-center justify-between py-2 px-6">
                  <span className="gimmesong-secondary-font text-3xl font-bold">
                    Request Songs
                  </span>
                </div>
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

              <div className="flex flex-col items-center justify-center">
                {!user?.username || (
                  <span className="mt-7 flex text-sm text-[#929292]">
                    Tips: More you get like on this playlist{" "}
                    {/* I don't think this makes sense in English :P */}
                  </span>
                )}

                <div className="mt-16 mb-5 mr-7 flex w-full flex-row justify-end">
                  <img
                    src={annouceEmoji}
                    alt="announce emoji"
                    className="h-[28px] w-[28px]"
                  />
                </div>
              </div>
            </div>
          </div>
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
