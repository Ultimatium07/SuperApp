import React, { useEffect, useRef } from 'react'

export const QuantumParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      life: number
    }> = []
    
    // Create particles
    const createParticle = () => {
      const colors = ['#00ffff', '#ff00ff', '#8b5cf6', '#ec4899']
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      }
    }
    
    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle())
    }
    
    let animationId: number
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.003
        
        // Reset particle if it goes off screen or dies
        if (particle.y < -10 || particle.life <= 0) {
          particles[index] = createParticle()
          return
        }
        
        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })
      
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
