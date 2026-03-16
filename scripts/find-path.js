import { readdirSync } from 'fs'

const dirs = ['/', '/home/user', '/app', '/workspace', '/project', '/vercel', '/vercel/share', '/vercel/share/v0-project']

for (const d of dirs) {
  try {
    const files = readdirSync(d)
    console.log(d + ':', files.slice(0, 8).join(', '))
  } catch(e) {
    console.log(d + ': ERROR -', e.code)
  }
}
