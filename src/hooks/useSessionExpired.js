import { useRef } from "react";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export const useSessionExpired = () => {
  const { isOpen, onOpen } = useDisclosure();
  const sessionExpiredCancelRef = useRef();

  const reloadPage = () => {
    window.location.reload();
  };

  const open = () => {
    onOpen();
  };

  const SessionExpired = () => {
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={sessionExpiredCancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius={25} marginX={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sorry, Something went wrong
            </AlertDialogHeader>

            <AlertDialogBody>
              Your session maybe expired, please try to re-loading this page
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                borderRadius="25"
                bgColor="black"
                color="white"
                h={42}
                _hover={{ bg: "#000000" }}
                _active={{
                  bg: "#000000",
                }}
                onClick={reloadPage}
              >
                Reload
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  return { open, SessionExpired };
};
