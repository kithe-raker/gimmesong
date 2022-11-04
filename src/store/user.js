import create from "zustand";

const userSession = create((set) => ({
  user: null,
  setUser: (val) => set({ user: val }),
}));

export default userSession;
