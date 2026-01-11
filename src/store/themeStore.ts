import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'dark' | 'light' | 'quantum' | 'neon' | 'holographic'
  customTheme: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
  animations: boolean
  particles: boolean
  soundEffects: boolean
  hapticFeedback: boolean
  
  // Actions
  setTheme: (theme: 'dark' | 'light' | 'quantum' | 'neon' | 'holographic') => void
  setCustomTheme: (theme: any) => void
  toggleAnimations: () => void
  toggleParticles: () => void
  toggleSoundEffects: () => void
  toggleHapticFeedback: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      customTheme: {
        primary: '#00ffff',
        secondary: '#ff00ff',
        accent: '#8b5cf6',
        background: '#000000',
      },
      animations: true,
      particles: true,
      soundEffects: true,
      hapticFeedback: true,
      
      setTheme: (theme) => set({ theme }),
      
      setCustomTheme: (customTheme) => set({ customTheme }),
      
      toggleAnimations: () => set((state) => ({ animations: !state.animations })),
      
      toggleParticles: () => set((state) => ({ particles: !state.particles })),
      
      toggleSoundEffects: () => set((state) => ({ soundEffects: !state.soundEffects })),
      
      toggleHapticFeedback: () => set((state) => ({ hapticFeedback: !state.hapticFeedback })),
    }),
    {
      name: 'theme-store',
    }
  )
)
