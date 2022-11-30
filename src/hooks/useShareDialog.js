import { useState, useCallback, useRef } from "react";

import { useSteps } from "@hooks/useSteps";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogFooter,
} from "@chakra-ui/react";

import Instagram from "@features/ShareWidget/Instagram";
import Twitter from "@features/ShareWidget/Twitter";

export const useShareDialog = () => {
  const { activeStep, setStep, backStep, nextStep } = useSteps({
    totalSteps: 3, //1:select 2:IG 3:Twitter
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const closeShareDialog = () => {
    onClose();
    setStep(1);
  };

  const openShareDialog = () => {
    onOpen();
    setStep(1);
  };

  const ShareDialog = useCallback(
    ({ content }) => {
      return (
        <>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={closeShareDialog}
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
                {/* select */}
                {activeStep === 3 && (
                  <div className="mb-6 flex flex-col items-center">
                    <button
                      className="mb-4 flex items-center text-xl"
                      onClick={setStep(2)}
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#000"
                      >
                        <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
                      </svg>
                      Instagram
                    </button>
                    <button
                      className="flex items-center text-xl"
                      // onClick={setStep(3)}
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#000"
                      >
                        <path d="M20 0a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h16zm-4.42 5.8a3.28 3.28 0 0 0-3.2 4.03A9.32 9.32 0 0 1 5.61 6.4a3.26 3.26 0 0 0 1.02 4.38 3.27 3.27 0 0 1-1.49-.4v.03a3.28 3.28 0 0 0 2.64 3.22 3.3 3.3 0 0 1-1.49.06 3.29 3.29 0 0 0 3.07 2.28 6.59 6.59 0 0 1-4.86 1.36 9.29 9.29 0 0 0 5.03 1.47c6.04 0 9.34-5 9.34-9.34v-.42a6.65 6.65 0 0 0 1.63-1.7c-.59.26-1.22.44-1.89.52.68-.41 1.2-1.05 1.45-1.82-.64.38-1.34.65-2.09.8a3.28 3.28 0 0 0-2.4-1.04z" />
                      </svg>
                      Twitter
                    </button>
                  </div>
                )}
                {/* Instagram */}
                {activeStep === 2 && <Instagram content={content} />}
                {/* Twitter */}
                {activeStep === 1 && <Twitter content={content}/>}
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
