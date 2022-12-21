import { createContext, useState } from "react";

import GimmesongAPI from "@lib/gimmesong_api";

export const DiscListContext = createContext();

function DiscListProvider({ children }) {
  const [isLoading, setLoading] = useState(false);

  const [discs, setDiscs] = useState([]);

  const fetchDiscs = async () => {
    setLoading(true);
    const respond = await GimmesongAPI.User.queryVinylStyleInventory();
    let result = [];
    for (let i = 0; i < respond.disc.length; i++) {
      for (let j = 0; j < respond.emoji.length; j++) {
        result.push({
          disc: respond.disc[i],
          emoji: respond.emoji[j],
        });
      }
    }
    setDiscs(result);
    setLoading(false);
  };

  const store = {
    state: { isLoading },
    data: { discs },
    action: { fetchDiscs },
  };

  return (
    <DiscListContext.Provider value={store}>
      {children}
    </DiscListContext.Provider>
  );
}

export default DiscListProvider;
