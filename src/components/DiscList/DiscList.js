import { useEffect, useState } from "react";

import GimmesongAPI from "@lib/gimmesong_api";

import Slider from "./component/Slider";

/**
 * A component that display a list of all discs that the user own. Also has ability to highlight 1 disc (to mark as selected).
 * @param {*} param0
 * @returns
 */
function DiscList({
  selectedDisc,
  setSelectedDisc,
  className = "",
  perView = 3,
}) {
  const [isLoading, setLoading] = useState(false);

  const [discs, setDiscs] = useState([]);

  const fetchDiscs = async () => {
    setLoading(true);
    const respond = await GimmesongAPI.User.queryVinylStyleInventory();
    let result = [];
    for (let i = 0; i < respond.background.length; i++) {
      result.push({
        background: respond.background[i],
        center: respond.center[i],
      });
    }
    setDiscs(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchDiscs();
    console.log("use effect triggered");
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <Slider
        discs={discs}
        selectedDisc={selectedDisc}
        setSelectedDisc={setSelectedDisc}
        perView={perView}
      />
    </div>
  );
}

export default DiscList;
