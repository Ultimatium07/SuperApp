import React, { useEffect, useRef } from 'react'

export const NeuralBackground: React.FC = () => {
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
    
    // Neural network nodes
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      connections: number[]
    }> = []
    
    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      })
    }
    
    // Create connections
    nodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length)
        if (targetIndex !== i) {
          node.connections.push(targetIndex)
        }
      }
    })
    
    let animationId: number
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy
        
        // Bounce off walls
        if (node.x <= 0 || node.x >= canvas.width) node.vx = -node.vx
        if (node.y <= 0 || node.y >= canvas.height) node.vy = -node.vy
        
        // Draw connections
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex]
          if (target) {
            const distance = Math.sqrt(
              Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
            )
            
            if (distance < 200) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 * (1 - distance / 200)})`
              ctx.lineWidth = 1
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(target.x, target.y)
              ctx.stroke()
            }
          }
        })
        
        // Draw node
        ctx.beginPath()
        ctx.fillStyle = '#00ffff'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00ffff'
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })
      
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
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  )
}
