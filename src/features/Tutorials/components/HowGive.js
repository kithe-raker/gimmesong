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

import First from "../assets/HowGive/1.png";
import Second from "../assets/HowGive/2.png";
import Third from "../assets/HowGive/3.png";
import Forth from "../assets/HowGive/4.png";

function HowGive() {

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
        How to give someone a song?
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
          <AlertDialogHeader>How to give someone a song?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            {activeStep === 1 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={First} alt="step1" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    1
                  </div>
                  <p className="text-md">
                    <b>Click</b> the link that your friend shared on social
                    media.
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
                    Type to search for the <b>song</b> that you want and click{" "}
                    <b>Next</b>.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={Third} alt="step3" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    3
                  </div>
                  <p className="text-md">
                    <b>Say</b> something to your friend, then click <b>Send</b>.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={Forth} alt="step4" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    4
                  </div>
                  <p className="text-md">
                    <b>Congratulation</b>! Your song has been sent to your
                    friend. If you want to send more, Click on{" "}
                    <b>Send another song</b>.
                  </p>
                </div>
              </div>
            )}
            {}
          </AlertDialogBody>
          <AlertDialogFooter display={`flex`} justifyContent={`center`}>
            {activeStep !== 4 ? (
              activeStep == 1 ? (
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
                    Next
                  </Button>
                </>
              )
            ) : (
              <>
                <Button
                  w="full"
                  borderRadius="25"
                  onClick={backStep}
                  h={42}
                  mr={2}
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

export default HowGive;
