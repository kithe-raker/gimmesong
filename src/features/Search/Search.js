import { useState, useEffect, createContext } from "react";

import PasteLink from "./components/PasteLink.js";
import Sent from "./components/Sent.js";
import SearchSong from "./components/SearchSong.js";
import WriteMessage from "./components/WriteMessage.js";

import Loading from "@components/Loading";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import GimmesongAPI from "@lib/gimmesong_api";
import SearchSongBanner from "@components/Adsense/SearchSongBanner.js";

export const SearchContext = createContext();

function Search() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [receiver, setReceiver] = useState(null);
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);

  // if path contain /@:username this effect will run
  useEffect(() => {
    const checkUserExist = async () => {
      setLoading(true);
      try {
        const isExist = await GimmesongAPI.checkUserExist(username);

        if (isExist) {
          setCurrentStep(2);
          setReceiver(username);
        } else {
          toast("Username doesn't exist", {
            style: {
              borderRadius: "25px",
              background: "#FF6464",
              color: "#fff",
            },
          });
          navigate("/search");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (username) checkUserExist();
  }, [username]);

  const nextStep = () => {
    setCurrentStep((step) => (step += 1));
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

  /**
   * @dev discuss the function below, don't worry about variable that depends on previous step
   * because if user isn't complete their current step, they can't go to the next step.
   * and variable call won't fire an error
   */

  let render;
  switch (currentStep) {
    case 1:
      render = <PasteLink />;
      break;
    case 2:
      render = <SearchSong />;
      break;
    case 3:
      render = <WriteMessage />;
      break;
    case 4:
      render = <Sent />;
      break;
    default:
      break;
  }

  const store = {
    state: { receiver },
    data: { song },
    action: {
      selectSong: handleSongChange,
      selectReceiver: handleReceiverChange,
      next: nextStep,
    },
  };

  return (
    <SearchContext.Provider value={store}>
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
        {loading ? <Loading fullScreens /> : render}
        <div className=" relative mt-6 h-full w-full max-w-full">
          <SearchSongBanner />
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default Search;
