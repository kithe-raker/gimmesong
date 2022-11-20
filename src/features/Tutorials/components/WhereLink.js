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
    <div className="mt-3 flex justify-center">
      <button
        className="w-full rounded-full border px-8 py-4 text-center text-sm font-semibold"
        onClick={onOpen}
      >
        <span>Where is my gimmesong link fo share with friends?</span>
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
                    Click the left button that has <b>send icon</b> on the top
                    right.
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
                    You will see the <b>link</b> here! and you can click the{" "}
                    <b>copy button</b> to copy link.
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
                  ref={cancelRef}
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
    </div>
  );
}

export default WhereLink;
