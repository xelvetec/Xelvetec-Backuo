import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://xelvetec.com'),
  title: 'XelveTec - Premium Webdesign Agentur | Deutschland, Schweiz, Österreich, Türkei',
  description: 'XelveTec ist Ihre professionelle Webdesign Agentur in der Schweiz. Wir gestalten moderne, benutzerfreundliche Websites für KMU und Unternehmen in Deutschland, Schweiz, Österreich und Türkei. Responsive Design, SEO-optimiert, schnelle Ladezeiten.',
  keywords: ['Webdesign', 'Webdesign Agentur', 'Website erstellen', 'Responsive Design', 'Web Development', 'Schweiz', 'Deutschland', 'Österreich', 'Türkei', 'KMU', 'Webseite'],
  generator: 'v0.app',
  applicationName: 'XelveTec',
  creator: 'XelveTec GmbH',
  publisher: 'XelveTec',
  authors: [{ name: 'XelveTec Team' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['de_AT', 'de_CH', 'tr_TR', 'en_US'],
    url: 'https://xelvetec.com',
    title: 'XelveTec - Premium Webdesign Agentur für Ihr Unternehmen',
    description: 'Professionelle Webdesign Services in der Schweiz, Deutschland, Österreich & Türkei',
    siteName: 'XelveTec',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XelveTec - Webdesign Agentur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XelveTec - Premium Webdesign Agentur',
    description: 'Moderne Websites für Ihr Geschäft in Deutschland, Schweiz, Österreich & Türkei',
    creator: '@XelveTec',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://xelvetec.com',
    languages: {
      'de-DE': 'https://xelvetec.com/de',
      'de-CH': 'https://xelvetec.com/de-ch',
      'de-AT': 'https://xelvetec.com/de-at',
      'tr-TR': 'https://xelvetec.com/tr',
      'en-US': 'https://xelvetec.com/en',
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'XelveTec GmbH',
    url: 'https://xelvetec.com',
    logo: 'https://xelvetec.com/images/xelvetec-logo.png',
    description: 'Professionelle Webdesign Agentur für Deutschland, Schweiz, Österreich und Türkei',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+41-xxxxxxx',
      email: 'info@xelvetec.com'
    },
    areaServed: ['DE', 'CH', 'AT', 'TR'],
    sameAs: [
      'https://facebook.com/xelvetec',
      'https://instagram.com/xelvetec',
      'https://linkedin.com/company/xelvetec'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Egelseestrasse 31',
      addressLocality: 'Kreuzlingen',
      postalCode: '8280',
      addressCountry: 'CH'
    }
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'XelveTec Webdesign Agentur',
    image: 'https://xelvetec.com/images/xelvetec-logo.png',
    description: 'Premium Webdesign Services für Unternehmen',
    telephone: '+41-xxxxxxx',
    email: 'info@xelvetec.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Egelseestrasse 31',
      addressLocality: 'Kreuzlingen',
      postalCode: '8280',
      addressCountry: 'CH'
    },
    areaServed: ['DE', 'AT', 'CH', 'TR'],
    priceRange: '$$',
    sameAs: 'https://xelvetec.com'
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Webdesign Services',
    description: 'Moderne Webdesign und Web Development für KMU und Unternehmen',
    provider: {
      '@type': 'Organization',
      name: 'XelveTec GmbH'
    },
    areaServed: ['DE', 'AT', 'CH', 'TR'],
    serviceType: ['Web Design', 'Responsive Design', 'SEO Optimization', 'Web Development'],
    priceRange: '$$'
  }

  return (
    <html lang="de" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <link rel="canonical" href="https://xelvetec.com" />
        <link rel="sitemap" href="https://xelvetec.com/sitemap.xml" />
      </head>
      <body className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
