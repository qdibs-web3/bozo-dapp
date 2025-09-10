import { Menu, X } from 'lucide-react'
import bozoMain from '../../assets/bozo_no_bg.png'

export default function Navigation({ 
  isMenuOpen, 
  setIsMenuOpen, 
  scrollToSection
}) {
  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src={bozoMain} alt="Bozo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">BOZO</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              $BOZO Stats
            </button>
            <button 
              onClick={() => scrollToSection('tokenomics')} 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Bozonomics
            </button>
            <button 
              onClick={() => scrollToSection('my-bozo')} 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              My BOZO
            </button>
            <button 
              onClick={() => scrollToSection('game')} 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Game
            </button>
            <button 
              onClick={() => scrollToSection('meme-generator')} 
              className="text-white hover:text-blue-300 transition-colors font-medium"
            >
              Memes
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')} 
              className="block px-3 py-2 text-white hover:text-blue-300 w-full text-left font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block px-3 py-2 text-white hover:text-blue-300 w-full text-left font-medium"
            >
              $BOZO Stats
            </button>
            <button 
              onClick={() => scrollToSection('tokenomics')} 
              className="block px-3 py-2 text-white hover:text-blue-300 w-full text-left font-medium"
            >
              Bozonomics
            </button>
            <button 
              onClick={() => scrollToSection('my-bozo')} 
              className="block px-3 py-2 text-white hover:text-blue-300 w-full text-left font-medium"
            >
              My BOZO
            </button>
            <button 
              onClick={() => scrollToSection('game')} 
              className="block px-3 py-2 text-white hover:text-blue-300 w-full text-left font-medium"
            >
              Game
            </button>
            <button 
              onClick={() => scrollToSection('meme-generator')} 
              className="block px-3 py-2 text-white hover:text-blue-300 w-full text-left font-medium"
            >
              Memes
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}