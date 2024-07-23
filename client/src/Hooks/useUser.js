import { create } from 'zustand'

const useUser = create((set) => ({
  user: null,
  setUser: (value) => set((state) => ({ user:value })),
 
}))

export default useUser