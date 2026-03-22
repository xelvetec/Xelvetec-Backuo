# Stripe Multi-Currency Setup (Fixed Prices - No Conversion)

## Übersicht
Dieses System verwendet **vordefinierte Stripe Price IDs**, um Währungsumrechnung zu verhindern. Jedes Land zahlt den **exakten gleichen Preis** in seiner Währung:

- 🇨🇭 Schweiz: **29.90 CHF, 79.90 CHF, 199.90 CHF**
- 🇩🇪 Deutschland/EU: **29.90 EUR, 79.90 EUR, 199.90 EUR**
- 🇹🇷 Türkei: **999 TRY, 2599 TRY, 6499 TRY**

## Warum vordefinierte Price IDs?dfd
- ✅ **Keine automatische Umrechnung** durch Stripe
- ✅ **Exakte Preise** bleiben immer gleich
- ✅ **Vorhersehbar** für Kunden und Abrechnungen
- ✅ **Kontrollierbar** via Stripe Dashboard

## Setup-Anleitung

### Schritt 1: Stripe Dashboard - Products erstellen
1. Gehe zu [Stripe Dashboard](https://dashboard.stripe.com)
2. Products → Create Product
3. Erstelle 3 Produkte:
   - "Website Basic Plan" 
   - "Website Business Plan"
   - "Website E-Commerce Plan"

### Schritt 2: Pricing für jedes Produkt
Für jedes Produkt **3 separate Preise** anlegen:

#### Basic Plan
- **CHF**: 29.90 CHF/month → **Kopiere die Price ID** (z.B. `price_1Oz...`)
- **EUR**: 29.90 EUR/month → **Kopiere die Price ID**
- **TRY**: 999 TRY/month → **Kopiere die Price ID**

#### Business Plan
- **CHF**: 79.90 CHF/month
- **EUR**: 79.90 EUR/month
- **TRY**: 2599 TRY/month

#### E-Commerce Plan
- **CHF**: 199.90 CHF/month
- **EUR**: 199.90 EUR/month
- **TRY**: 6499 TRY/month

### Schritt 3: Environment Variables setzen
Füge in deiner `.env.local` und im Vercel Dashboard folgende Variablen hinzu:

```env
# Basic Plan
STRIPE_BASIC_PRICE_CHF=price_xxxxx
STRIPE_BASIC_PRICE_EUR=price_xxxxx
STRIPE_BASIC_PRICE_TRY=price_xxxxx

# Business Plan
STRIPE_BUSINESS_PRICE_CHF=price_xxxxx
STRIPE_BUSINESS_PRICE_EUR=price_xxxxx
STRIPE_BUSINESS_PRICE_TRY=price_xxxxx

# E-Commerce Plan
STRIPE_ECOMMERCE_PRICE_CHF=price_xxxxx
STRIPE_ECOMMERCE_PRICE_EUR=price_xxxxx
STRIPE_ECOMMERCE_PRICE_TRY=price_xxxxx
```

### Schritt 4: Testen
1. Deploy die App
2. Öffne die Pricing-Seite
3. Teste als Schweizer Nutzer: Sollte "29.90 CHF" zeigen
4. Teste als deutscher Nutzer: Sollte "29.90 EUR" zeigen
5. Klicke auf "Abonnement" und bestätige dass richtige Preis in Stripe Checkout angezeigt wird

## Troubleshooting

### Problem: "Price configuration missing" Error
- **Grund**: Environment Variable nicht gesetzt
- **Lösung**: Überprüfe dass alle `STRIPE_*_PRICE_*` Variablen im Vercel Dashboard gesetzt sind

### Problem: Falsche Währung im Checkout
- **Grund**: Stripe Price ID falsch kopiert
- **Lösung**: Verifiziere die Price IDs im Stripe Dashboard - Format sollte `price_...` sein

### Problem: Kunde sieht Umrechnung (z.B. 31.20 EUR statt 29.90 EUR)
- **Grund**: System verwendet noch alte dynamische `price_data` (nicht vordefinierte Prices)
- **Lösung**: Stelle sicher dass **alle** `STRIPE_*_PRICE_*` Variablen gesetzt sind

## Verwandte Dateien
- `/lib/products.ts` - Product Konfiguration mit Stripe Price IDs
- `/app/api/stripe/subscription-checkout/route.ts` - Checkout API
