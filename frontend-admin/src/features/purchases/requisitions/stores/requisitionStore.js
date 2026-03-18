import { create } from 'zustand'

export const useRequisitionStore = create((set) => ({
    data: null,
    setData: data => set({ data }),
}))
