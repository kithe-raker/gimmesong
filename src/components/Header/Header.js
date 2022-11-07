import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useSession from "@hooks/useSession";
import { useLocation } from "react-router-dom";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import { signOut } from "@lib/firebase";

function Header() {
  const { user } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 mx-auto flex h-[60px] w-full max-w-md items-center justify-end px-2">
      {user?.username && (
        <>
          <button
            onClick={() => navigate("/menu")}
            className={`group mr-2 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm hover:opacity-70 ${
              location.pathname === "/menu" ? "bg-black" : ""
            }`}
          >
            <svg
              className={`${
                location.pathname === "/menu" ? "text-white" : "text-gray-800"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            onClick={() => navigate("/mysongs")}
            className={`group mr-2 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm hover:opacity-70 ${
              location.pathname === "/mysongs" ? "bg-black" : ""
            }`}
          >
            <svg
              className={`${
                location.pathname === "/mysongs"
                  ? "text-white"
                  : "text-gray-800"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </button>
          <button
            onClick={onOpen}
            className={`group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white shadow-sm hover:opacity-70`}
          >
            <svg
              className={`text-gray-800`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
            </svg>
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

            <AlertDialogContent borderRadius={25} marginX={4}>
              <AlertDialogHeader>Sign out?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Are you sure you want to sign out? you won&apos;t see new
                received song until you signed in again.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  borderRadius="25"
                  ref={cancelRef}
                  onClick={onClose}
                  h={42}
                >
                  Cancel
                </Button>
                <Button
                  onClick={signOut}
                  borderRadius="25"
                  colorScheme="red"
                  ml={3}
                  h={42}
                >
                  Sign out
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </header>
  );
}

export default Header;
