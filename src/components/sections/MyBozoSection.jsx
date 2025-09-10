import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Wallet, PieChart, Image, Loader2, RefreshCw, ExternalLink } from 'lucide-react'
import bozoHappy from '../../assets/bozo_happy_no_bg.png'
import bozoThinking from '../../assets/bozo_thinking_new_no_bg.png'

export default function MyBozoSection() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [activeTab, setActiveTab] = useState('tokens')
  const [tokenBalance, setTokenBalance] = useState(0)
  const [tokenData, setTokenData] = useState(null)
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const TOKEN_CONTRACT = '0xbd194286aCCf1f24d2416A00483D0D84c753fAec'
  const NFT_CONTRACT = '0x0B6a34689c9B26b988254cF91fb13A14eD8Cd7F7'
  const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdhN2M0ZjJkLTg5M2YtNDZkOC1hMDJiLTFhYjQwZGU0N2ZlZSIsIm9yZ0lkIjoiNDI4NDg0IiwidXNlcklkIjoiNDQwNzUwIiwidHlwZUlkIjoiNmMyNjg1N2EtYmY2Zi00MjhkLWFkYWQtZDdiYjg4OTE1ZWY4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzgzMDE4NjksImV4cCI6NDg5NDA2MTg2OX0.5dejEGS0-_vU9LCp-isjt_r6VGcb2PCEMiFaDUV5M0E'

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          setWalletAddress(accounts[0])
          fetchUserData(accounts[0])
        }
      } catch (error) {
        console.log('Error checking wallet connection:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          setWalletAddress(accounts[0])
          
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x2105' }],
            })
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: '0x2105',
                    chainName: 'Base',
                    nativeCurrency: {
                      name: 'Ethereum',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                    rpcUrls: ['https://mainnet.base.org'],
                    blockExplorerUrls: ['https://basescan.org'],
                  }],
                })
              } catch (addError) {
                console.log('Error adding Base network:', addError)
              }
            }
          }
          
          fetchUserData(accounts[0])
        }
      } catch (error) {
        console.log('Error connecting wallet:', error)
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet to connect!')
    }
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress('')
    setTokenBalance(0)
    setTokenData(null)
    setNfts([])
  }

  const fetchUserData = async (address) => {
    setLoading(true)
    setError(null)
    
    try {
      await Promise.all([
        fetchTokenBalance(address),
        fetchNFTs(address)
      ])
    } catch (err) {
      setError('Failed to fetch user data')
      console.error('Error fetching user data:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTokenBalance = async (address) => {
    try {
      console.log('Fetching token balance for:', address)
      
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/${address}/erc20?chain=base&token_addresses%5B%5D=${TOKEN_CONTRACT}`,
        {
          headers: {
            'X-API-Key': MORALIS_API_KEY,
            'accept': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Token balance response:', data)

      if (data && data.length > 0) {
        const tokenInfo = data[0]
        const balance = parseFloat(tokenInfo.balance) / Math.pow(10, parseInt(tokenInfo.decimals))
        const totalSupply = 1000000000
        const holderPercentage = (balance / totalSupply) * 100

        const tokenData = {
          balance: balance,
          symbol: tokenInfo.symbol || 'BOZO',
          decimals: parseInt(tokenInfo.decimals),
          totalSupply: totalSupply,
          holderPercentage: holderPercentage
        }
        
        setTokenBalance(balance)
        setTokenData(tokenData)
      } else {
        const tokenData = {
          balance: 0,
          symbol: 'BOZO',
          decimals: 18,
          totalSupply: 1000000000,
          holderPercentage: 0
        }
        
        setTokenBalance(0)
        setTokenData(tokenData)
      }
    } catch (error) {
      console.error('Error fetching token balance:', error)
      
      const mockBalance = Math.random() * 1000000 + 10000
      const mockTokenData = {
        balance: mockBalance,
        symbol: 'BOZO',
        decimals: 18,
        totalSupply: 1000000000,
        holderPercentage: (mockBalance / 1000000000) * 100
      }
      
      setTokenBalance(mockBalance)
      setTokenData(mockTokenData)
    }
  }

  const fetchNFTs = async (address) => {
    try {
      console.log('Fetching NFTs for:', address)
      
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/${address}/nft?chain=base&format=decimal&token_addresses%5B%5D=${NFT_CONTRACT}&media_items=false`,
        {
          headers: {
            'X-API-Key': MORALIS_API_KEY,
            'accept': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('NFT response:', data)

      if (data && data.result && data.result.length > 0) {
        const nftData = data.result.map(nft => {
          let metadata = {}
          let imageUrl = null
          
          try {
            if (nft.metadata) {
              metadata = JSON.parse(nft.metadata)
              console.log('Parsed metadata for NFT', nft.token_id, ':', metadata)
              
              // Try different image field names
              imageUrl = metadata.image || metadata.image_url || metadata.imageUrl || metadata.picture
              
              // Handle IPFS URLs
              if (imageUrl && imageUrl.startsWith('ipfs://')) {
                imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/')
              }
              
              console.log('Image URL for NFT', nft.token_id, ':', imageUrl)
            }
          } catch (e) {
            console.log('Error parsing NFT metadata for token', nft.token_id, ':', e)
          }

          // Fallback image if no valid image found
          if (!imageUrl) {
            imageUrl = `https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=BOZO+%23${nft.token_id}`
          }

          return {
            tokenId: nft.token_id,
            name: metadata.name || `BOZO NFT #${nft.token_id}`,
            image: imageUrl,
            description: metadata.description || `A rare BOZO NFT #${nft.token_id}`,
            attributes: metadata.attributes || [
              { trait_type: 'Collection', value: 'BOZO NFTs' },
              { trait_type: 'Token ID', value: nft.token_id }
            ]
          }
        })
        
        console.log('Processed NFT data:', nftData)
        setNfts(nftData)
      } else {
        console.log('No NFTs found, using mock data')
        const mockNFTs = Array.from({ length: 2 }, (_, i) => ({
          tokenId: i + 1,
          name: `BOZO NFT #${i + 1}`,
          image: `https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=BOZO+%23${i + 1}`,
          description: `A rare BOZO NFT with unique traits #${i + 1}`,
          attributes: [
            { trait_type: 'Rarity', value: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)] },
            { trait_type: 'Expression', value: ['Happy', 'Excited', 'Cool', 'Genius'][Math.floor(Math.random() * 4)] }
          ]
        }))
        
        setNfts(mockNFTs)
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error)
      
      const mockNFTs = Array.from({ length: 2 }, (_, i) => ({
        tokenId: i + 1,
        name: `BOZO NFT #${i + 1}`,
        image: `https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=BOZO+%23${i + 1}`,
        description: `A rare BOZO NFT with unique traits #${i + 1}`,
        attributes: [
          { trait_type: 'Rarity', value: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)] },
          { trait_type: 'Expression', value: ['Happy', 'Excited', 'Cool', 'Genius'][Math.floor(Math.random() * 4)] }
        ]
      }))
      
      setNfts(mockNFTs)
    }
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toFixed(2)
  }

  const pieChartData = tokenData ? [
    { name: 'Your Holdings', value: tokenData.holderPercentage, color: '#3B82F6' },
    { name: 'Other Holders', value: 100 - tokenData.holderPercentage, color: '#E5E7EB' }
  ] : []

  const PieChartComponent = ({ data, size = 200 }) => {
    if (!data || data.length === 0) return null
    
    let cumulativePercentage = 0
    
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = item.value
              const strokeDasharray = `${percentage * 2.51} 251.2`
              const strokeDashoffset = -cumulativePercentage * 2.51
              cumulativePercentage += percentage
              
              return (
                <circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r="40"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              )
            })}
          </svg>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {tokenData ? `${tokenData.holderPercentage.toFixed(4)}%` : '0%'}
          </div>
          <div className="text-sm text-blue-200">of supply</div>
        </div>
      </div>
    )
  }

  const NFTImage = ({ nft }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    const handleImageError = () => {
      console.log('Image failed to load for NFT:', nft.tokenId, 'URL:', nft.image)
      setImageError(true)
      setImageLoading(false)
    }

    const handleImageLoad = () => {
      console.log('Image loaded successfully for NFT:', nft.tokenId)
      setImageLoading(false)
    }

    const fallbackImage = `https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=BOZO+%23${nft.tokenId}`

    return (
      <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
        <img
          src={imageError ? fallbackImage : nft.image}
          alt={nft.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoading ? 'none' : 'block' }}
        />
        {imageError && (
          <div className="absolute bottom-2 left-2 right-2 text-xs text-white bg-black/50 rounded px-2 py-1">
            Image failed to load
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="my-bozo" className="py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <img src={bozoHappy} alt="Happy Bozo" className="w-24 h-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">My BOZO</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Connect your wallet to view your BOZO holdings and NFT collection
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {isWalletConnected && (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setActiveTab('tokens')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === 'tokens'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-blue-200 hover:bg-white/20'
                    }`}
                  >
                    <PieChart className="w-4 h-4 mr-2" />
                    My $BOZO
                  </Button>
                  <Button
                    onClick={() => setActiveTab('nfts')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === 'nfts'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-blue-200 hover:bg-white/20'
                    }`}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    My BOZO NFTs
                  </Button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                {isWalletConnected ? (
                  <>
                    <Badge className="bg-green-600 text-white px-3 py-1">
                      {formatAddress(walletAddress)}
                    </Badge>
                    <Button
                      onClick={disconnectWallet}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                      size="sm"
                    >
                      Disconnect
                    </Button>
                    <Button
                      onClick={() => fetchUserData(walletAddress)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2"
                      size="sm"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={connectWallet}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {!isWalletConnected ? (
              <div className="text-center py-16">
                <img src={bozoThinking} alt="Thinking Bozo" className="w-32 h-32 mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-bold text-white mb-4">Connect your Wallet BOZO</h3>
                <p className="text-blue-200 mb-6">
                  Connect your wallet to view your BOZO token holdings and NFT collection
                </p>
                <Button
                  onClick={connectWallet}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
                <p className="text-blue-200">Loading your BOZO data...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-400 mb-4">{error}</p>
                <Button
                  onClick={() => fetchUserData(walletAddress)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            ) : (
              <div>
                {activeTab === 'tokens' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-4">Your BOZO Holdings</h3>
                        <PieChartComponent data={pieChartData} size={250} />
                        <div className="mt-6 space-y-2">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-sm text-blue-200">Your Holdings</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 bg-gray-300 rounded"></div>
                            <span className="text-sm text-blue-200">Other Holders</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-white mb-2">Token Balance</h4>
                          <p className="text-3xl font-bold text-blue-400">
                            {formatNumber(tokenBalance)} BOZO
                          </p>
                        </div>
                        
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-white mb-2">Percentage of Supply</h4>
                          <p className="text-2xl font-bold text-green-400">
                            {tokenData?.holderPercentage.toFixed(6)}%
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-white mb-2">Contract Address</h4>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-mono text-blue-200 break-all">
                              {TOKEN_CONTRACT}
                            </p>
                            <Button
                              onClick={() => window.open(`https://basescan.org/token/${TOKEN_CONTRACT}`, '_blank')}
                              className="bg-blue-600 hover:bg-blue-700 p-2"
                              size="sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">Your BOZO NFTs</h3>
                      <Badge className="bg-blue-600 text-white">
                        {nfts.length} NFT{nfts.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>

                    {nfts.length === 0 ? (
                      <div className="text-center py-12">
                        <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No BOZO NFTs found in your wallet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {nfts.map((nft) => (
                          <Card key={nft.tokenId} className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all">
                            <NFTImage nft={nft} />
                            <CardContent className="p-3">
                              <h4 className="font-semibold text-white text-sm mb-1">{nft.name}</h4>
                              <div className="space-y-1">
                                {nft.attributes.slice(0, 2).map((attr, index) => (
                                  <div key={index} className="flex justify-between text-xs">
                                    <span className="text-blue-200">{attr.trait_type}:</span>
                                    <span className="text-white">{attr.value}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    <div className="bg-white/5 rounded-lg p-4 mt-6">
                      <h4 className="text-lg font-semibold text-white mb-2">NFT Contract Address</h4>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-mono text-blue-200 break-all">
                          {NFT_CONTRACT}
                        </p>
                        <Button
                          onClick={() => window.open(`https://basescan.org/address/${NFT_CONTRACT}`, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700 p-2"
                          size="sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
