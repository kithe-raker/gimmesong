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

import Pattern7 from "@features/ShareWidget/Pattern8";
import Pattern6 from "@features/ShareWidget/Pattern7";
import Pattern5 from "@features/ShareWidget/Pattern6";
import Pattern4 from "@features/ShareWidget/Pattern5";
import Pattern3 from "@features/ShareWidget/Pattern4";
import Pattern2 from "@features/ShareWidget/Pattern3";
import Pattern1 from "@features/ShareWidget/Pattern1";

const ShareDialogContent = ({ content, isMysong }) => {
  const { user } = useSession();

  const [pattern, setPattern] = useState(0);

  const [file, setFile] = useState(null);
  const [fileState, setFileState] = useState("unready");

  const handleSharing = (props) => {
    //console.log(props);setFileState("unready");

    setFileState("unready");
    if (file === null) {
      setFile(props);
    } else if (file.size !== props.size) {
      setFile(props);
    }
    if (file !== null && file.size === props.size) {
      setFileState("ready");
    }
    // console.log(file);
  };

  const handleDownload = () => {
    // console.log(file);
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

  const normalPatterns = [
    <Pattern1 content={content} onSharing={handleSharing} />,
    <Pattern2
      content={content}
      isMysong={isMysong}
      onSharing={handleSharing}
    />,
  ];

  const christmasPatterns = [
    <Pattern3
      content={content}
      isMysong={isMysong}
      onSharing={handleSharing}
    />,
    <Pattern6
      content={content}
      isMysong={isMysong}
      onSharing={handleSharing}
    />,
    <Pattern7
      content={content}
      isMysong={isMysong}
      onSharing={handleSharing}
    />,
  ];

  let render = [...normalPatterns];
  if (
    content?.vinylStyle?.emoji?.id === "asW3lCf98pxSdCuHi6kH" ||
    content?.vinylStyle?.emoji?.id === "8MePVaC2QTpEXHD9zwEp"
  ) {
    render = [...render, ...christmasPatterns];
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {render[pattern]}

      <div className="my-4 flex shrink-0 items-center rounded-full border p-1.5">
        {render.map((component, index) => (
          <button
            key={index}
            onClick={() => setPattern(index)}
            className={`h-8 w-8 rounded-full 
            ${index < render.length - 1 ? "mr-3" : ""}  
            ${
              pattern === index ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
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

  // useEffect(() => {
  //   setFile(null);
  //   setFileState("unready");
  // }, [onOpen]);

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
