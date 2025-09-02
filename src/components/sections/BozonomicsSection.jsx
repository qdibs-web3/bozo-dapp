import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import bozoThinking from '../../assets/bozo_thinking_new_no_bg.png'

export default function BozonomicsSection() {
  return (
    <section id="tokenomics" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <img src={bozoThinking} alt="Thinking Bozo" className="w-32 h-32 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Bozonomics</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Bozonomics are simple, fair, and based!
          </p>
        </div>

        <div className="flex justify-center gap-8">
          <div className="w-[30%]">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">$BOZO Token </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Supply:</span>
                  <Badge className="bg-blue-600">1,000,000,000 BOZO</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Liquidity Pool:</span>
                  <Badge className="bg-blue-600">80%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Marketing:</span>
                  <Badge className="bg-blue-600">10%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Team:</span>
                  <Badge className="bg-blue-600">5%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Community Rewards:</span>
                  <Badge className="bg-blue-600">5%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-[30%]">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">BOZO NFTs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Supply:</span>
                  <Badge className="bg-blue-600">333 BOZO NFTs</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Release date:</span>
                  <Badge className="bg-blue-600">$BOZO MC 500k</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mint Cost:</span>
                  <Badge className="bg-blue-600">0.0033</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rarity</span>
                  <Badge className="bg-blue-600">111 Each Tier</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Based ?:</span>
                  <Badge className="bg-blue-600">As Fuck</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
