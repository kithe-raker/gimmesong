import create from "zustand";

const useAuth = create((set) => ({
  user: null,
  setUser: (val) => set({ user: val }),
}));

export default useAuth;
