import { readFileSync, writeFileSync } from 'fs'

const filePath = '/code/components/contact-section.tsx'
let content = readFileSync(filePath, 'utf8')
console.log('File read, length:', content.length)

const emailOld = `<div className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}
              >
                <Mail className="w-5 h-5 text-foreground" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_email")}</h4>
                <p className="text-sm text-foreground/50">info@xelvetec.ch</p>
              </div>
            </div>`

const emailNew = `<a href="mailto:info@xelvetec.ch" className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}
              >
                <Mail className="w-5 h-5 text-foreground" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_email")}</h4>
                <p className="text-sm text-foreground/50">info@xelvetec.ch</p>
              </div>
            </a>`

const phoneOld = `<div className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}
              >
                <Phone className="w-5 h-5" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_phone")}</h4>
                <p className="text-sm text-foreground/50">+41 76 844 33 75</p>
              </div>
            </div>`

const phoneNew = `<a href="tel:+41768443375" className="glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #A020F0, #3B82F6)" }}
              >
                <Phone className="w-5 h-5" style={{ color: "#fff" }} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{t("contact_phone")}</h4>
                <p className="text-sm text-foreground/50">+41 76 844 33 75</p>
              </div>
            </a>`

content = content.replace(emailOld, emailNew)
content = content.replace(phoneOld, phoneNew)

console.log('mailto found:', content.includes('mailto:info@xelvetec.ch'))
console.log('tel found:', content.includes('tel:+41768443375'))

writeFileSync(filePath, content, 'utf8')
console.log('Done!')
