import create from "zustand";
import { persist } from "zustand/middleware";

let tokenStore = (set) => ({
  bearerToken: null,
  setBearerToken: (token) => set({ bearerToken: token }),
  clearBearerToken: () => set({ bearerToken: null }),
});

tokenStore = persist(tokenStore, { name: "token_store" });
export const useTokenStore = create(tokenStore);
