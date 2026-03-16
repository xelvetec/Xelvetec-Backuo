import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const headersList = await headers()
    const countryCode = headersList.get('x-vercel-ip-country')?.toUpperCase() || 'DE'
    
    console.log('[v0] Vercel IP Country Header:', countryCode)
    
    return NextResponse.json({ country: countryCode })
  } catch (error) {
    console.error('[v0] Geolocation error:', error)
    return NextResponse.json({ country: 'DE' })
  }
}
