import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Use Supabase Auth to resend verification email
    const { error } = await supabase.auth.resendIdentityConfirmationLink({
      email,
      type: 'email_change',
    })

    if (error) {
      console.error('[v0] Error resending verification email:', error)
      return NextResponse.json(
        { error: 'Failed to resend verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Verification email sent' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
