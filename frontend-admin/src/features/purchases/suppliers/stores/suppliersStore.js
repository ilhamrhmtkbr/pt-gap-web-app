import { create } from 'zustand'

export const useSuppliersStore = create((set) => ({
    data: null,
    setData: data => set({ data }),
}))
