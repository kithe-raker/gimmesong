import { useRef, useEffect, useState, useContext } from "react";

import useSession from "@hooks/useSession";
import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import SendSong from "@features/RequestSongs/SendSong";

import { PlaylistContext } from "contexts/PlaylistContext";
import { FeedContext } from "contexts/FeedContext";
import SignInMethod from "@components/SignInMethod";

function AddSongModal({ className }) {
  const {
    action: { updateFeedItemInfo },
  } = useContext(FeedContext);

  const {
    data: { playlistInfo },
    action: { fetchPlaylistItems },
  } = useContext(PlaylistContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { user } = useSession();

  const handleSongAdded = async () => {
    onClose();
    await updateFeedItemInfo(playlistInfo.shareLinkId);
    await fetchPlaylistItems();
  };

  return (
    <>
      <button
        onClick={onOpen}
        className={`${
          className ? className : ""
        } group flex h-[32px] shrink-0 items-center justify-center rounded-full bg-black px-3 text-sm text-white shadow-sm`}
      >
        <svg
          className="mr-1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span className="gimmesong-secondary-font">Song</span>
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
        <AlertDialogContent
          borderRadius={36}
          marginX={4}
          py={5}
          bgColor="#F9F9F9"
        >
          <div className="flex w-full items-center justify-between py-2 px-6">
            <span className="text-xl font-semibold">Add song to playlist</span>
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
                Please sign in before add song to playlist.
                <SignInMethod className="mt-4" />
              </div>
            ) : (
              <SendSong
                onSongAdded={handleSongAdded}
                playlistInfo={playlistInfo}
              />
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AddSongModal;
