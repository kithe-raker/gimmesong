import { createContext, useState, useContext, useRef } from "react";

import useSession from "@hooks/useSession";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import toast from "react-hot-toast";
import GimmesongAPI from "@lib/gimmesong_api";

import SearchSong from "./components/SearchSong.js";
import WriteMessage from "./components/WriteMessage.js";

import SignInMethod from "@components/SignInMethod";

import { FeedContext } from "contexts/FeedContext";
import { PlaylistContext } from "contexts/PlaylistContext";

import { useSessionExpired } from "@hooks/useSessionExpired";

import disc from "@assets/img/disc.webp";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import presentEmoji from "@assets/img/present_emoji.png";
import santaEmoji from "@assets/img/santa_emoji.png";

export const AddSongContext = createContext();

function AddSong({ className }) {
  const { open: openSessionExpired, SessionExpired } = useSessionExpired();

  const {
    action: { updateFeedItemInfo },
  } = useContext(FeedContext);

  const {
    data: { playlistInfo },
    action: { fetchPlaylistItems },
  } = useContext(PlaylistContext);

  const cancelRef = useRef();

  const { user } = useSession();

  const [currentStep, setCurrentStep] = useState(1);
  const [receiver, setReceiver] = useState(playlistInfo.shareLinkId);
  const [song, setSong] = useState(null);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
    // reset when closed
    setCurrentStep(1);
  };

  const [selectedDisc, setSelectedDisc] = useState(0);
  const discs = [
    {
      disc: disc,
      emoji: shushingEmoji,
    },
    {
      disc: disc,
      emoji: presentEmoji,
    },
    {
      disc: disc,
      emoji: santaEmoji,
    },
    {
      disc: disc,
      emoji: shushingEmoji,
    },
    {
      disc: disc,
      emoji: shushingEmoji,
    },
  ];

  // Call Native banner ads
  // Ads.NativeBanner();

  const handleSendSong = async () => {
    if (isLoading) return;
    if (!receiver || !song) return;
    if (!message.trim()) {
      toast("Please write me a message 🥹", {
        style: {
          borderRadius: "25px",
          background: "#FF6464",
          color: "#fff",
        },
      });
      return;
    }
    try {
      setIsLoading(true);
      // implement api here
      const success = await GimmesongAPI.SongRequest.AddSong(
        playlistInfo.language,
        playlistInfo.id,
        message,
        song,
        discs[selectedDisc]
      );

      if (success) {
        // if success then go to next step
        toast("Song Added!", {
          style: {
            borderRadius: "25px",
            background: "#000",
            color: "#fff",
          },
        });
        handleSongAdded();
        // next();
      }
    } catch (err) {
      if (err.response.status === 403) openSessionExpired();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSongAdded = async () => {
    onClose();
    await updateFeedItemInfo(playlistInfo.shareLinkId);
    await fetchPlaylistItems();
  };

  const goToNextStep = () => {
    setCurrentStep((step) => (step += 1));
  };

  const handleSongChange = (song) => {
    setSong(song);
  };

  const handleMessageChange = (val) => {
    if (val.length > 100) return;
    setMessage(val);
  };

  let render;
  switch (currentStep) {
    case 1:
      render = <SearchSong />;
      break;
    case 2:
      render = <WriteMessage />;
      break;
    default:
      break;
  }

  const store = {
    state: { isLoading },
    data: { receiver, song, message, discs, selectedDisc },
    action: {
      next: goToNextStep,
      selectSong: handleSongChange,
      writeMessage: handleMessageChange,
      sendSong: handleSendSong,
      selectDisc: setSelectedDisc,
    },
  };

  return (
    <AddSongContext.Provider value={store}>
      <SessionExpired />
      <button
        onClick={onOpen}
        className={`${
          className ? className : ""
        } group flex h-[42px] shrink-0 items-center justify-center rounded-full bg-black px-4 text-sm text-white shadow-sm`}
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
        <span className="gimmesong-secondary-font ml-1">Songs</span>
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
            <div className="flex max-w-md flex-col items-center justify-center">
              {!user?.username ? (
                <>
                  Please sign in before add song to playlist.
                  <SignInMethod className="mt-4" />
                </>
              ) : (
                render
              )}
            </div>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </AddSongContext.Provider>
  );
}

export default AddSong;
