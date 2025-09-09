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
  <section id="meme-generator" className="py-16 px-4 bg-black/20">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Bozo Meme Generator</h2>
        <p className="text-lg text-blue-200 max-w-2xl mx-auto">
          Create edgy sick memes with our collection of Bozos! Choose your favorite Bozo, add text, format, and share the memes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character Selection - Compact */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Choose Bozo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {localBozoImages.map((bozo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBozoImage && setSelectedBozoImage(bozo.src)}
                  className={`p-2 rounded border-2 transition-all ${
                    selectedBozoImage === bozo.src 
                      ? 'border-blue-400 bg-blue-400/20' 
                      : 'border-gray-600 hover:border-blue-300'
                  }`}
                >
                  <img src={bozo.src} alt={bozo.name} className="w-full h-12 object-contain" />
                  <span className="text-xs mt-1 block truncate">{bozo.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Text Controls - Compact */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Meme Text & Style</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <input
                type="text"
                value={memeText?.top?.text || ''}
                onChange={(e) => setMemeText && setMemeText(prev => ({
                  ...prev,
                  top: { ...prev.top, text: e.target.value }
                }))}
                className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                placeholder="Top text..."
              />
              <input
                type="text"
                value={memeText?.bottom?.text || ''}
                onChange={(e) => setMemeText && setMemeText(prev => ({
                  ...prev,
                  bottom: { ...prev.bottom, text: e.target.value }
                }))}
                className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                placeholder="Bottom text..."
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={textShadow || false}
                  onChange={(e) => setTextShadow && setTextShadow(e.target.checked)}
                  className="rounded"
                />
                <span>Shadow</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={textOutline || false}
                  onChange={(e) => setTextOutline && setTextOutline(e.target.checked)}
                  className="rounded"
                />
                <span>Outline</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={isTransparentBackground || false}
                  onChange={(e) => setIsTransparentBackground && setIsTransparentBackground(e.target.checked)}
                  className="rounded"
                />
                <span>Transparent</span>
              </label>
            </div>

            {!isTransparentBackground && (
              <div>
                <label className="block text-xs font-medium mb-1">Background:</label>
                <input
                  type="color"
                  value={memeBackground || '#FFFFFF'}
                  onChange={(e) => setMemeBackground && setMemeBackground(e.target.value)}
                  className="w-full h-8 rounded border border-gray-600"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">Rotation:</label>
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
                <label className="block text-xs font-medium mb-1">Scale:</label>
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

            <div className="grid grid-cols-3 gap-1">
              <Button onClick={applyRandomEffect || (() => {})} className="bg-purple-600 hover:bg-purple-700 text-xs py-1">
                <Zap className="w-3 h-3 mr-1" />
                Random
              </Button>
              <Button onClick={resetMemeSettings || (() => {})} className="bg-gray-600 hover:bg-gray-700 text-xs py-1">
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
              <Button onClick={downloadMeme || handleDownloadMeme} className="bg-green-600 hover:bg-green-700 text-xs py-1">
                <Download className="w-3 h-3 mr-1" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Canvas - Compact */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              Preview & Download
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <canvas
                ref={actualCanvasRef}
                className="w-full border border-gray-600 rounded cursor-move"
                style={{ 
                  aspectRatio: '1/1', 
                  maxHeight: '280px',
                  background: isTransparentBackground ? 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'20\'%3e%3crect x=\'0\' y=\'0\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23f0f0f0\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'url(%23a)\'/%3e%3c/svg%3e")' : 'transparent' 
                }}
                onMouseDown={handleCanvasMouseDown || (() => {})}
                onMouseMove={handleCanvasMouseMove || (() => {})}
                onMouseUp={handleCanvasMouseUp || (() => {})}
              />
              {selectedTextElement && (
                <div className="absolute top-1 left-1 bg-blue-600 text-white px-1 py-0.5 rounded text-xs">
                  Dragging {selectedTextElement}
                </div>
              )}
            </div>
            <p className="text-xs text-blue-200 mt-2 text-center">
              Drag text to reposition
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
)
}