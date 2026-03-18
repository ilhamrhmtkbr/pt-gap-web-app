import {create} from "zustand";

export const useTransactionStore = create(set => ({
    transactions: null,
    setTransactions: data => set({transactions: data})
}))