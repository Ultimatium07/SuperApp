import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Placeholder pages for other routes
export const QuantumMining: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">⚡ Quantum Mining</h1>
      <p className="text-gray-400 mb-8">Coming soon with advanced particle physics simulation</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)

export const AIQuiz: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">🧠 AI Quiz</h1>
      <p className="text-gray-400 mb-8">Coming soon with GPT-4 powered questions</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)

export const BattleArena: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">⚔️ Battle Arena</h1>
      <p className="text-gray-400 mb-8">Coming soon with real-time multiplayer battles</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)

export const Wayground: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">👥 Wayground</h1>
      <p className="text-gray-400 mb-8">Coming soon with collaborative learning spaces</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)

export const Profile: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">👤 Profile</h1>
      <p className="text-gray-400 mb-8">Coming soon with achievements and statistics</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)

export const Metaverse: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">🥽 Metaverse</h1>
      <p className="text-gray-400 mb-8">Coming soon with WebXR VR/AR experiences</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)

export const NeuralLab: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">🧬 Neural Lab</h1>
      <p className="text-gray-400 mb-8">Coming soon with brain-computer interface experiments</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)

export const Blockchain: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold quantum-text mb-4">🔗 Blockchain</h1>
      <p className="text-gray-400 mb-8">Coming soon with Web3 and NFT features</p>
      <Link to="/" className="px-6 py-3 rounded-full glass text-white hover:scale-105 transition-transform">
        Back to Home
      </Link>
    </motion.div>
  </div>
)
