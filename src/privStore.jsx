import create from "zustand";
import { persist } from "zustand/middleware";

let privStore = (set) => ({
  privToken: null,
  setPrivToken: (token) => set({ privToken: token }),
  clearPrivToken: () => set({ privToken: null }),
});

privStore = persist(privStore, { name: "priv_store" });
export const usePrivStore = create(privStore);
