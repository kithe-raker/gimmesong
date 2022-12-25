import SongCard from "@components/SongCard";
import { useState } from "react";

/**
 * A song card component that maintain it's own flipped state. See SongCard component for props documentation (except for flipped property, which has no effect on this component, as the flipped state is maintained by the component itself).
 */
function MaintainedSongCard({
  item,
  spin = false,
  spinningPaused = false,
  showMessage = false,
  onFlip = () => {},
  onClick = () => {},
  cardClassName = "",
  containerClassName = "",
}) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => {
    onFlip();
    setFlipped(!flipped);
  };

  return (
    <SongCard
      onClick={onClick}
      onFlip={toggleFlip}
      item={item}
      spin={spin}
      spinningPaused={spinningPaused}
      flipped={flipped}
      showMessage={showMessage}
      cardClassName={cardClassName}
      containerClassName={containerClassName}
    />
  );
}

export default MaintainedSongCard;
