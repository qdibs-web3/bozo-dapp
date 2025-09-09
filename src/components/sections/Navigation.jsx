import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Menu, X, Wallet } from 'lucide-react'
import bozoMain from '../../assets/bozo_no_bg.png'

export default function Navigation({ 
  isMenuOpen, 
  setIsMenuOpen, 
  isWalletConnected, 
  walletAddress, 
  connectWallet, 
  disconnectWallet, 
  scrollToSection,
  formatAddress 
}) {
  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src={bozoMain} alt="Bozo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">BOZO</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-white hover:text-blue-300 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-white hover:text-blue-300 transition-colors">About</button>
            <button onClick={() => scrollToSection('tokenomics')} className="text-white hover:text-blue-300 transition-colors">Bozonomics</button>
            <button onClick={() => scrollToSection('game')} className="text-white hover:text-blue-300 transition-colors">Game</button>
            <button onClick={() => scrollToSection('meme-generator')} className="text-white hover:text-blue-300 transition-colors">Memes</button>
            
            {isWalletConnected ? (
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600 text-white h-10 px-4 flex items-center">
                  {formatAddress(walletAddress)}
                </Badge>
                <Button onClick={disconnectWallet} className="h-10 bg-red-600 hover:bg-red-700 text-white border-red-600">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => scrollToSection('home')} className="block px-3 py-2 text-white hover:text-blue-300">Home</button>
            <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-white hover:text-blue-300">About</button>
            <button onClick={() => scrollToSection('tokenomics')} className="block px-3 py-2 text-white hover:text-blue-300">Bozonomics</button>
            <button onClick={() => scrollToSection('game')} className="block px-3 py-2 text-white hover:text-blue-300">Game</button>
            <button onClick={() => scrollToSection('meme-generator')} className="block px-3 py-2 text-white hover:text-blue-300">Memes</button>
            <div className="px-3 py-2">
              {isWalletConnected ? (
                <div className="space-y-2">
                  <Badge className="bg-green-600 text-white w-full justify-center">
                    {formatAddress(walletAddress)}
                  </Badge>
                  <Button onClick={disconnectWallet} className="w-full" variant="outline">
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={connectWallet} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

