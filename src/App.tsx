import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from './store/themeStore'
import { useQuantumStore } from './store/quantumStore'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { HolographicUI } from './components/ui/HolographicUI'
import { NeuralBackground } from './components/effects/NeuralBackground'
import { QuantumParticles } from './components/effects/QuantumParticles'

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'))
const QuantumMining = React.lazy(() => import('./pages/QuantumMining'))
const AIQuiz = React.lazy(() => import('./pages/AIQuiz'))
const BattleArena = React.lazy(() => import('./pages/BattleArena'))
const Wayground = React.lazy(() => import('./pages/Wayground'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Metaverse = React.lazy(() => import('./pages/Metaverse'))
const NeuralLab = React.lazy(() => import('./pages/NeuralLab'))
const Blockchain = React.lazy(() => import('./pages/Blockchain'))

function App() {
  const { theme } = useThemeStore()
  const { initializeQuantumState } = useQuantumStore()

  useEffect(() => {
    // Initialize quantum state on app start
    initializeQuantumState()
    
    // Apply theme to document
    document.documentElement.className = theme
    document.documentElement.setAttribute('data-theme', theme)
    
    // Initialize advanced features
    const initAdvancedFeatures = async () => {
      // Initialize WebGPU if available
      if ('gpu' in navigator) {
        try {
          const adapter = await navigator.gpu.requestAdapter()
          if (adapter) {
            console.log('🚀 WebGPU initialized')
          }
        } catch (error) {
          console.log('⚠️ WebGPU not available')
        }
      }
      
      // Initialize WebXR if available
      if ('xr' in navigator) {
        try {
          const isSupported = await navigator.xr.isSessionSupported('immersive-vr')
          if (isSupported) {
            console.log('🥽 WebXR VR supported')
          }
        } catch (error) {
          console.log('⚠️ WebXR not available')
        }
      }
      
      // Initialize Web3 if available
      if (typeof window !== 'undefined' && window.ethereum) {
        console.log('🔗 Web3 wallet detected')
      }
    }
    
    initAdvancedFeatures()
  }, [theme, initializeQuantumState])

  return (
    <div className="app" data-theme={theme}>
      {/* Background Effects */}
      <NeuralBackground />
      <QuantumParticles />
      
      {/* Holographic UI Layer */}
      <HolographicUI>
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Default route - redirect to home */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              
              {/* Main application routes */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/mining" element={<QuantumMining />} />
              <Route path="/quiz" element={<AIQuiz />} />
              <Route path="/battle" element={<BattleArena />} />
              <Route path="/wayground" element={<Wayground />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Advanced features */}
              <Route path="/metaverse" element={<Metaverse />} />
              <Route path="/neural-lab" element={<NeuralLab />} />
              <Route path="/blockchain" element={<Blockchain />} />
              
              {/* 404 route */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </HolographicUI>
      
      {/* Global Components */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="quantum-badge">
          <span className="text-xs font-mono text-neon-cyan">QUANTUM APEX</span>
        </div>
      </motion.div>
    </div>
  )
}

export default App
