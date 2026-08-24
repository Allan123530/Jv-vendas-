import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'

interface AuthStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setIsLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))

interface NotificationStore {
  message: string | null
  type: 'success' | 'error' | 'info' | null
  show: (message: string, type: 'success' | 'error' | 'info') => void
  clear: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  message: null,
  type: null,
  show: (message, type) => set({ message, type }),
  clear: () => set({ message: null, type: null }),
}))
