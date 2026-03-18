import { create } from 'zustand'

export const useInventoriesStore = create((set) => ({
    data: null,
    setData: data => set({ data }),
}))
