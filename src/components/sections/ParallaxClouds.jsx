import { useState, useEffect } from 'react'

export default function ParallaxClouds() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Static cloud positions with visible scroll speeds
  const clouds = [
    { id: 1, size: 400, x: 10, y: 20, opacity: 0.4, speed: 0.25, layer: 1 },
    { id: 2, size: 250, x: 70, y: 15, opacity: 0.5, speed: 0.35, layer: 2 },
    { id: 3, size: 380, x: 30, y: 40, opacity: 0.3, speed: 0.28, layer: 1 },
    { id: 4, size: 320, x: 80, y: 35, opacity: 0.6, speed: 0.39, layer: 3 },
    { id: 5, size: 360, x: 60, y: 60, opacity: 0.4, speed: 0.32, layer: 2 },
    { id: 6, size: 290, x: 20, y: 70, opacity: 0.5, speed: 0.29, layer: 1 },
    { id: 7, size: 270, x: 90, y: 55, opacity: 0.4, speed: 0.34, layer: 2 },
    { id: 8, size: 310, x: 60, y: 25, opacity: 0.6, speed: 0.38, layer: 3 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-blue-400" />
      
      {/* Clouds with visible scroll movement */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            transform: `translateX(${scrollY * cloud.speed}px) translateY(${scrollY * 0.05}px)`,
            zIndex: cloud.layer,
          }}
        >
          <div 
            className="rounded-full bg-gradient-to-br from-blue-50 to-blue-100"
            style={{
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              opacity: cloud.opacity,
              filter: `blur(${cloud.layer === 1 ? 2 : cloud.layer === 2 ? 1.5 : 1}px)`,
            }}
          >
            {/* Cloud bumps */}
            <div 
              className="absolute bg-gradient-to-br from-blue-50 to-blue-100 rounded-full"
              style={{
                width: `${cloud.size * 0.7}px`,
                height: `${cloud.size * 0.7}px`,
                top: `-${cloud.size * 0.2}px`,
                left: `${cloud.size * 0.1}px`,
              }}
            />
            <div 
              className="absolute bg-gradient-to-br from-blue-50 to-blue-100 rounded-full"
              style={{
                width: `${cloud.size * 0.5}px`,
                height: `${cloud.size * 0.5}px`,
                top: `-${cloud.size * 0.15}px`,
                right: `${cloud.size * 0.1}px`,
              }}
            />
            <div 
              className="absolute bg-gradient-to-br from-blue-50 to-blue-100 rounded-full"
              style={{
                width: `${cloud.size * 0.4}px`,
                height: `${cloud.size * 0.4}px`,
                top: `-${cloud.size * 0.1}px`,
                left: `${cloud.size * 0.3}px`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}