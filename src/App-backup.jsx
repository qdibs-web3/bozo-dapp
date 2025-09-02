import { useState, useEffect, useRef } from 'react'
import './App.css'

// Import all section components
import Navigation from './components/sections/Navigation.jsx'
import HeroSection from './components/sections/HeroSection.jsx'
import AboutSection from './components/sections/AboutSection.jsx'
import BozonomicsSection from './components/sections/BozonomicsSection.jsx'
import TeamSection from './components/sections/TeamSection.jsx'
import GameSection from './components/sections/GameSection.jsx'
import MemeGeneratorSection from './components/sections/MemeGeneratorSection.jsx'
import FooterSection from './components/sections/FooterSection.jsx'

// Import character images
import bozoMain from './assets/bozo_no_bg.png'
import bozoDrooling from './assets/bozo_drooling_no_bg.png'
import bozoHappy from './assets/bozo_happy_no_bg.png'
import bozoConfused from './assets/bozo_confused_refined_no_bg.png'
import bozoExcited from './assets/bozo_excited_new_no_bg.png'
import bozoThinking from './assets/bozo_thinking_new_no_bg.png'
import bozoSleeping from './assets/bozo_sleeping_new_no_bg.png'
import bozoAngry from './assets/bozo_angry_no_bg.png'
import bozoSurprised from './assets/bozo_surprised_no_bg.png'
import bozoSad from './assets/bozo_sad_no_bg.png'
import bozoLaughing from './assets/bozo_laughing_no_bg.png'
import bozoCool from './assets/bozo_cool_no_bg.png'
import bozoParty from './assets/bozo_party_no_bg.png'
import bozoGenius from './assets/bozo_genius_no_bg.png'
import coinImage from './assets/coin.png'

