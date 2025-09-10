import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import bozoThinking from '../../assets/bozo_thinking_new_no_bg.png'

export default function BozonomicsSection() {
  return (
    <section id="tokenomics" className="py-12 md:py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <img src={bozoThinking} alt="Thinking Bozo" className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-4 md:mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">Bozonomics</h2>
          <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-4">
            Bozonomics are simple, fair, and based!
          </p>
        </div>

        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8">
          {/* Token Card */}
          <div className="w-full lg:w-[45%] xl:w-[40%]">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-center lg:text-left">$BOZO Token</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Total Supply:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">1,000,000,000 BOZO</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Liquidity Pool:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">80%</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Marketing:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">10%</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Team:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">5%</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Community Rewards:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">5%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NFT Card */}
          <div className="w-full lg:w-[45%] xl:w-[40%]">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl text-center lg:text-left">BOZO NFTs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Total Supply:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">333 BOZO NFTs</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Release date:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">$BOZO MC 500k</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Mint Cost:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">0.0033 ETH</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Rarity:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">111 Each Tier</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm md:text-base">Based?:</span>
                  <Badge className="bg-blue-600 text-xs md:text-sm w-fit">As Fuck</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>        
      </div>
    </section>
  )
}