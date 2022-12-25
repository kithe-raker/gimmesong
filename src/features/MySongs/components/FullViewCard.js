import SongCard from "@components/SongCard";
import { useContext } from "react";
import { ReceivedSongsContext } from "./ReceivedSongs";

/**
 * A song card in full view mode.
 */
function FullViewCard({ index }) {
  const {
    data: { items, current, playing, flipped },
    action: { handleFlip, getDate, getDateText },
  } = useContext(ReceivedSongsContext);

  const item = items[index];
  const isCurrent = item.id === items[current]?.id;

  const dateText = getDateText(getDate(item));
  const title = isCurrent ? "Date" : null;
  const subtitle = isCurrent ? dateText : null;

  return (
    <div>
      <div className="flex h-[64px] flex-col items-center justify-center overflow-hidden">
        {title && (
          <span
            style={{
              wordBreak: "break-word",
              whiteSpace: "pre-line",
            }}
            className="mt-6 w-full text-center text-base font-bold leading-6 text-gray-700"
          >
            {title}
          </span>
        )}
        {subtitle && (
          <span
            style={{
              wordBreak: "break-word",
              whiteSpace: "pre-line",
            }}
            className="mt-1 w-full text-center text-base leading-6 text-gray-700"
          >
            {subtitle}
          </span>
        )}
      </div>

      <SongCard
        onFlip={() => handleFlip(index)}
        showMessage={isCurrent}
        spin={isCurrent}
        spinningPaused={!playing && isCurrent}
        flipped={flipped[index]}
        item={item}
        key={item.id}
      />
    </div>
  );
}

export default FullViewCard;
