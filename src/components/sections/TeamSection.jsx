import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import bozoMain from '../../assets/bozo_no_bg.png'
import bozoDrooling from '../../assets/bozo_drooling_no_bg.png'
import bozoConfused from '../../assets/bozo_confused_refined_no_bg.png'
import bozoHappy from '../../assets/bozo_happy_no_bg.png'

export default function TeamSection() {
  return (
    <section id="team" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <img src={bozoHappy} alt="Happy Bozo" className="w-32 h-32 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Meet the BOZOs</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            The brilliant BOZOs behind the madness!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
            <CardHeader>
              <img src={bozoMain} alt="Bozo CEO" className="w-24 h-24 mx-auto mb-4 rounded-full" />
              <CardTitle>Bozo McBozoface</CardTitle>
              <CardDescription className="text-blue-200">Founder & CEO</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-200">The original Bozo who started it all. 10+ years in crypto, professional meme creator, and certified moon mission commander.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
            <CardHeader>
              <img src={bozoDrooling} alt="Bozo CTO" className="w-24 h-24 mx-auto mb-4 rounded-full" />
              <CardTitle>Dr. Bozo</CardTitle>
              <CardDescription className="text-blue-200">Chief Technology Officer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-200">Blockchain wizard and smart contract guru. Built the most secure and efficient token contract in the meme coin space.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
            <CardHeader>
              <img src={bozoConfused} alt="Bozo CMO" className="w-24 h-24 mx-auto mb-4 rounded-full" />
              <CardTitle>Marketing Bozo</CardTitle>
              <CardDescription className="text-blue-200">Chief Marketing Officer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-200">Viral marketing expert and social media mastermind. Responsible for spreading the Bozo message across the internet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

