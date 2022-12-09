import { useState, useRef } from "react";

import Slider from "react-slick";

import toast from "react-hot-toast";
import GimmesongAPI from "@lib/gimmesong_api";

import disc from "@assets/img/disc.webp";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import presentEmoji from "@assets/img/present_emoji.png";

function WriteMessage({ next, receiver, song }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedDisk, setSelectedDisk] = useState(0);

  const slider = useRef(null);
  const settings = {
    className: "center mx-1",
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
  };
  const discs = [
    {
      disc: disc,
      center: shushingEmoji,
    },
    {
      disc: disc,
      center: presentEmoji,
    },
    {
      disc: disc,
      center: shushingEmoji,
    },
    {
      disc: disc,
      center: shushingEmoji,
    },
    {
      disc: disc,
      center: shushingEmoji,
    },
  ];

  const handleMessageChange = (val) => {
    if (val.length > 100) return;
    setMessage(val);
  };

  const sendSong = async () => {
    if (loading) return;
    if (!receiver || !song) return;
    if (!message.trim()) {
      toast("Please write me a message 🥹", {
        style: {
          borderRadius: "25px",
          background: "#FF6464",
          color: "#fff",
        },
      });
      return;
    }
    // implement send song logic here
    try {
      setLoading(true);
      const success = await GimmesongAPI.sendSong(receiver, message, song);
      if (success) {
        // if success then go to next step
        next();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center">
      <div className="flex w-full flex-row items-center justify-start ">
        <span className="gimmesong-secondary-font text-2xl font-extrabold">
          Select disc
        </span>
      </div>

      <div className="w-full pb-8">
        <Slider ref={slider} {...settings}>
          {discs.map((item, i) => {
            return (
              <div
                className={`h-full w-full rounded-2xl p-0.5 ${
                  selectedDisk === i
                    ? "bg-gradient-to-b from-[#86C7DF] via-[#8583D6] to-[#C697C8]"
                    : "bg-black/[.05]"
                }`}
                key={i}
              >
                <button
                  className="h-full w-full rounded-2xl border  bg-white p-1"
                  onClick={() => setSelectedDisk(i)}
                >
                  <div className="relative pt-[100%]">
                    <img
                      className="absolute inset-0 h-full w-full select-none object-contain"
                      src={item.disc}
                      alt="disc"
                    />

                    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                      <img
                        className="h-[20%] w-[20%] select-none object-contain"
                        src={item.center}
                        alt="disc"
                      />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="flex h-[360px] w-full flex-col items-center justify-between rounded-[36px] border border-gray-200 bg-white p-3">
        <span className="mt-3 bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-transparent">
          gimmesong.link/@{receiver}
        </span>
        <textarea
          disabled={loading}
          value={message}
          className="my-auto w-full resize-none px-2 text-center outline-none"
          placeholder="“ Write something ”"
          rows={6}
          onChange={(e) => handleMessageChange(e.target.value)}
        />

        <div
          className={`pointer-events-none flex h-16 w-full items-center justify-between rounded-full bg-white bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] p-3 pr-4 text-white hover:bg-gray-100`}
        >
          <div className="flex items-center overflow-hidden">
            <img
              className="h-10 w-10 shrink-0 select-none rounded-full object-contain"
              src={song.thumbnails[0]?.url}
              alt="thumbnail"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="mx-2.5 flex min-w-0 flex-col">
              <span className={`truncate text-sm`}>{song.title}</span>
              <span className={`truncate text-xs text-white`}>
                {song.artistInfo?.artist[0]?.text}
              </span>
            </div>
          </div>
          {/* <div className="text-xs">{song.length}</div> */}
        </div>
      </div>
      <button
        disabled={loading}
        onClick={sendSong}
        className="gimmesong-primary-font mt-5 inline-flex h-12 w-[250px] items-center justify-center rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        {loading && (
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        SEND
      </button>
    </div>
  );
}

export default WriteMessage;
