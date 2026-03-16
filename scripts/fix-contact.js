import { readFileSync, writeFileSync } from 'fs'

const filePath = '/vercel/share/v0-project/components/contact-section.tsx'
let content = readFileSync(filePath, 'utf8')

// Replace email div with anchor
content = content.replace(
  '<div className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">\n              <div\n                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"\n                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}\n              >\n                <Mail className="w-5 h-5 text-foreground" style={{ color: "#fff" }} />\n              </div>\n              <div>\n                <h4 className="font-semibold text-foreground mb-1">{t("contact_email")}</h4>\n                <p className="text-sm text-foreground/50">info@xelvetec.ch</p>\n              </div>\n            </div>',
  '<a href="mailto:info@xelvetec.ch" className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">\n              <div\n                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"\n                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}\n              >\n                <Mail className="w-5 h-5 text-foreground" style={{ color: "#fff" }} />\n              </div>\n              <div>\n                <h4 className="font-semibold text-foreground mb-1">{t("contact_email")}</h4>\n                <p className="text-sm text-foreground/50">info@xelvetec.ch</p>\n              </div>\n            </a>'
)

// Replace phone div with anchor
content = content.replace(
  '<div className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">\n              <div\n                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"\n                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}\n              >\n                <Phone className="w-5 h-5" style={{ color: "#fff" }} />\n              </div>\n              <div>\n                <h4 className="font-semibold text-foreground mb-1">{t("contact_phone")}</h4>\n                <p className="text-sm text-foreground/50">+41 76 844 33 75</p>\n              </div>\n            </div>',
  '<a href="tel:+41768443375" className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">\n              <div\n                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"\n                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}\n              >\n                <Phone className="w-5 h-5" style={{ color: "#fff" }} />\n              </div>\n              <div>\n                <h4 className="font-semibold text-foreground mb-1">{t("contact_phone")}</h4>\n                <p className="text-sm text-foreground/50">+41 76 844 33 75</p>\n              </div>\n            </a>'
)

writeFileSync(filePath, content, 'utf8')
console.log('Done! Email and phone are now clickable.')
