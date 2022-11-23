import { useRef } from "react";

import { useSteps } from "@hooks/useSteps";
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

import First from "../assets/WhereLink/1.png";
import Second from "../assets/WhereLink/2.png";

function WhereLink() {
  const { activeStep, setStep, backStep, nextStep } = useSteps({
    totalSteps: 4,
  });

  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onCloseExportModal = () => {
    onClose();
    setStep(1);
  };

  return (
    <>
      <button
        className="mt-3 w-full rounded-full border px-8 py-4 text-center font-semibold shadow-md"
        onClick={onOpen}
      >
        Where is my gimmesong link to share with friends?
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
          <AlertDialogHeader>Where is my gimmesong link?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            {activeStep === 1 && (
              <div className="mt-3 flex flex-col items-center">
                <img className=" rounded-3xl" src={First} alt="step1" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    1
                  </div>
                  <p className="text-md">
                    Click
                    <svg
                      className={`mx-2 inline`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.379,19.1403 L12.108,12.5993 L19.467,5.2413 L15.379,19.1403 Z M4.86,8.6213 L18.76,4.5343 L11.401,11.8923 L4.86,8.6213 Z M3.359,8.0213 C2.923,8.1493 2.87,8.7443 3.276,8.9483 L11.128,12.8733 L15.053,20.7243 C15.256,21.1303 15.852,21.0773 15.98,20.6413 L20.98,3.6413 C21.091,3.2623 20.739,2.9093 20.359,3.0213 L3.359,8.0213 Z"
                      />
                    </svg>
                    button on the top right.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={Second} alt="step2" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    2
                  </div>
                  <p className="text-md">
                    You will see the <b>link</b> here! and you can click on
                    <svg
                      className="mx-2 inline h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    button to copy link.
                  </p>
                </div>
              </div>
            )}
            {}
          </AlertDialogBody>
          <AlertDialogFooter display={`flex`} justifyContent={`center`}>
            {activeStep !== 2 ? (
              <>
                <Button
                  w="full"
                  onClick={nextStep}
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
                  Next
                </Button>
              </>
            ) : (
              <>
                <Button
                  w="full"
                  borderRadius="25"
                  mr={2}
                  onClick={backStep}
                  h={42}
                >
                  Previous
                </Button>
                <Button
                  w="full"
                  onClick={onCloseExportModal}
                  borderRadius="25"
                  bgColor="black"
                  color="white"
                  h={42}
                  _hover={{ bg: "#000000" }}
                  _active={{
                    bg: "#000000",
                  }}
                >
                  Finish!
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default WhereLink;
