import React, { useEffect, useRef } from 'react'

interface QuantumOrbProps {
  size?: number
  color?: string
  speed?: number
}

export const QuantumOrb: React.FC<QuantumOrbProps> = ({
  size = 100,
  color = '#00ffff',
  speed = 4
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = size
    canvas.height = size
    
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      
      // Draw quantum rings
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.5 - i * 0.1
        const radius = (size / 2) * (0.3 + i * 0.2)
        const offset = Math.sin(time * 0.001 * speed + i) * 5
        ctx.arc(size / 2, size / 2, radius + offset, 0, Math.PI * 2)
        ctx.stroke()
      }
      
      // Draw core
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 4)
      gradient.addColorStop(0, color)
      gradient.addColorStop(0.5, color + '80')
      gradient.addColorStop(1, color + '00')
      
      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.globalAlpha = 0.8 + Math.sin(time * 0.002 * speed) * 0.2
      ctx.arc(size / 2, size / 2, size / 4, 0, Math.PI * 2)
      ctx.fill()
      
      time += 16
      requestAnimationFrame(animate)
    }
    
    animate()
  }, [size, color, speed])
  
  return <canvas ref={canvasRef} className="quantum-orb" />
}
