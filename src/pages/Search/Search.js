import { useState } from "react";
import PasteLink from "./components/PasteLink.js";
import Sent from "./components/Sent.js";
import SearchSong from "./components/SearchSong.js";
import WriteMessage from "./components/WriteMessage.js";

function Search() {
  const [currentStep, setCurrentStep] = useState(1);
  const [receiver, setReceiver] = useState(null);
  const [song, setSong] = useState(null);
  const [message, setMessage] = useState("");

  const nextStep = () => {
    setCurrentStep((step) => (step += 1));
  };

  const sendSong = () => {
    if (!receiver || !song) return;

    // implement send song logic here
    const data = {
      receiver,
      song,
      message,
    };

    // if success then go to next step
    nextStep();
  };

  const goSomewhere = () => {
    console.log("go go go");
  };

  /**
   * @dev below component function will end within the component
   * and only return the final value to parent.
   */

  const handleReceiverChange = (user) => {
    setReceiver(user);
  };

  const handleSongChange = (song) => {
    setSong(song);
  };

  const handleMessageChange = (msg) => {
    setMessage(msg);
  };

  /**
   * @dev discuss the function below, don't worry about variable that depends on previous step
   * because if user isn't complete their current step, they can't go to the next step.
   * and variable call won't fire an error
   */

  let render;
  switch (currentStep) {
    case 1:
      render = (
        <PasteLink onSelectReceiver={handleReceiverChange} next={nextStep} />
      );
      break;
    case 2:
      render = (
        <SearchSong
          receiver={receiver}
          onSelectSong={handleSongChange}
          next={nextStep}
        />
      );
      break;
    case 3:
      render = (
        <WriteMessage
          receiver={receiver}
          song={song}
          onTypingMessage={handleMessageChange}
          next={sendSong}
        />
      );
      break;
    case 4:
      render = <Sent next={goSomewhere} />;
      break;
    default:
      break;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <div className="my-4 w-full max-w-[300px] bg-gray-300 p-5">ADS</div>
      {render}
    </div>
  );
}

export default Search;
