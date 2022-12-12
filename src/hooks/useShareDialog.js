import { useState, useCallback, useRef, useEffect } from "react";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import useSession from "@hooks/useSession";

import Pattern3 from "@features/ShareWidget/Pattern4";
import Pattern2 from "@features/ShareWidget/Pattern3";
import Pattern1 from "@features/ShareWidget/Pattern1";

const ShareDialogContent = ({ content, isMysong }) => {
  const { user } = useSession();

  const [pattern, setPattern] = useState(1);
  const [file, setFile] = useState(null);

  const handleSharing = (props) => {
    setFile(props);
  };

  const handleDownload = () => {
    if (!file) return;
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "gimmesong-" + Date.now() + ".png";

    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleShare = async () => {
    if (!file || navigator.share === undefined) return;
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: isMysong
            ? `gimmesong.link/@${user.username}`
            : window.location.href,
          text: "#gimmesong",
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {pattern === 1 && (
        <Pattern1 content={content} onSharing={handleSharing} />
      )}
      {pattern === 2 && (
        <Pattern2
          content={content}
          isMysong={isMysong}
          onSharing={handleSharing}
        />
      )}
      {pattern === "3" && (
        <Pattern3
          content={content}
          isMysong={isMysong}
          onSharing={handleSharing}
        />
      )}
      <div className="my-4 flex shrink-0 items-center rounded-full border p-1.5">
        <button
          onClick={() => setPattern(1)}
          className={`mr-3 h-8 w-8 rounded-full ${
            pattern === 1 ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          1
        </button>
        <button
          onClick={() => setPattern(2)}
          className={`mr-3 h-8 w-8 rounded-full ${
            pattern === 2 ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          2
        </button>
        <button
          onClick={() => setPattern("3")}
          className={`h-8 w-8 rounded-full ${
            pattern === "3" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          3
        </button>
      </div>
      <div className="flex w-full justify-between">
        <Button
          onClick={handleDownload}
          w="full"
          borderRadius="25"
          bgColor="black"
          color="white"
          h={42}
          _hover={{ bg: "#000000" }}
          _active={{
            bg: "#000000",
          }}
        >
          Download
        </Button>
        <Button
          onClick={handleShare}
          w="full"
          borderRadius="25"
          bgColor="black"
          color="white"
          ml={3}
          h={42}
          _hover={{ bg: "#000000" }}
          _active={{
            bg: "#000000",
          }}
        >
          Share
        </Button>
      </div>
      <span className="mt-2 mb-4 text-center">
        Or long press on the above image to <b>Save</b> and <b>Share</b>
      </span>
    </div>
  );
};

export const useShareDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const openShareDialog = () => {
    onOpen();
  };

  const ShareDialog = useCallback(
    ({ content, isMysong }) => {
      return (
        <>
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
              <AlertDialogHeader>Share to your social media</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody
                display={`flex`}
                flexDirection={`column`}
                justifyContent={`center`}
                alignItems={`center`}
              >
                <ShareDialogContent content={content} isMysong={isMysong} />
              </AlertDialogBody>
              {/* <AlertDialogFooter></AlertDialogFooter> */}
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
    [isOpen]
  );

  return { openShareDialog, ShareDialog };
};
