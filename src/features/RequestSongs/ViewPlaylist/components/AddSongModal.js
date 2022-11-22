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

import toast from "react-hot-toast";

import { signInWithGoogle } from "@lib/firebase";
import { PlaylistContext } from "contexts/PlaylistContext";

function AddSongModal({ className }) {
  const {
    data: { playlistInfo },
    action: { fetchPlaylistItems },
  } = useContext(PlaylistContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [FromInAppBrowser, setFromInAppBrowser] = useState(false);

  const { user } = useSession();

  const handleSongAdded = async () => {
    onClose();
    await fetchPlaylistItems();
  };

  useEffect(() => {
    setFromInAppBrowser(
      navigator.userAgent.includes("FB") ||
        navigator.userAgent.includes("Instagram") ||
        navigator.userAgent.includes("Twitter") ||
        navigator.userAgent.includes("Line")
    );
  }, []);

  const handleContinueSignIn = () => {
    FromInAppBrowser
      ? toast(
          "Open in your default browser (e.g. Chrome, Safari) to continue",
          {
            style: {
              borderRadius: "25px",
              background: "#FF6464",
              color: "#fff",
            },
          }
        )
      : signInWithGoogle();
  };

  return (
    <>
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
            {!user?.username ? (
              <div className="flex max-w-md flex-col items-center justify-center">
                Please sign in before add song to playlist.
                <button
                  onClick={handleContinueSignIn}
                  className="mt-4 flex h-12 w-[250px] items-center justify-center rounded-full bg-black font-bold text-white transition duration-150 ease-in-out hover:bg-gray-600"
                >
                  <svg
                    className="mr-3 h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
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
