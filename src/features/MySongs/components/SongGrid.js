import disc from "@assets/img/disc.webp";
import shushingEmoji from "@assets/img/shushing_emoji.png";
import { useContext } from "react";
import { ReceivedSongsContext } from "./ReceivedSongs";

function SongGrid({ title, songs }) {
  const {
    data: { items, current, playing },
    action: { selectSong: handleSelect },
  } = useContext(ReceivedSongsContext);
  
  return (
    <>
      <span className="gimmesong-secondary-font text-xl font-medium">
        {title}
      </span>

      <div
        className={`grid grid-cols-2 gap-4 overflow-x-hidden pt-4 ${
          current !== null ? "pb-[88px]" : "pb-[30px]"
        }`}
      >
        {songs.map((item, i) => (
          <div
            onClick={() => handleSelect(i)}
            key={i}
            className={`relative w-[160px] cursor-pointer pt-[100%] ${
              items[current]?.id === item.id ? "animate-spin-slow" : ""
            } ${
              !playing && items[current]?.id === item.id ? "animate-pause" : ""
            }`}
          >
            <img
              className="absolute inset-0 h-full w-full select-none object-contain"
              src={disc}
              alt="disc"
            />
            {item.played ? (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                {item.content?.song?.thumbnails?.length > 0 && (
                  <img
                    className="h-[27%] w-[27%] select-none rounded-full object-contain"
                    src={item.content?.song?.thumbnails[0]?.url}
                    alt="thumbnail"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                <img
                  className="h-[20%] w-[20%] select-none object-contain"
                  src={shushingEmoji}
                  alt="disc"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default SongGrid;
