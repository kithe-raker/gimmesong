import { useState, useRef } from "react";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import Instagram from "@features/ShareWidget/components/Instagram";

export const useShareDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const closeShareDialog = () => {
    onClose();
  };

  const openShareDialog = () => {
    onOpen();
  };

  const ShareDialog = ({ content }) => {
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
              <Instagram content={content} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };
  // [isOpen]

  return { openShareDialog, ShareDialog };
};
