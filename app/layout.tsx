import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://xelvetec.ch'),
  title: 'XelveTec - Premium Webdesign Agentur | Deutschland, Schweiz, Österreich, Türkei',
  description: 'XelveTec ist Ihre professionelle Webdesign Agentur in der Schweiz. Wir gestalten moderne, benutzerfreundliche Websites für KMU und Unternehmen in Deutschland, Schweiz, Österreich und Türkei. Responsive Design, SEO-optimiert, schnelle Ladezeiten.',
  keywords: ['Webdesign', 'Webdesign Agentur', 'Website erstellen', 'Responsive Design', 'Web Development', 'Schweiz', 'Deutschland', 'Österreich', 'Türkei', 'KMU', 'Webseite', 'Web-Agentur', 'Online Präsenz', 'Digitale Lösung', 'Website Agentur'],
  generator: 'v0.app',
  applicationName: 'XelveTec',
  creator: 'XelveTec',
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
    url: 'https://xelvetec.ch',
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
    canonical: 'https://xelvetec.ch',
    languages: {
      'de-DE': 'https://xelvetec.ch/de',
      'de-CH': 'https://xelvetec.ch/de-ch',
      'de-AT': 'https://xelvetec.ch/de-at',
      'tr-TR': 'https://xelvetec.ch/tr',
      'en-US': 'https://xelvetec.ch/en',
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
    name: 'XelveTec',
    url: 'https://xelvetec.ch',
    logo: 'https://xelvetec.ch/images/xelvetec-logo.png',
    description: 'Professionelle Webdesign Agentur für Deutschland, Schweiz, Österreich und Türkei',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Sales',
        telephone: '+41768443375',
        email: 'info@xelvetec.ch'
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+41768443375'
      }
    ],
    areaServed: ['DE', 'CH', 'AT', 'TR'],
    sameAs: [
      'https://facebook.com/xelvetec',
      'https://instagram.com/xelvetec',
      'https://linkedin.com/company/xelvetec',
      'https://maps.app.goo.gl/TnVD9oQAfrrB9Fn5A?g_st=ic',
      'https://maps.apple.com/p/qAsCjeh5Whaqzv'
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
    '@id': 'https://xelvetec.ch',
    name: 'XelveTec',
    image: 'https://xelvetec.ch/images/xelvetec-logo.png',
    description: 'Premium Webdesign Services für Unternehmen in Deutschland, Schweiz, Österreich und Türkei',
    telephone: '+41768443375',
    email: 'info@xelvetec.ch',
    url: 'https://xelvetec.ch',
    priceRange: '$$',
    rating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Egelseestrasse 31',
      addressLocality: 'Kreuzlingen',
      postalCode: '8280',
      addressCountry: 'CH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '47.6508',
      longitude: '8.9781'
    },
    serviceArea: [
      { '@type': 'Country', name: 'DE' },
      { '@type': 'Country', name: 'CH' },
      { '@type': 'Country', name: 'AT' },
      { '@type': 'Country', name: 'TR' }
    ]
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Webdesign Services',
    description: 'Moderne Webdesign und Web Development für KMU und Unternehmen',
    url: 'https://xelvetec.ch',
    telephone: '+41768443375',
    email: 'info@xelvetec.ch',
    provider: {
      '@type': 'Organization',
      name: 'XelveTec'
    },
    areaServed: ['DE', 'AT', 'CH', 'TR'],
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Webdesign Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Webdesign' }
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Responsive Design' }
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'SEO Optimization' }
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Web Development' }
        }
      ]
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Welche Länder deckt XelveTec ab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'XelveTec bietet Webdesign Services in Deutschland, Schweiz, Österreich und Türkei an.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie kann ich XelveTec kontaktieren?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sie können XelveTec unter +41 76 844 33 75 oder info@xelvetec.ch erreichen.'
        }
      },
      {
        '@type': 'Question',
        name: 'Bietet XelveTec SEO-Optimierung an?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, SEO-Optimierung ist Teil unserer Webdesign Services für bessere Google Rankings.'
        }
      }
    ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <link rel="canonical" href="https://xelvetec.ch" />
        <link rel="sitemap" href="https://xelvetec.ch/sitemap.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
