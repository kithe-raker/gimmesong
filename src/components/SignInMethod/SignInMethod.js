import { useRef, useState, useEffect } from "react";

import { signInWithGoogle } from "@lib/firebase";

import { useSteps } from "@hooks/useSteps";

import hand from "@assets/img/hand_emoji.png";
import google from "@assets/img/googleLogo.png";
import safari from "@assets/img/safariLogo.png";
import samsung from "@assets/img/samsungInternet.png";

import howGif from "@assets/img/how-browser.gif";
import gifBg from "@assets/img/gifBg.png";

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

function SignInMethod({ className }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [FromInAppBrowser, setFromInAppBrowser] = useState(false);

  const handleContinueSignIn = () => {
    FromInAppBrowser ? onOpen() : signInWithGoogle();
  };
  useEffect(() => {
    setFromInAppBrowser(
      navigator.userAgent.includes("FB") ||
        navigator.userAgent.includes("Instagram") ||
        navigator.userAgent.includes("Twitter") ||
        navigator.userAgent.includes("Line")
    );
  }, []);

  const { activeStep, setStep, backStep, nextStep } = useSteps({
    totalSteps: 2,
  });

  const onCloseExportModal = () => {
    onClose();
    setStep(1);
  };

  return (
    <>
      <button
        onClick={handleContinueSignIn}
        className={`mt-12 flex h-12 w-[260px] items-center justify-center rounded-full bg-black font-bold text-white transition duration-150 ease-in-out hover:bg-gray-600 ${className}`}
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

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onCloseExportModal}
        isOpen={isOpen}
        isCentered
        size="md"
        scrollBehavior="outside"
      >
        <AlertDialogOverlay />

        <AlertDialogContent borderRadius={25} marginX={4}>
          <AlertDialogHeader></AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            {activeStep === 1 && (
              <div className="flex items-center">
                <img className=" mr-4 h-20" src={hand} alt=""/>
                <div className="flex flex-col">
                  <span>
                    Welcome to <b>Gimmesong</b>. Please open in default browser.
                  </span>
                  <div className="mx-2 mt-3 flex">
                    <img className=" mr-3 h-8" src={google} alt=""/>
                    <img className=" mr-3 h-8" src={safari} alt=""/>
                    <img className=" mr-3 h-8" src={samsung} alt=""/>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="relative flex items-center justify-center ">
                <img className="absolute h-64 rounded-xl" src={howGif} alt=""/>
                <img className=" h-72 rounded-xl" src={gifBg} alt=""/>
              </div>
            )}
          </AlertDialogBody>
          <AlertDialogFooter display={`flex`} justifyContent={`center`}>
            {activeStep !== 2 ? (
              <Button
              w="full"
              onClick={nextStep}
              borderRadius="25"
              bgColor="black"
              color="white"
              h={42}
              _hover={{ bg: "#000000" }}
              _active={{
                bg: "#000000",
              }}
            >
              See how?
            </Button>
            ) : (
              <Button
                    w="full"
                    onClick={backStep}
                    borderRadius="25"
                    bgColor="black"
                    color="white"
                    h={42}
                    _hover={{ bg: "#000000" }}
                    _active={{
                      bg: "#000000",
                    }}
                  >
                    Back
                  </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SignInMethod;
