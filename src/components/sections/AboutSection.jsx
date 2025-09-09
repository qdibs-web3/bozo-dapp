import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Users, Trophy, Rocket, TrendingUp, Target, Zap, Crown, Star, Sparkles } from 'lucide-react'
import bozoHappy from '../../assets/bozo_happy_no_bg.png'
import bozoExcited from '../../assets/bozo_excited_new_no_bg.png'
import bozoThinking from '../../assets/bozo_thinking_new_no_bg.png'
import bozoParty from '../../assets/bozo_party_no_bg.png'
import bozoGenius from '../../assets/bozo_genius_no_bg.png'

// Memoized components to prevent unnecessary re-renders
const StatCard = memo(({ label, value, isPositive }) => (
  <div className="bg-white/10 rounded-lg p-4 text-center">
    <p className="text-blue-200 text-sm mb-1">{label}</p>
    <p className={`text-2xl font-bold transition-colors duration-300 ${
      label === '24h Change' 
        ? (isPositive ? 'text-green-400' : 'text-red-400')
        : 'text-white'
    }`}>
      {value}
    </p>
  </div>
))

const ProgressBar = memo(({ percentage, milestones, maxMarketCap }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="text-blue-200">GRIND TO 3M (For now)</span>
      <span className="text-white font-bold transition-all duration-300">
        {percentage.toFixed(1)}%
      </span>
    </div>
    <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-green-800 to-green-600 transition-all duration-1000 ease-out relative"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
      </div>
      {/* Milestone markers */}
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className="absolute top-0 h-full w-1 bg-white"
          style={{ left: `${(milestone.value / maxMarketCap) * 100}%` }}
        >
          <div className="absolute -top-10 -left-4 flex justify-center">
            <img 
              src={milestone.icon} 
              alt={milestone.title}
              className="w-6 h-6 object-contain opacity-80"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
))

const CurrentMilestone = memo(({ milestone }) => (
  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center space-x-4 bg-white/5 rounded-lg p-4">
    <img src={milestone.image} alt={milestone.title} className="w-16 h-16" />
    <div className="text-center">
      <h3 className="text-xl font-bold text-white mb-1 transition-all duration-300">
        Current Level: {milestone.title}
      </h3>
      <p className="text-blue-200">{milestone.description}</p>
    </div>
  </div>
))

const NextMilestone = memo(({ milestone, marketCap, formatNumber }) => {
  if (!milestone) return null
  
  return (
    <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-4">
      <h4 className="text-lg font-bold text-white mb-2 transition-all duration-300">
        Next Goal: {milestone.title} at {formatNumber(milestone.value)}
      </h4>
      <p className="text-blue-200 mb-2">{milestone.description}</p>
      <p className="text-sm text-purple-300 transition-all duration-300">
        Only {formatNumber(milestone.value - marketCap)} to go! 🎯
      </p>
    </div>
  )
})

const MilestonesGrid = memo(({ milestones, marketCap, formatNumber }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
    {milestones.map((milestone, index) => (
      <div
        key={index}
        className={`relative p-3 rounded-lg border-2 transition-all duration-500 ${
          marketCap >= milestone.value
            ? 'border-green-400 bg-green-400/20'
            : 'border-gray-600 bg-gray-600/20'
        }`}
      >
        <div className="text-center">
          <div className="mb-1 flex justify-center">
            <img 
              src={milestone.icon} 
              alt={milestone.title}
              className="w-8 h-8 object-contain"
            />
          </div>          
          <p className="text-xs font-bold text-white">{milestone.title}</p>
          <p className="text-xs text-blue-200">{formatNumber(milestone.value)}</p>
        </div>
        {marketCap >= milestone.value && (
          <div className="absolute -top-1 -right-1 animate-pulse">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        )}
      </div>
    ))}
  </div>
))

