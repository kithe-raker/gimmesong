import { useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import useDoubleClick from "use-double-click";

/**
 * Song will have 2 side, front and back (front have the song cover as center, back have song emoji as center, anything else should be identical)
 */
function SongCardSide({
  currentItem,
  item,
  playing,
  showMessage = false,
  forceRenderEmoji = false,
  onClick = () => {},
  onDoubleClick = () => {},
  containerClassName = "",
}) {
  const clickRef = useRef();

  useDoubleClick({
    onSingleClick: onClick,
    onDoubleClick: onDoubleClick,
    ref: clickRef,
    latency: 300,
  });
  return (
    <div className="outline-none" ref={clickRef}>
      <div className="flex flex-col items-center justify-center">
        <div className={`mt-6 w-[90%] ${containerClassName}`}>
          <div
            className={`relative w-full pt-[100%] ${
              currentItem?.id === item.id ? "animate-spin-slow" : ""
            } ${
              !playing && currentItem?.id === item.id ? "animate-pause" : ""
            }`}
          >
            <img
              className="absolute inset-0 h-full w-full select-none object-contain"
              src={item.vinyl_style?.disc?.image_url}
              alt="disc"
            />
            {item.played && !forceRenderEmoji ? (
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
                  src={item.vinyl_style?.emoji?.image_url}
                  alt="disc"
                />
              </div>
            )}
          </div>
        </div>
        {showMessage && currentItem?.id === item.id && (
          <span
            style={{
              wordBreak: "break-word",
              whiteSpace: "pre-line",
            }}
            className="my-6 w-full text-center text-xl leading-6 text-gray-700"
          >
            {item.content?.message}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * A flippable song card that have front and back side (double tap to flip)
 */
function SongCard({
  currentItem,
  item,
  playing,
  showMessage = false,
  onClick = () => {},
  onDoubleClick = () => {},
  containerClassName = "",
}) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlipped = () => {
    setFlipped(!flipped);
  };

  return (
    <ReactCardFlip isFlipped={flipped}>
      <SongCardSide
        onClick={onClick}
        onDoubleClick={toggleFlipped}
        currentItem={currentItem}
        item={item}
        playing={playing}
        containerClassName={containerClassName}
        showMessage={showMessage}
      />

      <SongCardSide
        forceRenderEmoji
        onClick={onClick}
        onDoubleClick={toggleFlipped}
        currentItem={currentItem}
        item={item}
        playing={playing}
        containerClassName={containerClassName}
        showMessage={showMessage}
      />
    </ReactCardFlip>
  );
}

export default SongCard;
