import { create } from 'zustand'
import { Data } from '@/components/common/bar-charts'

interface locationState {
  location: Data[]
  setLocation: (payload: Data[]) => void
}

export const useLocationStore = create<locationState>((set) => ({
  location: [],
  setLocation: (payload) => {
    set(() => ({ location: [...payload] }))
  },
}))
