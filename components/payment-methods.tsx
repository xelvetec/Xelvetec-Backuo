
"use client"

import { useLanguage } from "@/lib/language-context"
import { CreditCard, Smartphone, Banknote, DollarSign } from "lucide-react"

export function PaymentMethods() {
  const { t } = useLanguage()

  const paymentGroups = [
    {
      title: t("payment_cards"),
      icon: CreditCard,
      items: ["Visa", "Mastercard", "Girocard (EC)"],
      color: "#3B82F6",
    },
    {
      title: t("payment_digital"),
      icon: Smartphone,
      items: ["Twint", "Apple Pay"],
      color: "#A020F0",
    },
    {
      title: t("payment_transfer"),
      icon: DollarSign,
      items: ["Banküberweisung"],
      color: "#10B981",
    },
    {
      title: t("payment_cash"),
      icon: Banknote,
      items: ["Barzahlung"],
      color: "#F59E0B",
    },
  ]

  const currencies = ["CHF", "EUR", "₺ (Lira)"]

  return (
    <div className="w-full rounded-2xl p-8 md:p-12 border border-foreground/10"
      style={{
        background: "linear-gradient(135deg, rgba(160,32,240,0.08) 0%, rgba(59,130,246,0.05) 100%)",
      }}>
      <div className="grid md:grid-cols-2 gap-12">
        {/* Payment Methods */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <CreditCard className="w-6 h-6" style={{ color: "#A020F0" }} />
            {t("payment_methods")}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {paymentGroups.map((group) => {
              const IconComponent = group.icon
              return (
                <div
                  key={group.title}
                  className="rounded-2xl p-5 transition-all duration-300 hover:scale-105 border-2"
                  style={{
                    background: `linear-gradient(135deg, ${group.color}15, ${group.color}08)`,
                    borderColor: group.color + "40",
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <IconComponent className="w-6 h-6 flex-shrink-0" style={{ color: group.color }} />
                    <h4 className="font-bold text-sm text-foreground leading-tight">{group.title}</h4>
                  </div>
                  <ul className="text-xs text-foreground/70 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: group.color }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Currencies */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <DollarSign className="w-6 h-6" style={{ color: "#A020F0" }} />
              {t("currencies")}
            </h3>

            <div className="flex items-center gap-4">
              {currencies.map((currency, idx) => {
                const symbols = { CHF: "CHF", EUR: "€", "₺ (Lira)": "₺" }
                return (
                  <div
                    key={currency}
                    className="flex items-center justify-center w-14 h-14 rounded-lg transition-all hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: `${idx * 0.3}s`,
                    }}
                    title={currency}
                  >
                    <span className="font-bold text-lg text-foreground/70">
                      {symbols[currency] || currency.charAt(0)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Security Badge */}
          <div
            className="mt-8 p-3 rounded-lg text-center text-sm font-semibold text-foreground/60"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            💳 Sichere & schnelle Zahlungsabwicklung
          </div>
        </div>
      </div>
    </div>
  )
}
