import create from "zustand";

const useSong = create((set) => ({
  newReceivedSongs: [],
  allReceivedSongs: [],
  setNewReceived: (val) => set({ newReceivedSongs: val }),
  setAllReceived: (val) => set({ allReceivedSongs: val }),
}));

export default useSong;
