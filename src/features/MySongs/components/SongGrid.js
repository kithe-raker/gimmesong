import disc from "@assets/img/disc.webp";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import { useContext } from "react";
import { ReceivedSongsContext } from "./ReceivedSongs";
import SongCard from "@components/SongCard";

function SongGrid({ title, songs }) {
  const {
    data: { current, items, flipped, playing },
    action: { handleSelect, handleFlip },
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
        {songs.map(
          (item, i) => {
            const isCurrent = item.id === items[current]?.id;

            return (
              <SongCard
                onClick={() => handleSelect(i)}
                onFlip={() => handleFlip(i)}
                spin={isCurrent}
                spinningPaused={!playing && isCurrent}
                item={item}
                flipped={flipped[i]}
                cardClassName="w-[160px]"
                key={item.id}
              />
            );
          }
          // <SongCard
          //   onClick={() => selectSong(i)}
          //   playDisc={() => playSong(i)}
          //   key={i}
          //   item={item}
          //   cardClassName="w-[160px]"
          // />
        )}
      </div>
    </>
  );
}

export default SongGrid;
