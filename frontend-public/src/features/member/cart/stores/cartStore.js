import { create } from "zustand";

export const useCartStore = create((set) => ({
    carts: null,
    setCarts: (data) => set({ carts: data })
}));