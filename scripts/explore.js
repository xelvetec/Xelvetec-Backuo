import { readdirSync } from 'fs'

// Check /code
try {
  console.log('/code:', readdirSync('/code').join(', '))
} catch(e) { console.log('/code ERROR:', e.code) }

// Check what's in the scripts folder itself to find where we are
try {
  console.log('/code/components:', readdirSync('/code/components').slice(0,5).join(', '))
} catch(e) {}

// Try process.cwd()
import { cwd } from 'process'
console.log('cwd:', cwd())

import { realpathSync } from 'fs'
console.log('scripts realpath:', realpathSync('/vercel/share/v0-project/scripts'))
