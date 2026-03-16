export type Country = "de" | "at" | "ch" | "tr" | "en"
export type Language = "de" | "tr" | "en"

export const countryToLanguage: Record<Country, Language> = {
  de: "de",
  at: "de",
  ch: "de",
  tr: "tr",
  en: "en",
}

export const prices = {
  basic: { de: "499€", at: "499€", ch: "499CHF", tr: "18.999₺", en: "499€" },
  business: { de: "999€", at: "999€", ch: "999CHF", tr: "29.999₺", en: "999€" },
  ecommerce: { de: "1.999€", at: "1.999€", ch: "1.999CHF", tr: "49.999₺", en: "1.999€" },
  hourly: { de: "89€", at: "89€", ch: "89CHF", tr: "2.999₺", en: "89€" },
} as const

export const translations = {
  de: {
    // Navigation
    nav_home: "Startseite",
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_about: "Über uns",
    nav_contact: "Kontakt",
    nav_impressum: "Impressum",

    // Hero Section
    hero_title: "Webdesign, das begeistert",
    hero_subtitle: "Wir gestalten digitale Erlebnisse, die begeistern. Modernes Webdesign aus der Schweiz für die ganze Welt.",
    hero_cta: "Jetzt Projekt besprechen",

    // Services Section
    services_title: "Unsere Services",
    services_subtitle: "Maßgeschneiderte Lösungen für Ihr digitales Präsenz",
    
    // Pricing Cards
    basic_title: "Basic",
    basic_desc: "Perfekt für Startups",
    basic_f1: "Responsive Design",
    basic_f2: "5 Seiten",
    basic_f3: "SEO Optimiert",
    basic_f4: "Hosting 1 Jahr",
    basic_f5: "Support inkl.",
    
    business_title: "Business",
    business_desc: "Für etablierte Unternehmen",
    business_f1: "Responsive Design",
    business_f2: "Unbegrenzte Seiten",
    business_f3: "SEO Optimiert",
    business_f4: "E-Mail Integration",
    business_f5: "Analytics Setup",
    business_f6: "Premium Support",
    
    ecommerce_title: "E-Commerce",
    ecommerce_desc: "Für Online-Verkäufer",
    ecommerce_f1: "Vollständiger Shop",
    ecommerce_f2: "Produktverwaltung",
    ecommerce_f3: "Zahlungssysteme",
    ecommerce_f4: "Lagerverwaltung",
    ecommerce_f5: "Versand Integration",
    ecommerce_f6: "Marketing-Tools",

    hourly_title: "Individuelle Lösungen",
    hourly_desc: "Flexibel pro Stunde buchbar",
    hourly_f1: "Gezielte Unterstützung",
    hourly_f2: "Neue Unterseiten",
    hourly_f3: "Design-Updates",
    hourly_f4: "Technische Anpassungen",
    hourly_f5: "Faire Stundenabrechnung",

    // Contact Section
    contact_title: "Kontakt",
    contact_email: "E-Mail",
    contact_phone: "Telefon",
    contact_location: "Standort",

    // Footer
    footer_text: "© 2024 XelveTec. Alle Rechte vorbehalten.",

    // Pages
    not_found_title: "Seite nicht gefunden",
    not_found_description: "Die gesuchte Seite existiert nicht.",
    not_found_button: "Zur Startseite",
    
    impressum_title: "Impressum",
    impressum_back_button: "Zur Startseite",
    legal_company_name: "XelveTec GmbH",
    legal_impressum_address_street: "Egelseestrasse 31",
    legal_impressum_address_city: "8280 Kreuzlingen, Schweiz",
    legal_impressum_phone: "+41 76 844 33 75",
    legal_impressum_email: "info@xelvetec.ch",
    legal_responsible: "Verantwortlich für den Inhalt:",
    legal_vat: "UID: CHE-123.456.789",
    legal_disclaimer_title: "Haftungsausschluss",
    legal_disclaimer_text: "Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Für die Vollständigkeit, Richtigkeit und Aktualität wird jedoch keine Haftung übernommen.",
    legal_links: "Externe Links",
    legal_links_text: "XelveTec ist für den Inhalt von Webseiten, auf die von dieser Website verlinkt wird, nicht verantwortlich.",
    legal_cookie_title: "Cookies",
    legal_cookie_text: "Diese Website verwendet Cookies, um dein Nutzererlebnis zu verbessern.",

    // Common
    popular: "Beliebt",
  },

  tr: {
    // Navigation
    nav_home: "Ana Sayfa",
    nav_services: "Hizmetler",
    nav_portfolio: "Portföy",
    nav_about: "Hakkında",
    nav_contact: "İletişim",
    nav_impressum: "İçeriği",

    // Hero Section
    hero_title: "Heyecan Veren Web Tasarımı",
    hero_subtitle: "Dijital deneyimler tasarlarız. İsviçre'den dünya için modern web tasarımı.",
    hero_cta: "Projenizi Tartışın",

    // Services Section
    services_title: "Hizmetlerimiz",
    services_subtitle: "Dijital varlığınız için özel çözümler",
    
    // Pricing Cards
    basic_title: "Temel",
    basic_desc: "Startuplar için mükemmel",
    basic_f1: "Responsive Tasarım",
    basic_f2: "5 Sayfa",
    basic_f3: "SEO Optimize",
    basic_f4: "Hosting 1 Yıl",
    basic_f5: "Destek Dahil",
    
    business_title: "İşletme",
    business_desc: "Kuruluş şirketler için",
    business_f1: "Responsive Tasarım",
    business_f2: "Sınırsız Sayfa",
    business_f3: "SEO Optimize",
    business_f4: "E-Mail Entegrasyonu",
    business_f5: "Analytics Kurulumu",
    business_f6: "Premium Destek",
    
    ecommerce_title: "E-Ticaret",
    ecommerce_desc: "Çevrimiçi satıcılar için",
    ecommerce_f1: "Tam Mağaza",
    ecommerce_f2: "Ürün Yönetimi",
    ecommerce_f3: "Ödeme Sistemleri",
    ecommerce_f4: "Stok Yönetimi",
    ecommerce_f5: "Kargo Entegrasyonu",
    ecommerce_f6: "Marketing Araçları",

    hourly_title: "Özel Çözümler",
    hourly_desc: "Saatlik olarak esnek rezervasyon",
    hourly_f1: "Hedefli Destek",
    hourly_f2: "Yeni Alt Sayfalar",
    hourly_f3: "Tasarım Güncellemeleri",
    hourly_f4: "Teknik Ayarlamalar",
    hourly_f5: "Adil Saatlik Faturalandırma",

    // Contact Section
    contact_title: "İletişim",
    contact_email: "E-Posta",
    contact_phone: "Telefon",
    contact_location: "Konum",

    // Footer
    footer_text: "© 2024 XelveTec. Tüm Hakları Saklıdır.",

    // Pages
    not_found_title: "Sayfa Bulunamadı",
    not_found_description: "Aranan sayfa mevcut değil.",
    not_found_button: "Ana Sayfaya Git",
    
    impressum_title: "İçeriği",
    impressum_back_button: "Ana Sayfaya Git",
    legal_company_name: "XelveTec GmbH",
    legal_impressum_address_street: "Egelseestrasse 31",
    legal_impressum_address_city: "8280 Kreuzlingen, İsviçre",
    legal_impressum_phone: "+41 76 844 33 75",
    legal_impressum_email: "info@xelvetec.ch",
    legal_responsible: "İçeriğinden Sorumlu:",
    legal_vat: "UID: CHE-123.456.789",
    legal_disclaimer_title: "Sorumluluk Reddi",
    legal_disclaimer_text: "Bu web sitesinin içeriği büyük bir özenle hazırlanmıştır. Ancak, bütünlük, doğruluk ve güncellik için hiçbir sorumluluk kabul edilmez.",
    legal_links: "Harici Bağlantılar",
    legal_links_text: "XelveTec, bu web sitesinden bağlantı verilen web sayfalarının içeriğinden sorumlu değildir.",
    legal_cookie_title: "Çerezler",
    legal_cookie_text: "Bu web sitesi, kullanıcı deneyiminizi iyileştirmek için çerezleri kullanır.",

    // Common
    popular: "Popüler",
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_about: "About",
    nav_contact: "Contact",
    nav_impressum: "Imprint",

    // Hero Section
    hero_title: "Web Design That Inspires",
    hero_subtitle: "We create digital experiences that inspire. Modern web design from Switzerland for the world.",
    hero_cta: "Discuss Your Project",

    // Services Section
    services_title: "Our Services",
    services_subtitle: "Tailored solutions for your digital presence",
    
    // Pricing Cards
    basic_title: "Basic",
    basic_desc: "Perfect for startups",
    basic_f1: "Responsive Design",
    basic_f2: "5 Pages",
    basic_f3: "SEO Optimized",
    basic_f4: "Hosting 1 Year",
    basic_f5: "Support Included",
    
    business_title: "Business",
    business_desc: "For established companies",
    business_f1: "Responsive Design",
    business_f2: "Unlimited Pages",
    business_f3: "SEO Optimized",
    business_f4: "Email Integration",
    business_f5: "Analytics Setup",
    business_f6: "Premium Support",
    
    ecommerce_title: "E-Commerce",
    ecommerce_desc: "For online sellers",
    ecommerce_f1: "Full Shop",
    ecommerce_f2: "Product Management",
    ecommerce_f3: "Payment Systems",
    ecommerce_f4: "Inventory Management",
    ecommerce_f5: "Shipping Integration",
    ecommerce_f6: "Marketing Tools",

    hourly_title: "Custom Solutions",
    hourly_desc: "Flexibly bookable by the hour",
    hourly_f1: "Targeted Support",
    hourly_f2: "New Subpages",
    hourly_f3: "Design Updates",
    hourly_f4: "Technical Adjustments",
    hourly_f5: "Fair Hourly Billing",

    // Contact Section
    contact_title: "Contact",
    contact_email: "Email",
    contact_phone: "Phone",
    contact_location: "Location",

    // Footer
    footer_text: "© 2024 XelveTec. All rights reserved.",

    // Pages
    not_found_title: "Page Not Found",
    not_found_description: "The page you are looking for does not exist.",
    not_found_button: "Go to Homepage",
    
    impressum_title: "Imprint",
    impressum_back_button: "Go to Homepage",
    legal_company_name: "XelveTec GmbH",
    legal_impressum_address_street: "Egelseestrasse 31",
    legal_impressum_address_city: "8280 Kreuzlingen, Switzerland",
    legal_impressum_phone: "+41 76 844 33 75",
    legal_impressum_email: "info@xelvetec.ch",
    legal_responsible: "Responsible for content:",
    legal_vat: "UID: CHE-123.456.789",
    legal_disclaimer_title: "Disclaimer",
    legal_disclaimer_text: "The contents of this website are created with great care. However, no liability is assumed for completeness, correctness and topicality.",
    legal_links: "External Links",
    legal_links_text: "XelveTec is not responsible for the content of websites linked from this website.",
    legal_cookie_title: "Cookies",
    legal_cookie_text: "This website uses cookies to improve your user experience.",

    // Common
    popular: "Popular",
  },
} as const

export const t = (language: Language, key: string): string => {
  return translations[language]?.[key as keyof typeof translations[Language]] || key
}
