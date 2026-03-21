import { Language } from './translations'

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

const emailTemplates: Record<Language, Record<string, EmailTemplate>> = {
  de: {
    welcome: {
      subject: 'Willkommen bei XelveTec!',
      html: `
        <h1>Willkommen!</h1>
        <p>Vielen Dank, dass du dich bei XelveTec registriert hast.</p>
        <p>Dein Konto ist jetzt aktiviert. Du kannst dich jederzeit anmelden und deine Abonnements verwalten.</p>
        <a href="https://xelvetec.com/dashboard">Zum Dashboard</a>
      `,
      text: 'Willkommen bei XelveTec! Dein Konto ist nun aktiviert.',
    },
    subscriptionActivated: {
      subject: 'Abonnement aktiviert - XelveTec',
      html: `
        <h1>Abonnement aktiviert!</h1>
        <p>Vielen Dank! Dein Abonnement ist jetzt aktiv.</p>
        <p>Du erhältst alle enthalten Services sofort.</p>
        <a href="https://xelvetec.com/dashboard">Zur Abonnement-Übersicht</a>
      `,
      text: 'Dein Abonnement wurde aktiviert.',
    },
    subscriptionCancelled: {
      subject: 'Abonnement gekündigt - XelveTec',
      html: `
        <h1>Abonnement gekündigt</h1>
        <p>Dein Abonnement wurde erfolgreich gekündigt.</p>
        <p>Du wirst bis zum Ende der aktuellen Abrechnungsperiode noch Zugriff haben.</p>
        <p>Wenn du Fragen hast, kontaktiere uns gerne!</p>
      `,
      text: 'Dein Abonnement wurde gekündigt.',
    },
    invoiceReady: {
      subject: 'Deine Rechnung ist verfügbar - XelveTec',
      html: `
        <h1>Neue Rechnung</h1>
        <p>Deine Rechnung für diesen Monat ist verfügbar.</p>
        <a href="https://xelvetec.com/dashboard">Rechnung ansehen</a>
      `,
      text: 'Deine Rechnung ist bereit zum Download.',
    },
    paymentFailed: {
      subject: 'Zahlungsversuch fehlgeschlagen - XelveTec',
      html: `
        <h1>Zahlungsversuch fehlgeschlagen</h1>
        <p>Leider konnten wir deine Zahlung nicht verarbeiten.</p>
        <p>Bitte aktualisiere deine Zahlungsmethode in deinen Kontoeinstellungen.</p>
        <a href="https://xelvetec.com/dashboard">Zahlungsmethode aktualisieren</a>
      `,
      text: 'Deine Zahlungsart konnte nicht verarbeitet werden.',
    },
  },
  tr: {
    welcome: {
      subject: 'XelveTec\'e Hoş Geldiniz!',
      html: `
        <h1>Hoş Geldiniz!</h1>
        <p>XelveTec\'e kaydolduğunuz için teşekkür ederiz.</p>
        <p>Hesabınız artık aktif. İstediğiniz zaman giriş yapıp aboneliklerinizi yönetebilirsiniz.</p>
        <a href="https://xelvetec.com/dashboard">Panele Git</a>
      `,
      text: 'XelveTec\'e Hoş Geldiniz! Hesabınız aktif hale geldi.',
    },
    subscriptionActivated: {
      subject: 'Abonelik Aktifleştirildi - XelveTec',
      html: `
        <h1>Abonelik Aktif!</h1>
        <p>Teşekkürler! Aboneliğiniz artık aktif.</p>
        <p>Tüm hizmetleri hemen kullanmaya başlayabilirsiniz.</p>
        <a href="https://xelvetec.com/dashboard">Abonelik Özeti</a>
      `,
      text: 'Aboneliğiniz aktifleştirildi.',
    },
    subscriptionCancelled: {
      subject: 'Abonelik İptal Edildi - XelveTec',
      html: `
        <h1>Abonelik İptal Edildi</h1>
        <p>Aboneliğiniz başarıyla iptal edilmiştir.</p>
        <p>Geçerli fatura döneminin sonuna kadar erişime sahip olacaksınız.</p>
        <p>Sorularınız varsa, bize ulaşmaktan çekinmeyin!</p>
      `,
      text: 'Aboneliğiniz iptal edildi.',
    },
    invoiceReady: {
      subject: 'Faturanız Hazır - XelveTec',
      html: `
        <h1>Yeni Fatura</h1>
        <p>Bu ay için faturanız hazır.</p>
        <a href="https://xelvetec.com/dashboard">Faturayı Görüntüle</a>
      `,
      text: 'Faturanız indirmeye hazır.',
    },
    paymentFailed: {
      subject: 'Ödeme Başarısız - XelveTec',
      html: `
        <h1>Ödeme Başarısız</h1>
        <p>Ne yazık ki ödemenizi işleyemedik.</p>
        <p>Lütfen hesap ayarlarınızdan ödeme yönteminizi güncelleyin.</p>
        <a href="https://xelvetec.com/dashboard">Ödeme Yöntemi Güncelle</a>
      `,
      text: 'Ödeme yönteminiz işlenemedi.',
    },
  },
  en: {
    welcome: {
      subject: 'Welcome to XelveTec!',
      html: `
        <h1>Welcome!</h1>
        <p>Thank you for signing up for XelveTec.</p>
        <p>Your account is now active. You can sign in anytime and manage your subscriptions.</p>
        <a href="https://xelvetec.com/dashboard">Go to Dashboard</a>
      `,
      text: 'Welcome to XelveTec! Your account is now active.',
    },
    subscriptionActivated: {
      subject: 'Subscription Activated - XelveTec',
      html: `
        <h1>Subscription Activated!</h1>
        <p>Thank you! Your subscription is now active.</p>
        <p>You can start using all included services immediately.</p>
        <a href="https://xelvetec.com/dashboard">View Subscription</a>
      `,
      text: 'Your subscription has been activated.',
    },
    subscriptionCancelled: {
      subject: 'Subscription Cancelled - XelveTec',
      html: `
        <h1>Subscription Cancelled</h1>
        <p>Your subscription has been successfully cancelled.</p>
        <p>You will have access until the end of your current billing period.</p>
        <p>If you have any questions, feel free to contact us!</p>
      `,
      text: 'Your subscription has been cancelled.',
    },
    invoiceReady: {
      subject: 'Your Invoice is Ready - XelveTec',
      html: `
        <h1>New Invoice</h1>
        <p>Your invoice for this month is ready.</p>
        <a href="https://xelvetec.com/dashboard">View Invoice</a>
      `,
      text: 'Your invoice is ready to download.',
    },
    paymentFailed: {
      subject: 'Payment Failed - XelveTec',
      html: `
        <h1>Payment Failed</h1>
        <p>Unfortunately, we could not process your payment.</p>
        <p>Please update your payment method in your account settings.</p>
        <a href="https://xelvetec.com/dashboard">Update Payment Method</a>
      `,
      text: 'Your payment method could not be processed.',
    },
  },
}

export function getEmailTemplate(language: Language, template: string): EmailTemplate | null {
  return emailTemplates[language]?.[template] || null
}

export async function sendEmail(to: string, language: Language, templateName: string, variables?: Record<string, string>) {
  const template = getEmailTemplate(language, templateName)
  if (!template) {
    console.error(`[v0] Email template not found: ${templateName}`)
    return false
  }

  try {
    // TODO: Integrate with email service (SendGrid, Mailgun, Resend, etc.)
    console.log(`[v0] Sending email to ${to} (${language}): ${templateName}`)
    return true
  } catch (error) {
    console.error('[v0] Failed to send email:', error)
    return false
  }
}
