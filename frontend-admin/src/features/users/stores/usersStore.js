import { create } from 'zustand'

export const useUsersStore = create((set) => ({
    data: null,
    setData: data => set({ data }),
}))
