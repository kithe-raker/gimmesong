import { useEffect, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import useDoubleClick from "use-double-click";
import CardSide from "./components/CardSide";

/**
 * A flippable song card that have front and back side (double tap to flip). Front side has emoji at the center, back side has emoji as center. Used in my songs page and view playlist page.
 * @param item the song item to be rendered.
 * @param spin whether or not this song's disc should spin (will be paused if spinningPaused = true, but still preserves rotation).
 * @param spinningPaused whether or not to pause this song's disc spinning (will still preserve the disc's rotation).
 * @param showMessage whether or not to render the content message below the disc.
 * @param flippedInitially whether or not this component will start rendering on it flipped side.
 * @param onFlip a callback function to be called when this component is being flipped.
 * @param onClick a callback function to be called when this component is being clicked.
 * @param cardClassName a className to be added to the entire card.
 * @param containerClassName a className to be added to the container that renders the disc.
 */
function SongCard({
  item,
  spin = false,
  spinningPaused = false,
  showMessage = false,
  flippedInitially = false,
  onFlip = () => {},
  onClick = () => {},
  cardClassName = "",
  containerClassName = "",
}) {
  const [flipped, setFlipped] = useState(flippedInitially);

  const toggleFlipped = () => {
    onFlip();
    setFlipped(!flipped);
  };

  return (
    <ReactCardFlip isFlipped={flipped}>
      <CardSide
        onClick={onClick}
        onDoubleClick={toggleFlipped}
        item={item}
        spin={spin}
        spinningPaused={spinningPaused}
        cardClassName={cardClassName}
        containerClassName={containerClassName}
        showMessage={showMessage}
      />

      <CardSide
        renderEmoji
        onClick={onClick}
        onDoubleClick={toggleFlipped}
        item={item}
        spin={spin}
        spinningPaused={spinningPaused}
        cardClassName={cardClassName}
        containerClassName={containerClassName}
        showMessage={showMessage}
      />
    </ReactCardFlip>
  );
}

export default SongCard;
