import { useState } from "react";
import EmptySong from "./EmptySong";

function FavoriteSong() {
  const [songs, setSongs] = useState([]);

  return songs.length > 0 ? null : <EmptySong />;
}

export default FavoriteSong;
