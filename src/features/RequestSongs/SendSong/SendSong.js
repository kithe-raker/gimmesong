import { useState, useEffect } from "react";

// import PasteLink from "./components/PasteLink.js";
import Sent from "./components/Sent.js";
import SearchSong from "./components/SearchSong.js";
import WriteMessage from "./components/WriteMessage.js";

import Loading from "@components/Loading";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import GimmesongAPI from "@lib/gimmesong_api";
import Ads from "@lib/ads.js";

function SendSong() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [receiver, setReceiver] = useState(null);
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);

  // Call Native banner ads
  Ads.NativeBanner();

  useEffect(() => {
    const checkPlaylistExist = async () => {
      setLoading(true);
      try {
        // implement api here
        const isExist = true;

        if (isExist) {
          setReceiver(id);
        } else {
          toast("Playlist doesn't exist", {
            style: {
              borderRadius: "25px",
              background: "#FF6464",
              color: "#fff",
            },
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) checkPlaylistExist();
  }, [id]);

  const nextStep = () => {
    setCurrentStep((step) => (step += 1));
  };

  /**
   * @dev below component function will end within the component
   * and only return the final value to parent.
   */

  const handleSongChange = (song) => {
    setSong(song);
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
        <SearchSong
          receiver={receiver}
          onSelectSong={handleSongChange}
          next={nextStep}
        />
      );
      break;
    case 2:
      render = <WriteMessage receiver={receiver} song={song} next={nextStep} />;
      break;
    case 3:
      render = <Sent receiver={receiver} />;
      break;
    default:
      break;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      {loading ? <Loading fullScreens /> : render}
      <div
        className="mt-12"
        id="container-b660ec7b99553839c4654ee4a1292d71"
      ></div>
    </div>
  );
}

export default SendSong;
