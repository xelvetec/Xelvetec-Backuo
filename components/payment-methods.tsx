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
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: t("payment_digital"),
      icon: Smartphone,
      items: ["Twint", "Apple Pay"],
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: t("payment_transfer"),
      icon: DollarSign,
      items: ["Banküberweisung"],
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/20",
    },
    {
      title: t("payment_cash"),
      icon: Banknote,
      items: ["Barzahlung"],
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-500/20",
    },
  ]

  const currencies = ["CHF", "EUR", "₺ (Lira)"]

  return (
    <div className="w-full bg-gradient-to-r from-foreground/5 to-transparent rounded-2xl p-6 md:p-8 border border-foreground/10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5" style={{ color: "#A020F0" }} />
            {t("payment_methods")}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {paymentGroups.map((group) => {
              const IconComponent = group.icon
              return (
                <div
                  key={group.title}
                  className={`bg-gradient-to-br ${group.color} border ${group.borderColor} rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:border-foreground/30`}
                >
                  <div className="flex items-start gap-2 mb-3">
                    <IconComponent className="w-5 h-5 flex-shrink-0" style={{ color: "#A020F0" }} />
                    <h4 className="font-semibold text-sm text-foreground">{group.title}</h4>
                  </div>
                  <ul className="text-xs text-foreground/60 space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-foreground/30"></span>
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
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" style={{ color: "#A020F0" }} />
              {t("currencies")}
            </h3>

            <div className="space-y-3">
              {currencies.map((currency) => (
                <div
                  key={currency}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-foreground/5 to-foreground/[0.02] border border-foreground/10 rounded-xl hover:border-foreground/20 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg"
                    style={{
                      background: "linear-gradient(135deg, #A020F0, #3B82F6)",
                      color: "#fff",
                    }}
                  >
                    {currency.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{currency}</p>
                    <p className="text-xs text-foreground/40">
                      {currency === "CHF" && "Schweizer Franken"}
                      {currency === "EUR" && "Euro"}
                      {currency === "₺ (Lira)" && "Türkische Lira"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div
            className="mt-6 p-4 rounded-xl text-center border"
            style={{
              background: "linear-gradient(135deg, #A020F0, #3B82F6)",
              opacity: 0.1,
              borderColor: "#A020F0",
            }}
          >
            <p className="text-xs font-semibold text-foreground/70">
              💳 Sichere & schnelle Zahlungsabwicklung
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
