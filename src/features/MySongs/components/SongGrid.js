import disc from "@assets/img/disc.webp";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import { useContext } from "react";
import { ReceivedSongsContext } from "./ReceivedSongs";
import SongCard from "./SongCard";

function SongGrid({ title, songs }) {
  const {
    data: { items, current, playing },
    action: { selectSong, playSong  },
  } = useContext(ReceivedSongsContext);

  return (
    <>
      <span className="gimmesong-secondary-font text-xl font-medium">
        {title}
      </span>

      <div
        className={`grid grid-cols-2 gap-4 overflow-x-hidden pt-4 ${
          current !== null ? "pb-[88px]" : "pb-[24px]"
        }`}
      >
        {songs.map((item, i) => (
          <SongCard
            onClick={() => selectSong(i)}
            playDisc={() => playSong(i)}
            key={i}
            currentItem={items[current]}
            item={item}
            playing={playing}
            cardClassName="w-[160px]"
          />
        ))}
      </div>
    </>
  );
}

export default SongGrid;
