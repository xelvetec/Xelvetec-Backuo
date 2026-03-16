import { readFileSync, writeFileSync, readdirSync } from 'fs'

// Find the correct path
const possiblePaths = [
  '/home/user/components/contact-section.tsx',
  '/app/components/contact-section.tsx',
]

let filePath = null
for (const p of possiblePaths) {
  try {
    readFileSync(p, 'utf8')
    filePath = p
    break
  } catch {}
}

// Also try to find it by searching
import { execSync } from 'child_process'
if (!filePath) {
  const found = execSync('find / -name "contact-section.tsx" 2>/dev/null').toString().trim()
  filePath = found.split('\n')[0]
}

console.log('Found at:', filePath)
let content = readFileSync(filePath, 'utf8')

// Replace email div with anchor
content = content.replace(
  /<div([ \t]*className="glass rounded-2xl p-6 flex items-start gap-4[^"]*"[^>]*)>\s*(<div[^>]*>\s*<Mail[^\/]*\/>\s*<\/div>\s*<div>\s*<h4[^<]*contact_email[^<]*<\/h4>\s*<p[^>]*>info@xelvetec\.ch<\/p>\s*<\/div>)\s*<\/div>/s,
  '<a href="mailto:info@xelvetec.ch"$1>$2</a>'
)

// Replace phone div with anchor
content = content.replace(
  /<div([ \t]*className="glass rounded-2xl p-6 flex items-start gap-4[^"]*"[^>]*)>\s*(<div[^>]*>\s*<Phone[^\/]*\/>\s*<\/div>\s*<div>\s*<h4[^<]*contact_phone[^<]*<\/h4>\s*<p[^>]*>\+41[^<]*<\/p>\s*<\/div>)\s*<\/div>/s,
  '<a href="tel:+41768443375"$1>$2</a>'
)

writeFileSync(filePath, content, 'utf8')
console.log('Done!')
console.log('mailto found:', content.includes('mailto:'))
console.log('tel found:', content.includes('tel:+41'))
