import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Download, Palette, RotateCcw, Move, Type, Zap } from 'lucide-react'

// Import character images
import bozoMain from '../../assets/bozo_no_bg.png'
import bozoDrooling from '../../assets/bozo_drooling_no_bg.png'
import bozoHappy from '../../assets/bozo_happy_no_bg.png'
import bozoConfused from '../../assets/bozo_confused_refined_no_bg.png'
import bozoExcited from '../../assets/bozo_excited_new_no_bg.png'
import bozoThinking from '../../assets/bozo_thinking_new_no_bg.png'
import bozoSleeping from '../../assets/bozo_sleeping_new_no_bg.png'
import bozoAngry from '../../assets/bozo_angry_no_bg.png'
import bozoSurprised from '../../assets/bozo_surprised_no_bg.png'
import bozoSad from '../../assets/bozo_sad_no_bg.png'
import bozoLaughing from '../../assets/bozo_laughing_no_bg.png'
import bozoCool from '../../assets/bozo_cool_no_bg.png'
import bozoParty from '../../assets/bozo_party_no_bg.png'
import bozoGenius from '../../assets/bozo_genius_no_bg.png'

export default function MemeGeneratorSection({
  bozoImages,
  selectedBozoImage,
  setSelectedBozoImage,
  memeText,
  setMemeText,
  memeBackground,
  setMemeBackground,
  isTransparentBackground,
  setIsTransparentBackground,
  memeRotation,
  setMemeRotation,
  memeScale,
  setMemeScale,
  textShadow,
  setTextShadow,
  textOutline,
  setTextOutline,
  selectedTextElement,
  canvasRef,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  applyRandomEffect,
  resetMemeSettings,
  downloadMeme
}) {
  const localCanvasRef = useRef(null)
  const actualCanvasRef = canvasRef || localCanvasRef

  const localBozoImages = bozoImages || [
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

  const generateMeme = () => {
    const canvas = actualCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = 500
    canvas.height = 500
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Fill background (only if not transparent)
    if (!isTransparentBackground) {
      ctx.fillStyle = memeBackground || '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    
    // Create image
    const img = new Image()
    img.onload = () => {
      ctx.save()
      
      // Apply transformations to the character
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(((memeRotation || 0) * Math.PI) / 180)
      ctx.scale(memeScale || 1, memeScale || 1)
      
      // Draw character image
      const imgSize = 300
      ctx.drawImage(img, -imgSize / 2, -imgSize / 2, imgSize, imgSize)
      
      ctx.restore()

      // Draw text elements if they exist
      if (memeText && memeText.top) {
        drawTextElement(ctx, memeText.top, 'top')
      }
      if (memeText && memeText.bottom) {
        drawTextElement(ctx, memeText.bottom, 'bottom')
      }
    }
    img.src = selectedBozoImage || bozoMain
  }

  const drawTextElement = (ctx, textObj, type) => {
    if (!textObj || !textObj.text) return
    
    ctx.font = `bold ${textObj.fontSize || 40}px Arial`
    ctx.textAlign = 'center'
    ctx.fillStyle = textObj.color || '#FFFFFF'
    
    // Text effects
    if (textShadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
    }
    
    if (textOutline) {
      ctx.strokeStyle = textObj.strokeColor || '#000000'
      ctx.lineWidth = textObj.strokeWidth || 3
      ctx.strokeText(textObj.text.toUpperCase(), textObj.x || 250, textObj.y || (type === 'top' ? 50 : 450))
    }
    
    ctx.fillText(textObj.text.toUpperCase(), textObj.x || 250, textObj.y || (type === 'top' ? 50 : 450))
    
    // Reset shadow
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }

  const handleDownloadMeme = () => {
    generateMeme()
    setTimeout(() => {
      const canvas = actualCanvasRef.current
      if (canvas) {
        const link = document.createElement('a')
        link.download = 'bozo-meme.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
    }, 100)
  }

  useEffect(() => {
    generateMeme()
  }, [memeText, selectedBozoImage, memeBackground, isTransparentBackground, memeRotation, memeScale, textShadow, textOutline])

  return (
    <section id="meme-generator" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Palette className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Bozo Meme Generator</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Create your own hilarious Bozo memes! Choose a character, add text, customize effects, and download your masterpiece.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Character Selection */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Choose Your Bozo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {localBozoImages.map((bozo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedBozoImage && setSelectedBozoImage(bozo.src)}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        selectedBozoImage === bozo.src
                          ? 'border-blue-400 bg-blue-400/20'
                          : 'border-gray-600 hover:border-blue-400'
                      }`}
                    >
                      <img src={bozo.src} alt={bozo.name} className="w-full h-12 object-contain" />
                      <p className="text-xs mt-1 text-center">{bozo.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Text Controls */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Meme Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Text 1:</label>
                    <input
                      type="text"
                      value={memeText?.top?.text || ''}
                      onChange={(e) => setMemeText && setMemeText(prev => ({
                        ...prev,
                        top: { ...prev.top, text: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      placeholder="Enter text 1..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Text 2:</label>
                    <input
                      type="text"
                      value={memeText?.bottom?.text || ''}
                      onChange={(e) => setMemeText && setMemeText(prev => ({
                        ...prev,
                        bottom: { ...prev.bottom, text: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      placeholder="Enter text 2..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="textShadow"
                      checked={textShadow || false}
                      onChange={(e) => setTextShadow && setTextShadow(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="textShadow" className="text-sm">Text Shadow</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="textOutline"
                      checked={textOutline || false}
                      onChange={(e) => setTextOutline && setTextOutline(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="textOutline" className="text-sm">Text Outline</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="transparentBg"
                      checked={isTransparentBackground || false}
                      onChange={(e) => setIsTransparentBackground && setIsTransparentBackground(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="transparentBg" className="text-sm">Transparent Background</label>
                  </div>
                </div>

                {!isTransparentBackground && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Background Color:</label>
                    <input
                      type="color"
                      value={memeBackground || '#FFFFFF'}
                      onChange={(e) => setMemeBackground && setMemeBackground(e.target.value)}
                      className="w-full h-10 rounded border border-gray-600"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rotation:</label>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      value={memeRotation || 0}
                      onChange={(e) => setMemeRotation && setMemeRotation(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-blue-200">{memeRotation || 0}°</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Scale:</label>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      value={memeScale || 1}
                      onChange={(e) => setMemeScale && setMemeScale(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-blue-200">{memeScale || 1}x</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={applyRandomEffect || (() => {})} className="bg-purple-600 hover:bg-purple-700 flex-1">
                    <Zap className="w-4 h-4 mr-2" />
                    Random Effect
                  </Button>
                  <Button onClick={resetMemeSettings || (() => {})} className="bg-gray-600 hover:bg-gray-700 flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
                
                <Button onClick={downloadMeme || handleDownloadMeme} className="bg-green-600 hover:bg-green-700 w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Meme
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Canvas */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Move className="w-5 h-5 mr-2" />
                Preview (Drag Text to Move)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={actualCanvasRef}
                  className="w-full max-w-md mx-auto border border-gray-600 rounded cursor-move"
                  style={{ 
                    aspectRatio: '1/1', 
                    background: isTransparentBackground ? 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'20\'%3e%3crect x=\'0\' y=\'0\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'url(%23a)\'/%3e%3c/svg%3e")' : 'transparent' 
                  }}
                  onMouseDown={handleCanvasMouseDown || (() => {})}
                  onMouseMove={handleCanvasMouseMove || (() => {})}
                  onMouseUp={handleCanvasMouseUp || (() => {})}
                />
                {selectedTextElement && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    Dragging {selectedTextElement} text
                  </div>
                )}
              </div>
              <p className="text-xs text-blue-200 mt-2 text-center">
                Click and drag text to reposition it on the canvas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}