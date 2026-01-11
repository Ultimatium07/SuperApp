import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { persist } from 'zustand/middleware'

interface QuantumState {
  // User quantum data
  quantumXP: number
  quantumLevel: number
  quantumEnergy: number
  maxEnergy: number
  
  // Mining data
  miningPower: number
  autoMiningRate: number
  totalMined: number
  criticalChance: number
  criticalMultiplier: number
  
  // AI features
  aiModelLoaded: boolean
  neuralNetworkActive: boolean
  processingQueue: Array<{
    id: string
    type: 'image' | 'text' | 'audio'
    data: any
    status: 'pending' | 'processing' | 'completed' | 'error'
  }>
  
  // Quantum particles
  particles: Array<{
    id: string
    x: number
    y: number
    vx: number
    vy: number
    color: string
    size: number
  }>
  
  // Achievements
  achievements: Array<{
    id: string
    name: string
    description: string
    unlocked: boolean
    unlockedAt?: Date
  }>
  
  // Actions
  initializeQuantumState: () => void
  addQuantumXP: (amount: number) => void
  consumeEnergy: (amount: number) => boolean
  rechargeEnergy: () => void
  upgradeMiningPower: () => void
  upgradeAutoMining: () => void
  upgradeCriticalChance: () => void
  addParticle: (particle: any) => void
  updateParticles: () => void
  addToProcessingQueue: (item: any) => void
  processQueue: () => void
  unlockAchievement: (id: string) => void
}

