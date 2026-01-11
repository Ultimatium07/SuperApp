import React from 'react'
import { motion } from 'framer-motion'
import { QuantumOrb } from '../effects/QuantumOrb'

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        {/* Quantum Orb Loader */}
        <QuantumOrb size={120} />
        
        {/* Loading Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold quantum-text mb-2">
            NEXUS QUANTUM APEX
          </h1>
          <p className="text-sm text-gray-400">
            Initializing quantum systems...
          </p>
        </motion.div>
        
        {/* Loading Progress */}
        <motion.div
          className="mt-6 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <div className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500" />
        </motion.div>
        
        {/* Loading States */}
        <motion.div
          className="mt-4 space-y-1 text-xs font-mono text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            [✓] Quantum Core Initialized
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            [✓] Neural Network Connected
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            [✓] AI Models Loaded
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            [✓] Metaverse Ready
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
