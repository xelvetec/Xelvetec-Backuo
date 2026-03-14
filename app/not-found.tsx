'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Logo */}
      <Link href="/" className="mb-12 hover:scale-110 transition-transform duration-300">
        <Image
          src="/images/xelvetec-logo.png"
          alt="XelveTec"
          width={64}
          height={64}
          className="w-16 h-16 md:w-20 md:h-20"
        />
      </Link>

      {/* 404 Content */}
      <div className="text-center max-w-2xl">
        <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-[#A020F0] to-[#00D4FF] bg-clip-text mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-2">
          Diese Seite konnte nicht gefunden werden.
        </p>
        <p className="text-base md:text-lg text-foreground/60 mb-12">
          Die Seite, die du suchst, existiert möglicherweise nicht oder wurde verschoben.
        </p>

        {/* Home Button */}
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#A020F0] to-[#00D4FF] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#A020F0]/50 transition-all duration-300 transform hover:scale-105"
        >
          Zurück zur Startseite
        </Link>
      </div>

      {/* Decorative particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#A020F0] rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-[#00D4FF] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-[#A020F0] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-1/4 w-2 h-2 bg-[#00D4FF] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  )
}
