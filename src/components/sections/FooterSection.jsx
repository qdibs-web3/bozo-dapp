import { Button } from '@/components/ui/button.jsx'
import { Twitter, MessageCircle } from 'lucide-react'
import bozoMain from '../../assets/bozo_no_bg.png'

export default function FooterSection() {
  return (
    <footer className="bg-black/40 backdrop-blur-md py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <img src={bozoMain} alt="Bozo" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">BOZO</span>
            </div>
            <p className="text-blue-200 text-sm">
              The most based meme coin.
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="flex justify-center space-x-4">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2"
                onClick={() => window.open('https://twitter.com/bozocoin', '_blank')}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2"
                onClick={() => window.open('https://t.me/bozocoin', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram
              </Button>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-4">Contract</h3>
            <p className="text-blue-200 text-xs font-mono break-all">
              0xDEEZBOZOSCACOMINGSOONFRFR
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-blue-200 text-sm mb-4">
            © 2024 BOZO. All rights reserved. Built on Base blockchain.
          </p>
          <p className="text-xs text-blue-300 max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> BOZO is a meme token created for entertainment purposes. 
            Cryptocurrency investments carry inherent risks and may result in partial or total loss of capital. 
            This token has no intrinsic value and should not be considered as financial advice. 
            Please conduct your own research and invest responsibly. The BOZO team is not responsible for any financial losses. 
            This project is experimental and community-driven. Always verify contract addresses and be aware of potential scams.
          </p>
        </div>
      </div>
    </footer>
  )
}