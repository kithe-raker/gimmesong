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
import SelectTab, { ClubAndMySongsTabs } from "@components/SelectTab";
import Top from "./components/Top";
import PlaylistBubbleList from "@components/PlaylistBubbleList";

function Feed() {
  const {
    state: { isLoading, isLoadingMore, hasNext },
    data: { items, filter, club },
    action: { loadMore, fetchContent },
  } = useContext(FeedContext);

  const { state } = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { user } = useSession();

  const tag = LanguageTag.getPreferenceLanguage();
  const preferenceLang = ["th", "en"];

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
    <div className="mx-auto flex w-full max-w-md flex-col items-center">
      <SelectTab tabs={ClubAndMySongsTabs} />

      <Top />

      <PlaylistBubbleList
        canLoadMore={hasNext && filter !== "most_play"}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        items={items}
        loadMore={loadMore}
        className="px-4"
      />

      <div className="fixed bottom-0 z-20 mx-auto flex w-full max-w-md items-center justify-end py-6 px-5">
        <button
          onClick={handleOpenRequestSong}
          className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-3xl bg-gradient-to-b from-[#8583D6] to-[#C697C8] shadow-md`}
        >
          <div className="m-0.5 flex h-[70px] w-[70px] items-center justify-center rounded-3xl bg-white hover:bg-gray-100">
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
