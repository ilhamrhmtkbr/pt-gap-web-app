import { create } from 'zustand'

export const useSalesStore = create((set) => ({
    data: null,
    setData: data => set({ data }),
}))