export default function AboutSection() {
  const [marketCap, setMarketCap] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [price, setPrice] = useState(0)
  const [priceChange24h, setPriceChange24h] = useState(0)

  const CONTRACT_ADDRESS = '0x658cDf527858974E85aDe6D3900640F109519A25'
  const MAX_MARKET_CAP = 3000000 // 3 million

  // Memoized milestones array to prevent recreation on every render
  const milestones = useMemo(() => [
    {
      value: 100000,
      title: "Baby Bozo",
      description: "First steps into Bozo territory!",
      icon: bozoHappy,
      image: bozoHappy,
      color: "from-green-400 to-green-600"
    },
    {
      value: 500000,
      title: "Thinking Bozo",
      description: "Bozo is getting smarter!",
      icon: bozoThinking,
      image: bozoThinking,
      color: "from-blue-400 to-blue-600"
    },
    {
      value: 1000000,
      title: "Excited Bozo",
      description: "1M! Bozo is pumped!",
      icon: bozoExcited,
      image: bozoExcited,
      color: "from-purple-400 to-purple-600"
    },
    {
      value: 2000000,
      title: "Party Bozo",
      description: "2M! Time to celebrate!",
      icon: bozoParty,
      image: bozoParty,
      color: "from-pink-400 to-pink-600"
    },
    {
      value: 3000000,
      title: "Genius Bozo",
      description: "3M! Ultimate Bozo form!",
      icon: bozoGenius,
      image: bozoGenius,
      color: "from-yellow-400 to-yellow-600"
    }
  ], [])

  // Memoized formatting functions
  const formatNumber = useCallback((num) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`
    }
    return `$${num.toFixed(2)}`
  }, [])

  const formatPrice = useCallback((price) => {
    if (price < 0.000001) {
      return `$${price.toExponential(2)}`
    }
    return `$${price.toFixed(6)}`
  }, [])

  // Optimized fetch function with useCallback to prevent recreation
  const fetchMarketData = useCallback(async () => {
    try {
      // Only show loading on first load, not on updates
      if (marketCap === 0) {
        setLoading(true)
      }
      setError(null)
      
      console.log('Fetching data for contract:', CONTRACT_ADDRESS)
      
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('DexScreener response:', data)
      
      // Check if we have pairs data
      if (data && data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0] // Get the first pair
        
        const currentPrice = parseFloat(pair.priceUsd) || 0
        const marketCapValue = parseFloat(pair.marketCap) || 0
        const priceChange = parseFloat(pair.priceChange?.h24) || 0
        
        // Only update state if values actually changed to minimize re-renders
        setPrice(prevPrice => {
          const newPrice = currentPrice
          return Math.abs(newPrice - prevPrice) > 0.000001 ? newPrice : prevPrice
        })
        
        setMarketCap(prevMarketCap => {
          const newMarketCap = marketCapValue
          return Math.abs(newMarketCap - prevMarketCap) > 1000 ? newMarketCap : prevMarketCap
        })
        
        setPriceChange24h(prevChange => {
          const newChange = priceChange
          return Math.abs(newChange - prevChange) > 0.01 ? newChange : prevChange
        })
        
        console.log('Updated values:', { currentPrice, marketCapValue, priceChange })
      } else {
        // If no pairs found, use fallback mock data only on first load
        if (marketCap === 0) {
          console.log('No pairs found, using fallback data')
          const mockData = {
            marketCap: Math.random() * 1500000 + 200000,
            price: Math.random() * 0.01 + 0.001,
            priceChange24h: (Math.random() - 0.5) * 20
          }
          
          setMarketCap(mockData.marketCap)
          setPrice(mockData.price)
          setPriceChange24h(mockData.priceChange24h)
        }
      }
      
    } catch (error) {
      console.error('API Error:', error)
      setError(`Failed to fetch market data: ${error.message}`)
      
      // Use fallback mock data on error only if no data exists
      if (marketCap === 0) {
        const mockData = {
          marketCap: Math.random() * 1500000 + 200000,
          price: Math.random() * 0.01 + 0.001,
          priceChange24h: (Math.random() - 0.5) * 20
        }
        
        setMarketCap(mockData.marketCap)
        setPrice(mockData.price)
        setPriceChange24h(mockData.priceChange24h)
      }
    } finally {
      setLoading(false)
    }
  }, [CONTRACT_ADDRESS, marketCap])

  useEffect(() => {
    fetchMarketData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchMarketData, 30000)
    return () => clearInterval(interval)
  }, [fetchMarketData])

  // Memoized calculations to prevent recalculation on every render
  const progressPercentage = useMemo(() => {
    return Math.min((marketCap / MAX_MARKET_CAP) * 100, 100)
  }, [marketCap, MAX_MARKET_CAP])

  const currentMilestone = useMemo(() => {
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (marketCap >= milestones[i].value) {
        return milestones[i]
      }
    }
    return milestones[0]
  }, [milestones, marketCap])

  const nextMilestone = useMemo(() => {
    for (let i = 0; i < milestones.length; i++) {
      if (marketCap < milestones[i].value) {
        return milestones[i]
      }
    }
    return null
  }, [milestones, marketCap])

  // Memoized formatted values
  const formattedMarketCap = useMemo(() => formatNumber(marketCap), [formatNumber, marketCap])
  const formattedPrice = useMemo(() => formatPrice(price), [formatPrice, price])

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Static header - won't re-render */}
        <div className="text-center mb-16">
          <img src={bozoHappy} alt="Happy Bozo" className="w-32 h-32 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">BOZO Watch</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            You are either with $BOZO or against, CHOOSE WISELY!
          </p>
        </div>

        {/* Market Cap Tracker */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-800 to-blue-900 backdrop-blur-md border-white/60 text-white overflow-hidden">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CardTitle className="text-3xl font-bold">Lock-In, BOZO</CardTitle>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
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
                  {/* Current Stats - Memoized components */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label="Market Cap" value={formattedMarketCap} />
                    <StatCard label="Price" value={formattedPrice} />
                    <StatCard 
                      label="24h Change" 
                      value={`${priceChange24h >= 0 ? '+' : ''}${priceChange24h.toFixed(2)}%`}
                      isPositive={priceChange24h >= 0}
                    />
                  </div>

                  {/* Progress Bar */}
                  <ProgressBar 
                    percentage={progressPercentage} 
                    milestones={milestones}
                    maxMarketCap={MAX_MARKET_CAP}
                  />

                  {/* Current Milestone */}
                  <CurrentMilestone milestone={currentMilestone} />

                  {/* Next Milestone */}
                  <NextMilestone 
                    milestone={nextMilestone} 
                    marketCap={marketCap}
                    formatNumber={formatNumber}
                  />

                  {/* Milestones Grid */}
                  <MilestonesGrid 
                    milestones={milestones}
                    marketCap={marketCap}
                    formatNumber={formatNumber}
                  />

                  {/* Contract Info - Static */}
                  <div className="text-center bg-white/10 rounded-lg p-3">
                    <p className="text-m text-blue-400 mb-1">BOZO Contract Address:</p>
                    <p className="text-m font-mono text-white break-all">{CONTRACT_ADDRESS}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}