function App() {
  // Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Wallet state
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  
  // Contract address copy state
  const [contractAddressCopied, setContractAddressCopied] = useState(false)
  
  // New coin catching game state
  const [gameScore, setGameScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [gameTimeLeft, setGameTimeLeft] = useState(30)
  const [bozoX, setBozoX] = useState(250) // Bozo's horizontal position
  const [coins, setCoins] = useState([]) // Array of falling coins
  const [highScore, setHighScore] = useState(localStorage.getItem('bozoHighScore') || 0)
  const gameRef = useRef(null)
  const gameTimerRef = useRef(null)
  const coinSpawnRef = useRef(null)

  // Enhanced meme generator state
  const [memeText, setMemeText] = useState({ 
    top: { text: '', x: 250, y: 50, fontSize: 40, color: '#FFFFFF', strokeColor: '#000000', strokeWidth: 3 },
    bottom: { text: '', x: 250, y: 450, fontSize: 40, color: '#FFFFFF', strokeColor: '#000000', strokeWidth: 3 }
  })
  const [selectedBozoImage, setSelectedBozoImage] = useState(bozoMain)
  const [memeBackground, setMemeBackground] = useState('#FFFFFF')
  const [isTransparentBackground, setIsTransparentBackground] = useState(false)
  const [selectedTextElement, setSelectedTextElement] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [memeRotation, setMemeRotation] = useState(0)
  const [memeScale, setMemeScale] = useState(1)
  const [textShadow, setTextShadow] = useState(true)
  const [textOutline, setTextOutline] = useState(true)
  const canvasRef = useRef(null)

  // Check if wallet is already connected on page load
  useEffect(() => {
    checkWalletConnection()
  }, [])

  // New coin catching game physics
  useEffect(() => {
    let gameLoopId = null
    
    if (gameActive) {
      const gameLoop = () => {
        // Update coin positions
        setCoins(prevCoins => {
          return prevCoins.map(coin => ({
            ...coin,
            y: coin.y + coin.speed
          })).filter(coin => {
            // Check collision with Bozo (with bucket)
            const bozoLeft = bozoX - 40
            const bozoRight = bozoX + 40
            const bozoTop = 320 // Bozo's Y position
            const bozoBottom = 380
            
            if (coin.x >= bozoLeft && coin.x <= bozoRight && 
                coin.y >= bozoTop && coin.y <= bozoBottom) {
              // Coin caught!
              setGameScore(prev => {
                const newScore = prev + 1
                if (newScore > highScore) {
                  setHighScore(newScore)
                  localStorage.setItem('bozoHighScore', newScore.toString())
                }
                return newScore
              })
              return false // Remove caught coin
            }
            
            // Remove coins that fall off screen
            return coin.y < 400
          })
        })
        
        if (gameActive) {
          gameLoopId = requestAnimationFrame(gameLoop)
        }
      }
      
      gameLoopId = requestAnimationFrame(gameLoop)
    }
    
    return () => {
      if (gameLoopId) {
        cancelAnimationFrame(gameLoopId)
      }
    }
  }, [gameActive, bozoX, highScore])

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          setWalletAddress(accounts[0])
        }
      } catch (error) {
        console.log('Error checking wallet connection:', error)
      }
    }
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Copy contract address to clipboard
  const copyContractAddress = async () => {
    const contractAddress = '0xDEEZBOZOSCACOMINGSOONFRFR'
    try {
      await navigator.clipboard.writeText(contractAddress)
      setContractAddressCopied(true)
      setTimeout(() => {
        setContractAddressCopied(false)
      }, 2000)
    } catch (error) {
      console.log('Failed to copy contract address:', error)
    }
  }

  // Web3 wallet connection
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        
        if (accounts.length > 0) {
          setIsWalletConnected(true)
          setWalletAddress(accounts[0])
          
          // Switch to Base network
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x2105' }], // Base mainnet
            })
          } catch (switchError) {
            // If Base network is not added, add it
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
  }

  // New coin catching game functions
  const startGame = () => {
    setGameActive(true)
    setGameScore(0)
    setGameTimeLeft(30)
    setBozoX(250)
    setCoins([])
    
    // Game timer
    gameTimerRef.current = setInterval(() => {
      setGameTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false)
          clearInterval(gameTimerRef.current)
          if (coinSpawnRef.current) {
            clearInterval(coinSpawnRef.current)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    // Coin spawning
    coinSpawnRef.current = setInterval(() => {
      const newCoin = {
        id: Date.now() + Math.random(),
        x: Math.random() * 460 + 20, // Random X position
        y: -20, // Start above screen
        speed: 2 + Math.random() * 3 // Random falling speed
      }
      setCoins(prev => [...prev, newCoin])
    }, 800) // Spawn coin every 800ms
  }

  const moveBozoLeft = () => {
    if (gameActive) {
      setBozoX(prev => Math.max(40, prev - 20))
    }
  }

  const moveBozoRight = () => {
    if (gameActive) {
      setBozoX(prev => Math.min(460, prev + 20))
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameActive) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          moveBozoLeft()
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          moveBozoRight()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameActive])

  // Enhanced meme generator functions
  const generateMeme = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = 500
    canvas.height = 500
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Fill background (only if not transparent)
    if (!isTransparentBackground) {
      ctx.fillStyle = memeBackground
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    
    // Create image
    const img = new Image()
    img.onload = () => {
      ctx.save()
      
      // Apply transformations to the character
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((memeRotation * Math.PI) / 180)
      ctx.scale(memeScale, memeScale)
      
      // Draw character image
      const imgSize = 300
      ctx.drawImage(img, -imgSize / 2, -imgSize / 2, imgSize, imgSize)
      
      ctx.restore()

      // Draw text elements
      drawTextElement(ctx, memeText.top, 'top')
      drawTextElement(ctx, memeText.bottom, 'bottom')
    }
    img.src = selectedBozoImage
  }

  const drawTextElement = (ctx, textObj, type) => {
    if (!textObj.text) return
    
    ctx.font = `bold ${textObj.fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.fillStyle = textObj.color
    
    // Text effects
    if (textShadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
    }
    
    if (textOutline) {
      ctx.strokeStyle = textObj.strokeColor
      ctx.lineWidth = textObj.strokeWidth
      ctx.strokeText(textObj.text.toUpperCase(), textObj.x, textObj.y)
    }
    
    ctx.fillText(textObj.text.toUpperCase(), textObj.x, textObj.y)
    
    // Reset shadow
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }

  const downloadMeme = () => {
    generateMeme()
    setTimeout(() => {
      const canvas = canvasRef.current
      const link = document.createElement('a')
      link.download = 'bozo-meme.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }, 100)
  }

  // Canvas interaction handlers
  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    // Check if clicking on text elements
    const topTextBounds = getTextBounds(memeText.top)
    const bottomTextBounds = getTextBounds(memeText.bottom)

    if (isPointInBounds(x, y, topTextBounds)) {
      setSelectedTextElement('top')
      setIsDragging(true)
      setDragOffset({ x: x - memeText.top.x, y: y - memeText.top.y })
    } else if (isPointInBounds(x, y, bottomTextBounds)) {
      setSelectedTextElement('bottom')
      setIsDragging(true)
      setDragOffset({ x: x - memeText.bottom.x, y: y - memeText.bottom.y })
    } else {
      setSelectedTextElement(null)
    }
  }

  const handleCanvasMouseMove = (e) => {
    if (!isDragging || !selectedTextElement) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const newX = x - dragOffset.x
    const newY = y - dragOffset.y

    setMemeText(prev => ({
      ...prev,
      [selectedTextElement]: {
        ...prev[selectedTextElement],
        x: Math.max(50, Math.min(450, newX)),
        y: Math.max(30, Math.min(470, newY))
      }
    }))
  }

  const handleCanvasMouseUp = () => {
    setIsDragging(false)
    setSelectedTextElement(null)
  }

  const getTextBounds = (textObj) => {
    if (!textObj.text) return { x: 0, y: 0, width: 0, height: 0 }
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.font = `bold ${textObj.fontSize}px Arial`
    const metrics = ctx.measureText(textObj.text.toUpperCase())
    
    return {
      x: textObj.x - metrics.width / 2 - 10,
      y: textObj.y - textObj.fontSize - 5,
      width: metrics.width + 20,
      height: textObj.fontSize + 10
    }
  }

  const isPointInBounds = (x, y, bounds) => {
    return x >= bounds.x && x <= bounds.x + bounds.width &&
           y >= bounds.y && y <= bounds.y + bounds.height
  }

  const resetMemeSettings = () => {
    setMemeText({
      top: { text: '', x: 250, y: 50, fontSize: 40, color: '#FFFFFF', strokeColor: '#000000', strokeWidth: 3 },
      bottom: { text: '', x: 250, y: 450, fontSize: 40, color: '#FFFFFF', strokeColor: '#000000', strokeWidth: 3 }
    })
    setMemeBackground('#FFFFFF')
    setIsTransparentBackground(false)
    setMemeRotation(0)
    setMemeScale(1)
    setSelectedBozoImage(bozoMain)
  }

  const applyRandomEffect = () => {
    const effects = [
      () => setMemeRotation(Math.random() * 30 - 15), // Random rotation
      () => setMemeScale(0.8 + Math.random() * 0.4), // Random scale
      () => setMemeBackground(`hsl(${Math.random() * 360}, 70%, 50%)`), // Random color
      () => setMemeText(prev => ({
        ...prev,
        top: { ...prev.top, fontSize: 30 + Math.random() * 30 },
        bottom: { ...prev.bottom, fontSize: 30 + Math.random() * 30 }
      }))
    ]
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)]
    randomEffect()
  }

  useEffect(() => {
    generateMeme()
  }, [memeText, selectedBozoImage, memeBackground, isTransparentBackground, memeRotation, memeScale, textShadow, textOutline])

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const bozoImages = [
    { src: bozoMain, name: 'Classic Bozo' },
    { src: bozoDrooling, name: 'Drooling Bozo' },
    { src: bozoHappy, name: 'Happy Bozo' },
    { src: bozoConfused, name: 'Confused Bozo' },
    { src: bozoExcited, name: 'Excited Bozo' },
    { src: bozoThinking, name: 'Thinking Bozo' },
    { src: bozoSleeping, name: 'Sleeping Bozo' },
    { src: bozoAngry, name: 'Angry Bozo' },
    { src: bozoSurprised, name: 'Surprised Bozo' },
    { src: bozoSad, name: 'Sad Bozo' },
    { src: bozoLaughing, name: 'Laughing Bozo' },
    { src: bozoCool, name: 'Cool Bozo' },
    { src: bozoParty, name: 'Party Bozo' },
    { src: bozoGenius, name: 'Genius Bozo' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        scrollToSection={scrollToSection}
        formatAddress={formatAddress}
      />

      <HeroSection 
        bozoExcited={bozoExcited}
        contractAddressCopied={contractAddressCopied}
        copyContractAddress={copyContractAddress}
      />

      <AboutSection 
        bozoHappy={bozoHappy}
      />

      <BozonomicsSection 
        bozoThinking={bozoThinking}
      />

      <TeamSection 
        bozoMain={bozoMain}
        bozoDrooling={bozoDrooling}
        bozoConfused={bozoConfused}
        bozoHappy={bozoHappy}
      />

      <GameSection 
        gameScore={gameScore}
        highScore={highScore}
        gameActive={gameActive}
        gameTimeLeft={gameTimeLeft}
        coins={coins}
        coinImage={coinImage}
        bozoX={bozoX}
        bozoExcited={bozoExcited}
        gameRef={gameRef}
        startGame={startGame}
        moveBozoLeft={moveBozoLeft}
        moveBozoRight={moveBozoRight}
      />

      <MemeGeneratorSection 
        bozoImages={bozoImages}
        selectedBozoImage={selectedBozoImage}
        setSelectedBozoImage={setSelectedBozoImage}
        memeText={memeText}
        setMemeText={setMemeText}
        memeBackground={memeBackground}
        setMemeBackground={setMemeBackground}
        isTransparentBackground={isTransparentBackground}
        setIsTransparentBackground={setIsTransparentBackground}
        memeRotation={memeRotation}
        setMemeRotation={setMemeRotation}
        memeScale={memeScale}
        setMemeScale={setMemeScale}
        textShadow={textShadow}
        setTextShadow={setTextShadow}
        textOutline={textOutline}
        setTextOutline={setTextOutline}
        selectedTextElement={selectedTextElement}
        canvasRef={canvasRef}
        handleCanvasMouseDown={handleCanvasMouseDown}
        handleCanvasMouseMove={handleCanvasMouseMove}
        handleCanvasMouseUp={handleCanvasMouseUp}
        applyRandomEffect={applyRandomEffect}
        resetMemeSettings={resetMemeSettings}
        downloadMeme={downloadMeme}
      />

      <FooterSection 
        bozoMain={bozoMain}
      />
    </div>
  )
}

export default App

