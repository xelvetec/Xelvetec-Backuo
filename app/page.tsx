import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
            Welcome to v0
          </h1>
          <p className="text-xl text-slate-300">
            Build beautiful, modern web applications with ease
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-slate-600 text-white hover:bg-slate-800"
          >
            Learn More
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-8">
          <Card className="border-slate-700 bg-slate-800/50 p-6 backdrop-blur">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white">⚡</div>
              <h3 className="font-semibold text-white">Fast</h3>
              <p className="text-sm text-slate-400">
                Lightning-fast performance out of the box
              </p>
            </div>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 p-6 backdrop-blur">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white">🎨</div>
              <h3 className="font-semibold text-white">Beautiful</h3>
              <p className="text-sm text-slate-400">
                Stunning designs and components ready to use
              </p>
            </div>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 p-6 backdrop-blur">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white">🔧</div>
              <h3 className="font-semibold text-white">Flexible</h3>
              <p className="text-sm text-slate-400">
                Fully customizable to fit your needs
              </p>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-sm text-slate-400">
            Built with Next.js 16, React 19, and Tailwind CSS
          </p>
        </div>
      </div>
    </main>
  )
}
