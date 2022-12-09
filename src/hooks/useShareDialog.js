import { useState, useCallback, useRef } from "react";

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

import Pattern2 from "@features/ShareWidget/Pattern3";
import Pattern1 from "@features/ShareWidget/Pattern1";

export const useShareDialog = () => {
  const { user } = useSession();

  const [pattern, setPattern] = useState(1);
  const [file, setFile] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const openShareDialog = () => {
    onOpen();
  };

  const handleSharing = (file) => {
    setFile(file);
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
                  {/* {pattern === "3" && (
                    <Pattern1 content={(content, isMysong)} />
                  )} */}
                  <div className="my-4 flex h-10 w-[137px] shrink-0 items-center  justify-around rounded-full border">
                    <button
                      onClick={() => setPattern(1)}
                      className={`h-8 w-8 rounded-full ${
                        pattern === 1
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      1
                    </button>
                    <button
                      onClick={() => setPattern(2)}
                      className={`h-8 w-8 rounded-full ${
                        pattern === 2
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      2
                    </button>
                    {/* <button
                      onClick={setPattern("3")}
                      className={`h-8 w-8 rounded-full ${
                        pattern === "3"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      3
                    </button> */}
                  </div>
                  <div className="flex w-full justify-between">
                    <Button
                      onClick={() => {
                        const element = document.createElement("a");
                        element.href = URL.createObjectURL(file);
                        element.download = "gimmesong-" + Date.now() + ".png";

                        document.body.appendChild(element); // Required for this to work in FireFox
                        element.click();
                      }}
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
                      onClick={() => {
                        if (navigator.canShare({ files: [file] })) {
                          try {
                            navigator.share({
                              files: [file],
                              title: this.ShareDialog.isMysong
                                ? `@${user.username}`
                                : "",
                              text: "#gimmsong #gimmesonglink",
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        } else {
                          console.log("cannot");
                        }
                      }}
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
                  <span className="pt-2 pb-1 text-center">
                    Or long press at the image to save.
                  </span>
                </div>
              </AlertDialogBody>
              {/* <AlertDialogFooter></AlertDialogFooter> */}
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
    [isOpen, onClose, pattern]
  );

  return { openShareDialog, ShareDialog };
};
