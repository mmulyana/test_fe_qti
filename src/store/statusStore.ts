import { create } from 'zustand'
import { Data } from '@/components/common/bar-charts'

interface statusState {
  status: Data[]
  addStatus: (payload: Data) => void
  setStatus: (payload: Data[]) => void
}

export const useStatusStore = create<statusState>((set) => ({
  status: [],
  addStatus: (payload) => {
    set((state) => ({ status: [...state.status, payload] }))
  },
  setStatus: (payload) => {
    set(() => ({ status: [...payload] }))
  },
}))
