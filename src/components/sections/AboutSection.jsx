import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Users, Trophy, Rocket } from 'lucide-react'
import bozoHappy from '../../assets/bozo_happy_no_bg.png'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <img src={bozoHappy} alt="Happy Bozo" className="w-32 h-32 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">About BOZO</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            You are either with $BOZO or against BOZO, CHOOSE WISELY!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle>Based Bozo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-200">
                Built by the top B (Bozo), for the base meme community. Find your place within the BOZO ecosystem, Bozo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <Rocket className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle>Base Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-200">
                Lightning fast transactions and minimal fees on Base network, the perfect home for BOZO to live. 
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <Trophy className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle>Meme Supremacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-200">
                No other coin is as based as $BOZO on base. Send it to a million, create memes, game, yap, cult up, IT IS BOZO SEASON!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

