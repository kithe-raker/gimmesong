import christmasTreeEmoji from "@assets/img/christmas_tree_emoji.png";
import cameraEmoji from "@assets/img/camera_emoji.png";
import heartEmoji from "@assets/img/heart_emoji.png";
import rockEmoji from "@assets/img/rock_emoji.png";
import sadEmoji from "@assets/img/sad_emoji.png";

function Club() {
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
    <div className="gimmesong-secondary-font mt-14 flex flex-col items-start justify-start">
      <span className="text-2xl font-extrabold">Join the club 🍸</span>
      <span className="mt-1 text-lg font-medium">Select club</span>

      <div className="flex flex-wrap">
        {clubs.map((club, i) => (
          <button className="m-3" key={i}>
            <div className="flex flex-row items-center justify-center rounded-3xl bg-white px-3 py-2 hover:bg-gray-100">
              <img className="w-[17px] h-[17px] mr-2" src={club.emoji} alt="emoji"></img>
              <span>{club.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Club;
