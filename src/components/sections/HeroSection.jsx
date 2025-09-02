import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Rocket, ExternalLink, ChevronDown } from 'lucide-react'
import bozoExcited from '../../assets/bozo_excited_new_no_bg.png'

export default function HeroSection({ contractAddressCopied, copyContractAddress }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }))

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Parallax Layer 1 - Slow moving gradient orbs */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) translateY(${scrollY * 0.1}px)`
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Parallax Layer 2 - Medium speed geometric shapes */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) translateY(${scrollY * 0.2}px)`
          }}
        >
          <div className="absolute top-1/3 right-1/3 w-32 h-32 border-2 border-blue-300 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border-2 border-cyan-300 rotate-12 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-400 rounded-full animate-ping"></div>
        </div>

        {/* Parallax Layer 3 - Fast moving particles */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) translateY(${scrollY * 0.3}px)`
          }}
        >
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute bg-blue-300 rounded-full animate-float"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.id * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px) translateY(${scrollY * 0.15}px)`,
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/20 to-blue-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="relative">
          {/* Glowing effect behind Bozo */}
          <div className="absolute inset-0 w-64 h-64 mx-auto mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <img 
            src={bozoExcited} 
            alt="Excited Bozo" 
            className="relative w-64 h-64 mx-auto mb-8 animate-bounce drop-shadow-2xl"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
        </div>
        
        <h1 
          className="text-6xl md:text-8xl font-bold text-white mb-6 animate-pulse drop-shadow-lg"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            textShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(34, 211, 238, 0.3)'
          }}
        >
          $BOZO
        </h1>
        
        <p 
          className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto drop-shadow-md"
          style={{
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
          }}
        >
          $BOZO on Base, only a real BOZO would fade
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`
          }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://app.uniswap.org/#/swap?outputCurrency=0x1234567890123456789012345678901234567890', '_blank')}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Swap $BOZO
          </Button>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://dexscreener.com/base/0x1234567890123456789012345678901234567890', '_blank')}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            View Chart
          </Button>
        </div>
        
        <div 
          className="mt-6 flex justify-center"
          style={{
            transform: `translate(${mousePosition.x * 0.006}px, ${mousePosition.y * 0.006}px)`
          }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-mono shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            onClick={copyContractAddress}
          >
            {contractAddressCopied ? 'Copied CA' : '0xDEEZBOZOSCACOMINGSOONFRFR'}
          </Button>
        </div>
        
        <div 
          className="mt-12 animate-bounce"
          style={{
            transform: `translate(${mousePosition.x * 0.004}px, ${mousePosition.y * 0.004}px)`
          }}
        >
          <ChevronDown className="w-8 h-8 text-white mx-auto drop-shadow-lg" />
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  )
}