# Stripe Webhook Setup Guide

## Was ist der Webhook?
Der Webhook ist die **Verbindung zwischen Stripe und deiner App**. Wenn ein Kunde bezahlt, sendet Stripe ein Event an deinen Webhook, der dann:
- ✅ Die Subscription in Supabase speichert
- ✅ Den Status auf "active" setzt
- ✅ Bestätigungsmail sendet
- ✅ Rechnungen speichert

## WICHTIG: Webhook ist noch NICHT aktiv!
Du musst ihn manuell bei Stripe registrieren, sonst funktioniert das Abo-System nicht!

## Setup-Anleitung (5 Minuten)

### Schritt 1: Webhook Secret holen
1. Gehe zu [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Klick auf "Add an endpoint"
3. URL eingeben: **`https://xelvetec.com/api/webhooks/stripe`**
4. Events auswählen:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Klick "Add endpoint"
6. Kopiere das **Signing Secret** (beginnt mit `whsec_`)

### Schritt 2: Environment Variable setzen
Füge in Vercel Dashboard (Settings → Environment Variables) hinzu:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### Schritt 3: Fertig!
Nach dem Neudeploy sind Webhooks aktiv. Teste:
1. Kaufe ein Abo
2. Nach erfolgreicher Zahlung → Dashboard zeigt aktives Abo
3. Überprüfe Supabase (Tabelle `subscriptions`) → Subscription mit Status "active"

## Testen (mit Stripe CLI - optional)

Falls du lokal testen möchtest:

```bash
# Stripe CLI installieren
brew install stripe/stripe-cli/stripe

# Anmelden
stripe login

# Webhook zu localhost weiterleiten
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In anderer Terminal: Testabonnement erstellen
stripe fixtures fixtures.json
```

## Troubleshooting

**Problem**: "Webhook nicht aktiv" oder "Subscription wird nicht gespeichert"
- **Grund**: STRIPE_WEBHOOK_SECRET nicht gesetzt
- **Lösung**: Überprüfe Vercel Dashboard → Environment Variables

**Problem**: "Forbidden" Error im Webhook Log
- **Grund**: Falsche Signing Secret kopiert
- **Lösung**: Überprüfe dass `STRIPE_WEBHOOK_SECRET` exakt mit Stripe Dashboard Wert übereinstimmt

**Problem**: Webhook wird gar nicht aufgerufen
- **Grund**: Endpoint URL falsch
- **Lösung**: Überprüfe dass URL exakt **`https://xelvetec.com/api/webhooks/stripe`** ist (nicht mit/without slash!)

## Webhook Events

Diese Events werden verarbeitet:

| Event | Was passiert |
|-------|-------------|
| `customer.subscription.created` | Subscription wird "active", Email wird gesendet |
| `customer.subscription.updated` | Status wird aktualisiert (active/paused/cancelled) |
| `customer.subscription.deleted` | Status wird "cancelled", Email wird gesendet |
| `invoice.payment_succeeded` | Rechnung wird gespeichert |
| `invoice.payment_failed` | Fehler-Email wird gesendet |

## Nach dem Setup

Dein Subscription-Flow ist jetzt:

```
1. User klickt "Abo aktivieren"
2. Stripe Checkout öffnet (richtige Währung, richtiger Preis)
3. User bezahlt
4. Stripe ruft deinen Webhook auf
5. Webhook speichert Subscription in Supabase
6. Dashboard zeigt "Aktives Abonnement"
7. Email wird gesendet
```

## Verwandte Dateien
- `/app/api/webhooks/stripe/route.ts` - Webhook Handler
- `/lib/email-service.ts` - Emails
- STRIPE_SETUP.md - Preise konfigurieren
