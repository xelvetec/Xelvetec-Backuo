import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BackgroundParticles } from '@/components/background-particles'
import { CookieBanner } from '@/components/cookie-banner'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const _inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  preload: true,
  display: 'swap',
  fallback: ['system-ui', 'arial']
});
const _geistMono = Geist_Mono({ 
  subsets: ["latin"], 
  variable: "--font-geist-mono",
  preload: true,
  display: 'swap',
  fallback: ['monospace']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://xelvetec.com'),
  title: 'XelveTec - Premium Webdesign Agentur | Deutschland, Schweiz, Österreich, Türkei',
  description: 'XelveTec ist Ihre professionelle Webdesign Agentur in der Schweiz. Wir gestalten moderne, benutzerfreundliche Websites für KMU und Unternehmen in Deutschland, Schweiz, Österreich und Türkei. Responsive Design, SEO-optimiert, schnelle Ladezeiten.',
  keywords: ['Webdesign', 'Webdesign Agentur', 'Website erstellen', 'Responsive Design', 'Web Development', 'Schweiz', 'Deutschland', 'Österreich', 'Türkei', 'KMU', 'Webseite', 'Web-Agentur', 'Online Präsenz', 'Digitale Lösung'],
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
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://xelvetec.ch'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Portfolio',
        'item': 'https://xelvetec.ch#portfolio'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Kontakt',
        'item': 'https://xelvetec.ch#kontakt'
      }
    ]
  }

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
        email: 'business@xelvetec.com'
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
      'https://maps.app.goo.gl/TnVD9oQAfrrB9Fn5A',
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
    email: 'business@xelvetec.com',
    url: 'https://xelvetec.ch',
    priceRange: '$$',
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
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Turkey' }
    ]
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Webdesign Services',
    description: 'Moderne Webdesign und Web Development für KMU und Unternehmen',
    url: 'https://xelvetec.ch',
    telephone: '+41768443375',
    email: 'business@xelvetec.com',
    areaServed: ['DE', 'AT', 'CH', 'TR'],
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Webdesign Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Webdesign'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Responsive Design'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Optimization'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development'
          }
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
          text: 'Sie können XelveTec unter +41 76 844 33 75 oder business@xelvetec.com erreichen.'
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

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Person',
      name: 'Google Maps Bewertung'
    },
    datePublished: '2026-03-13',
    reviewBody: 'Professionelle Webdesign Services von XelveTec',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'XelveTec',
    url: 'https://xelvetec.com',
      telephone: '+41768443375',
      image: 'https://xelvetec.ch/images/xelvetec-logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Egelseestrasse 31',
        addressLocality: 'Kreuzlingen',
        postalCode: '8280',
        addressCountry: 'CH'
      }
    }
  }

  return (
    <html lang="de" className="dark">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4.0.0/dist/build/email.min.js"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              if (window.emailjs) {
                window.emailjs.init('eIsW61NVlqzcGHV4w');
              }
            })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
          suppressHydrationWarning
        />
        <link rel="canonical" href="https://xelvetec.ch" />
        <link rel="sitemap" href="https://xelvetec.ch/sitemap.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        {/* Global background particles for entire website */}
        <BackgroundParticles />
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
        <Analytics />
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('🔥 EmailJS Script startet...');
              emailjs.init({ publicKey: "eIsW61NVlqzcGHV4w" });
              document.addEventListener('DOMContentLoaded', function() {
                const form = document.querySelector('form[data-contact-form]');
                if (!form) {
                  console.error('❌ Kontakt-Form nicht gefunden!');
                  return;
                }
                console.log('✅ Kontakt-Form gefunden:', form);
                
                form.addEventListener('submit', async function(e) {
                  e.preventDefault();
                  console.log('🚀 Submit - Form data:', Object.fromEntries(new FormData(form)));
                  
                  try {
                    const result = await emailjs.sendForm('service_wzudoxa', 'template_mopajh7', form);
                    console.log('🎉 SUCCESS!', result);
                    form.reset();
                  } catch (error) {
                    console.error('💥 DETAILED ERROR:', error);
                  }
                });
                console.log('✅ Listener attached');
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
