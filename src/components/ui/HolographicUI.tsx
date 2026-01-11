import React from 'react'

interface HolographicUIProps {
  children: React.ReactNode
}

export const HolographicUI: React.FC<HolographicUIProps> = ({ children }) => {
  return (
    <div className="holographic-ui relative z-10">
      {/* Holographic overlay effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-magenta-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.05),transparent_50%)]" />
      </div>
      
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-[scan_8s_linear_infinite]" />
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  )
}