export const useQuantumStore = create<QuantumState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        quantumXP: 0,
        quantumLevel: 1,
        quantumEnergy: 1000,
        maxEnergy: 1000,
        
        miningPower: 1,
        autoMiningRate: 0,
        totalMined: 0,
        criticalChance: 0.1,
        criticalMultiplier: 2,
        
        aiModelLoaded: false,
        neuralNetworkActive: false,
        processingQueue: [],
        
        particles: [],
        
        achievements: [
          {
            id: 'first_mine',
            name: 'First Quantum Strike',
            description: 'Mine your first quantum coin',
            unlocked: false,
          },
          {
            id: 'level_10',
            name: 'Quantum Apprentice',
            description: 'Reach level 10',
            unlocked: false,
          },
          {
            id: 'ai_master',
            name: 'AI Overlord',
            description: 'Process 100 files with AI',
            unlocked: false,
          },
        ],
        
        // Actions
        initializeQuantumState: () => {
          const state = get()
          
          // Calculate level based on XP
          const newLevel = Math.floor(state.quantumXP / 1000) + 1
          if (newLevel !== state.quantumLevel) {
            set({ quantumLevel: newLevel })
          }
          
          // Initialize particles
          const particles = Array.from({ length: 50 }, (_, i) => ({
            id: `particle-${i}`,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            color: ['#00ffff', '#ff00ff', '#8b5cf6'][Math.floor(Math.random() * 3)],
            size: Math.random() * 3 + 1,
          }))
          
          set({ particles })
        },
        
        addQuantumXP: (amount: number) => {
          const state = get()
          const newXP = state.quantumXP + amount
          const newLevel = Math.floor(newXP / 1000) + 1
          
          set({
            quantumXP: newXP,
            quantumLevel: newLevel,
          })
          
          // Check achievements
          if (newLevel >= 10) {
            get().unlockAchievement('level_10')
          }
        },
        
        consumeEnergy: (amount: number) => {
          const state = get()
          if (state.quantumEnergy >= amount) {
            set({ quantumEnergy: state.quantumEnergy - amount })
            return true
          }
          return false
        },
        
        rechargeEnergy: () => {
          set({ quantumEnergy: get().maxEnergy })
        },
        
        upgradeMiningPower: () => {
          const state = get()
          const cost = state.miningPower * 100
          if (state.quantumXP >= cost) {
            set({
              quantumXP: state.quantumXP - cost,
              miningPower: state.miningPower + 1,
            })
            return true
          }
          return false
        },
        
        upgradeAutoMining: () => {
          const state = get()
          const cost = state.autoMiningRate * 500 + 1000
          if (state.quantumXP >= cost) {
            set({
              quantumXP: state.quantumXP - cost,
              autoMiningRate: state.autoMiningRate + 1,
            })
            return true
          }
          return false
        },
        
        upgradeCriticalChance: () => {
          const state = get()
          const cost = state.criticalChance * 1000 + 2000
          if (state.quantumXP >= cost && state.criticalChance < 0.5) {
            set({
              quantumXP: state.quantumXP - cost,
              criticalChance: Math.min(state.criticalChance + 0.05, 0.5),
            })
            return true
          }
          return false
        },
        
        addParticle: (particle: any) => {
          set(state => ({
            particles: [...state.particles, { ...particle, id: `particle-${Date.now()}` }]
          }))
        },
        
        updateParticles: () => {
          set(state => ({
            particles: state.particles.map(particle => {
              let { x, y, vx, vy } = particle
              
              // Update position
              x += vx
              y += vy
              
              // Bounce off walls
              if (x <= 0 || x >= window.innerWidth) vx = -vx
              if (y <= 0 || y >= window.innerHeight) vy = -vy
              
              return { ...particle, x, y, vx, vy }
            })
          }))
        },
        
        addToProcessingQueue: (item: any) => {
          set(state => ({
            processingQueue: [...state.processingQueue, {
              ...item,
              id: `queue-${Date.now()}`,
              status: 'pending',
            }]
          }))
        },
        
        processQueue: async () => {
          const state = get()
          const queue = state.processingQueue.filter(item => item.status === 'pending')
          
          for (const item of queue) {
            // Update status to processing
            set(state => ({
              processingQueue: state.processingQueue.map(q =>
                q.id === item.id ? { ...q, status: 'processing' } : q
              )
            }))
            
            try {
              // Simulate AI processing
              await new Promise(resolve => setTimeout(resolve, 2000))
              
              // Update status to completed
              set(state => ({
                processingQueue: state.processingQueue.map(q =>
                  q.id === item.id ? { ...q, status: 'completed' } : q
                )
              }))
              
              // Add XP
              get().addQuantumXP(50)
            } catch (error) {
              // Update status to error
              set(state => ({
                processingQueue: state.processingQueue.map(q =>
                  q.id === item.id ? { ...q, status: 'error' } : q
                )
              }))
            }
          }
        },
        
        unlockAchievement: (id: string) => {
          set(state => ({
            achievements: state.achievements.map(achievement =>
              achievement.id === id
                ? { ...achievement, unlocked: true, unlockedAt: new Date() }
                : achievement
            )
          }))
        },
      }),
      {
        name: 'quantum-store',
        partialize: (state) => ({
          quantumXP: state.quantumXP,
          quantumLevel: state.quantumLevel,
          quantumEnergy: state.quantumEnergy,
          maxEnergy: state.maxEnergy,
          miningPower: state.miningPower,
          autoMiningRate: state.autoMiningRate,
          totalMined: state.totalMined,
          criticalChance: state.criticalChance,
          achievements: state.achievements,
        }),
      }
    )
  )
)

// Auto-save particles position
let particleInterval: NodeJS.Timeout
if (typeof window !== 'undefined') {
  particleInterval = setInterval(() => {
    useQuantumStore.getState().updateParticles()
  }, 50)
}

// Auto-energy recharge
let energyInterval: NodeJS.Timeout
if (typeof window !== 'undefined') {
  energyInterval = setInterval(() => {
    const state = useQuantumStore.getState()
    if (state.quantumEnergy < state.maxEnergy) {
      useQuantumStore.setState({
        quantumEnergy: Math.min(state.quantumEnergy + 1, state.maxEnergy)
      })
    }
  }, 1000)
}

// Auto-mining
let miningInterval: NodeJS.Timeout
if (typeof window !== 'undefined') {
  miningInterval = setInterval(() => {
    const state = useQuantumStore.getState()
    if (state.autoMiningRate > 0) {
      useQuantumStore.getState().addQuantumXP(state.autoMiningRate * 10)
    }
  }, 1000)
}
