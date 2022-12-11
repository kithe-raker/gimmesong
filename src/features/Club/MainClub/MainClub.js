import { useNavigate } from "react-router-dom";

import christmasTreeEmoji from "@assets/img/christmas_tree_emoji.png";
import cameraEmoji from "@assets/img/camera_emoji.png";
import heartEmoji from "@assets/img/heart_emoji.png";
import rockEmoji from "@assets/img/rock_emoji.png";
import sadEmoji from "@assets/img/sad_emoji.png";

function MainClub() {
  const navigate = useNavigate();
  //TODO: fetch clubs from api instead of this hard-coding
  const clubs = [
    {
      title: "Sad",
      emoji: sadEmoji,
      urllink: "/sad",
    },
    {
      title: "Song w/ IG",
      emoji: cameraEmoji,
      urllink: "/songwithig",
    },
    {
      title: "In love",
      emoji: heartEmoji,
      urllink: "/inlove",
    },
    {
      title: "Christmas",
      emoji: christmasTreeEmoji,
      urllink: "/christmas",
    },
    {
      title: "Rock",
      emoji: rockEmoji,
      urllink: "/rock",
    },
  ];

  return (
    <div className="gimmesong-secondary-font px-4 mt-12 flex w-full max-w-md flex-col items-start justify-start">
      <span className="text-2xl font-extrabold">Join the club 🍸</span>
      <span className="mt-1 text-lg font-medium">Select club</span>

      <div className="mt-5 flex flex-wrap">
        {clubs.map((club, i) => (
          <button
            className="m-2"
            key={i}
            onClick={() => navigate(`/club${club.urllink}`)}
          >
            <div className="flex flex-row items-center justify-center rounded-3xl bg-white px-3 py-2 hover:bg-gray-100">
              <img
                className="mr-2 h-[17px] w-[17px]"
                src={club.emoji}
                alt="emoji"
              />
              <span>{club.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MainClub;
