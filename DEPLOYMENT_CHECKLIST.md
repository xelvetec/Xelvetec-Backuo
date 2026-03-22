# Phase 2 Deployment Checklist

## Environment Variables erforderlich:

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... (nur für Server-Operationen!)

# Optional: Email Service (Resend, SendGrid, Mailgun, etc.)
RESEND_API_KEY=re_... (bei Verwendung von Resend)
```

## Stripe Webhook Setup:

1. Gehe zu https://dashboard.stripe.com/webhooks
2. Klick "Add endpointh"
3. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Events zum Abhören:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Kopiere das "Signing Secret" → `STRIPE_WEBHOOK_SECRET`

## Supabase Konfiguration:

1. Tabellen sind bereits erstellt (via SQL-Migration)
2. RLS (Row Level Security) Policies sind aktiv
3. Service Role Key ist nur für Server-Side Operations (Webhooks, Admin)

## Email Service Setup (Optional):

Für vollständige Email-Funktionalität, integriere einen der folgenden Services:

### Option 1: Resend (Empfohlen für Startups)
```bash
npm install resend
```

Dann update `/lib/email-templates.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(to: string, language: Language, templateName: string) {
  const template = getEmailTemplate(language, templateName)
  
  await resend.emails.send({
    from: 'noreply@xelvetec.com',
    to: to,
    subject: template.subject,
    html: template.html,
  })
}
```

### Option 2: SendGrid
```bash
npm install @sendgrid/mail
```

### Option 3: Mailgun
```bash
npm install mailgun.js
```

## Testing Checkliste:

### 1. Login Flow (alle 3 Sprachen)
- [ ] Deutsch: /auth (Sign up & Login)
- [ ] Türkisch: /auth (Sign up & Login)
- [ ] Englisch: /auth (Sign up & Login)

### 2. Dashboard (alle 3 Sprachen)
- [ ] Deutsch: /dashboard (Profile, Subscriptions, Invoices)
- [ ] Türkisch: /dashboard
- [ ] Englisch: /dashboard

### 3. Cancellation Flow
- [ ] Cancellation modal shows (Deutsch)
- [ ] Offer selection works (Deutsch, Türkisch, Englisch)
- [ ] Support contact API called correctly

### 4. Stripe Integration
- [ ] Test Stripe webhook: `stripe trigger customer.subscription.created`
- [ ] Check database updates in real-time
- [ ] Confirm payment method configuration works

### 5. Admin Dashboard
- [ ] /admin/dashboard loads
- [ ] Customer list displays
- [ ] Subscription status shows correctly
- [ ] Search functionality works

## Deployment Steps (Vercel):

1. Push code to GitHub
2. Add environment variables in Vercel Dashboard:
   - Settings → Environment Variables
   - Add all required vars from above
3. Trigger deployment (automatic on push, or manual)
4. Test live URLs:
   - https://yourdomain.com/auth (Login)
   - https://yourdomain.com/dashboard (Dashboard)
   - https://yourdomain.com/admin/dashboard (Admin)

## Monitoring:

- Check Vercel Logs for errors
- Monitor Stripe webhook delivery status
- Check email delivery (if using email service)
- Review database for data consistency

## Known Limitations (Phase 2):

- [ ] Email sending is stubbed (ready for email service integration)
- [ ] Admin dashboard needs auth protection (add middleware)
- [ ] Payment method change UI not yet implemented
- [ ] Invoice PDF generation needs Stripe setup

## Next Phase (Phase 3) Features:

- Admin-only middleware for /admin/* routes
- Payment method management UI
- Invoice PDF download integration
- Detailed analytics & churn predictions
- Automated retry for failed payments
