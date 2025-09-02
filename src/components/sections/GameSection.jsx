import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Gamepad2, Trophy } from 'lucide-react'
import bozoExcited from '../../assets/bozo_excited_new_no_bg.png'
import bozoSleeping from '../../assets/bozo_sleeping_new_no_bg.png'
import coinImage from '../../assets/coin.png'

export default function GameSection({ 
  gameScore, 
  gameActive, 
  gameTimeLeft, 
  bozoX, 
  coins, 
  highScore, 
  startGame, 
  moveBozoLeft, 
  moveBozoRight 
}) {
  const gameRef = useRef(null)

  return (
    <section id="game" className="py-20 px-4 bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Gamepad2 className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Bozo Coin Catch!</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Help Sad BOZO catch falling coins with his bucket! Catch as many coins as you can in 30 seconds, dont let BOZO down!
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center space-x-8 mb-4">
              <div className="text-center">
                <CardTitle className="text-2xl">Score: {gameScore}</CardTitle>
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  High Score: {highScore}
                </CardTitle>
              </div>
              {gameActive && (
                <div className="text-center">
                  <CardTitle className="text-2xl flex items-center">
                    Time: {gameTimeLeft}s
                  </CardTitle>
                </div>
              )}
            </div>
            <CardDescription className="text-blue-200">
              {gameActive ? 'Use arrow keys or buttons to move Bozo left and right!' : 'Click Start to begin the coin catching challenge!'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              ref={gameRef}
              className="relative h-96 bg-gradient-to-br from-blue-800 to-cyan-800 rounded-lg overflow-hidden mb-6"
            >
              {/* Falling coins */}
              {coins.map(coin => (
                <img
                  key={coin.id}
                  src={coinImage}
                  alt="Falling coin"
                  className="absolute w-8 h-8"
                  style={{
                    left: `${coin.x}px`,
                    top: `${coin.y}px`,
                  }}
                />
              ))}
              
              {/* Bozo with bucket */}
              {gameActive && (
                <div 
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${bozoX - 40}px`,
                    top: '320px',
                  }}
                >
                  {/* Bucket (simple div for now) */}
                  <div className="w-16 h-8 bg-gray-600 rounded-b-lg border-2 border-gray-800 mb-2"></div>
                  {/* Bozo character */}
                  <img
                    src={bozoExcited}
                    alt="Bozo with bucket"
                    className="w-16 h-16"
                  />
                </div>
              )}
              
              {!gameActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={bozoSleeping} alt="Sleeping Bozo" className="w-32 h-32 opacity-50" />
                </div>
              )}
              
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-600 opacity-70"></div>
            </div>
            
            {/* Mobile controls */}
            <div className="flex justify-center space-x-4 mb-6 md:hidden">
              <Button
                onClick={moveBozoLeft}
                disabled={!gameActive}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                size="lg"
              >
                ← Left
              </Button>
              <Button
                onClick={moveBozoRight}
                disabled={!gameActive}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                size="lg"
              >
                Right →
              </Button>
            </div>
            
            <div className="text-center">
              <Button
                onClick={startGame}
                disabled={gameActive}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                size="lg"
              >
                {gameActive ? `Game in Progress... ${gameTimeLeft}s` : 'Start Coin Catching Game'}
              </Button>
              {gameScore > 0 && !gameActive && (
                <p className="mt-4 text-blue-200">
                  BOZO! You caught {gameScore} coins! 
                  {gameScore === highScore && gameScore > 0 && " 🎉 NEW HIGH SCORE! 🎉"}
                </p>
              )}
              <p className="mt-2 text-sm text-blue-300">
                Use keys to move, BOZO
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

