import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Users, Trophy, Rocket, TrendingUp, Target, Zap, Crown, Star, Sparkles } from 'lucide-react'
import bozoHappy from '../../assets/bozo_happy_no_bg.png'
import bozoExcited from '../../assets/bozo_excited_new_no_bg.png'
import bozoThinking from '../../assets/bozo_thinking_new_no_bg.png'
import bozoParty from '../../assets/bozo_party_no_bg.png'
import bozoGenius from '../../assets/bozo_genius_no_bg.png'

export default function AboutSection() {
  const [marketCap, setMarketCap] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [price, setPrice] = useState(0)
  const [priceChange24h, setPriceChange24h] = useState(0)

  const CONTRACT_ADDRESS = '0x20a825E12F1bA11947F32bef0950743783F02611'
  const MAX_MARKET_CAP = 3000000 // 3 million

  // Bozo-themed milestones
  const milestones = [
    {
      value: 100000,
      title: "Baby Bozo",
      description: "First steps into Bozo territory!",
      icon: "👶",
      image: bozoHappy,
      color: "from-green-400 to-green-600"
    },
    {
      value: 500000,
      title: "Thinking Bozo",
      description: "Bozo is getting smarter!",
      icon: "🤔",
      image: bozoThinking,
      color: "from-blue-400 to-blue-600"
    },
    {
      value: 1000000,
      title: "Excited Bozo",
      description: "1M! Bozo is pumped!",
      icon: "🚀",
      image: bozoExcited,
      color: "from-purple-400 to-purple-600"
    },
    {
      value: 2000000,
      title: "Party Bozo",
      description: "2M! Time to celebrate!",
      icon: "🎉",
      image: bozoParty,
      color: "from-pink-400 to-pink-600"
    },
    {
      value: 3000000,
      title: "Genius Bozo",
      description: "3M! Ultimate Bozo form!",
      icon: "👑",
      image: bozoGenius,
      color: "from-yellow-400 to-yellow-600"
    }
  ]

  // Mock API call - replace with actual API
  const fetchMarketData = async () => {
    try {
      setLoading(true)
      
      // Simulate API call with mock data for now
      // In production, you'd call a real API like CoinGecko, DexScreener, or similar
      const mockData = {
        marketCap: Math.random() * 1500000 + 200000, // Random between 200k-1.7M
        price: Math.random() * 0.01 + 0.001,
        priceChange24h: (Math.random() - 0.5) * 20 // Random between -10% to +10%
      }
      
      setMarketCap(mockData.marketCap)
      setPrice(mockData.price)
      setPriceChange24h(mockData.priceChange24h)
      setError(null)
    } catch (err) {
      setError('Failed to fetch market data')
      console.error('Market data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchMarketData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`
    }
    return `$${num.toFixed(2)}`
  }

  const formatPrice = (price) => {
    return `$${price.toFixed(6)}`
  }

  const getProgressPercentage = () => {
    return Math.min((marketCap / MAX_MARKET_CAP) * 100, 100)
  }

  const getCurrentMilestone = () => {
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (marketCap >= milestones[i].value) {
        return milestones[i]
      }
    }
    return milestones[0]
  }

  const getNextMilestone = () => {
    for (let i = 0; i < milestones.length; i++) {
      if (marketCap < milestones[i].value) {
        return milestones[i]
      }
    }
    return null
  }

  const currentMilestone = getCurrentMilestone()
  const nextMilestone = getNextMilestone()

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

        {/* Market Cap Tracker */}
        <div className="mb-12">
          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-md border-white/20 text-white overflow-hidden">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <CardTitle className="text-3xl font-bold">BOZO Market Cap Tracker</CardTitle>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-blue-200">Watch BOZO climb to the moon! 🚀</p>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-blue-200">Loading BOZO data...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button 
                    onClick={fetchMarketData}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Current Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-blue-200 text-sm mb-1">Market Cap</p>
                      <p className="text-2xl font-bold text-white">{formatNumber(marketCap)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-blue-200 text-sm mb-1">Price</p>
                      <p className="text-2xl font-bold text-white">{formatPrice(price)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-blue-200 text-sm mb-1">24h Change</p>
                      <p className={`text-2xl font-bold ${priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Progress to 3M</span>
                      <span className="text-white font-bold">{getProgressPercentage().toFixed(1)}%</span>
                    </div>
                    <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-1000 ease-out relative"
                        style={{ width: `${getProgressPercentage()}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                      {/* Milestone markers */}
                      {milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="absolute top-0 h-full w-1 bg-white/60"
                          style={{ left: `${(milestone.value / MAX_MARKET_CAP) * 100}%` }}
                        >
                          <div className="absolute -top-8 -left-4 text-xs text-white/80">
                            {milestone.icon}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Milestone */}
                  <div className="flex items-center justify-center space-x-4 bg-white/5 rounded-lg p-4">
                    <img src={currentMilestone.image} alt={currentMilestone.title} className="w-16 h-16" />
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-1">
                        Current Level: {currentMilestone.title}
                      </h3>
                      <p className="text-blue-200">{currentMilestone.description}</p>
                    </div>
                  </div>

                  {/* Next Milestone */}
                  {nextMilestone && (
                    <div className="text-center bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4">
                      <h4 className="text-lg font-bold text-white mb-2">
                        Next Goal: {nextMilestone.title} at {formatNumber(nextMilestone.value)}
                      </h4>
                      <p className="text-blue-200 mb-2">{nextMilestone.description}</p>
                      <p className="text-sm text-purple-300">
                        Only {formatNumber(nextMilestone.value - marketCap)} to go! 🎯
                      </p>
                    </div>
                  )}

                  {/* Milestones Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          marketCap >= milestone.value
                            ? 'border-green-400 bg-green-400/20'
                            : 'border-gray-600 bg-gray-600/20'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{milestone.icon}</div>
                          <p className="text-xs font-bold text-white">{milestone.title}</p>
                          <p className="text-xs text-blue-200">{formatNumber(milestone.value)}</p>
                        </div>
                        {marketCap >= milestone.value && (
                          <div className="absolute -top-1 -right-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Contract Info */}
                  <div className="text-center bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-blue-200 mb-1">Contract Address:</p>
                    <p className="text-xs font-mono text-white break-all">{CONTRACT_ADDRESS}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Original About Cards */}
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