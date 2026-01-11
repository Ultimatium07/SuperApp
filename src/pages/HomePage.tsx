import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useQuantumStore } from '../store/quantumStore'
import { QuantumOrb } from '../components/effects/QuantumOrb'

export const HomePage: React.FC = () => {
  const { quantumXP, quantumLevel, quantumEnergy } = useQuantumStore()
  
  const features = [
    {
      icon: '⚡',
      title: 'Quantum Mining',
      description: 'Mine quantum coins with advanced particle physics',
      link: '/mining',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '🧠',
      title: 'AI Quiz',
      description: 'Test your knowledge with GPT-4 powered questions',
      link: '/quiz',
      color: 'from-magenta-500 to-pink-500',
    },
    {
      icon: '⚔️',
      title: 'Battle Arena',
      description: 'Compete in real-time battles worldwide',
      link: '/battle',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: '👥',
      title: 'Wayground',
      description: 'Collaborative learning spaces',
      link: '/wayground',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🥽',
      title: 'Metaverse',
      description: 'Immersive VR/AR experiences',
      link: '/metaverse',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🧬',
      title: 'Neural Lab',
      description: 'Brain-computer interface experiments',
      link: '/neural-lab',
      color: 'from-red-500 to-rose-500',
    },
  ]
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-magenta-900/20" />
        
        <motion.div
          className="text-center z-10 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Quantum Orb */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <QuantumOrb size={150} />
          </motion.div>
          
          {/* Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 quantum-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            NEXUS QUANTUM APEX
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            The Ultimate Super App - #1 Individual Developer Application
          </motion.p>
          
          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-cyan-400 font-bold">Level {quantumLevel}</span>
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-magenta-400 font-bold">{quantumXP.toLocaleString()} XP</span>
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-purple-400 font-bold">{quantumEnergy} Energy</span>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Link
              to="/mining"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 text-white font-bold hover:scale-105 transition-transform"
            >
              Start Mining
            </Link>
            <Link
              to="/profile"
              className="px-8 py-4 rounded-full glass text-white font-bold hover:scale-105 transition-transform"
            >
              View Profile
            </Link>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Features Grid */}
      <section className="relative py-20 px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 quantum-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Quantum Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.link}>
                <div className="glass p-8 rounded-2xl h-full hover:scale-105 transition-all duration-300 group">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Innovation Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 quantum-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Cutting-Edge Technology
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">🤖 AI & ML</h3>
              <p className="text-gray-300">
                TensorFlow.js, GPT-4 Turbo, Computer Vision, Natural Language Processing
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-magenta-400 mb-3">⚡ Performance</h3>
              <p className="text-gray-300">
                WebGPU, WebAssembly, Edge Computing, Sub-100ms Load Times
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-purple-400 mb-3">🥽 Metaverse</h3>
              <p className="text-gray-300">
                WebXR, Three.js, 3D Environments, Virtual Reality
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-400 mb-3">🔗 Blockchain</h3>
              <p className="text-gray-300">
                Web3 Integration, NFTs, Smart Contracts, Crypto Payments
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
