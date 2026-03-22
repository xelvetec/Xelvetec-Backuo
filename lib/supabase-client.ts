import { createClient } from '@supabase/supabase-js'

let supabaseInstance: any = null

export function getSupabaseClient() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('[v0] Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
      // Return a dummy client for type safety during build
      return createClient('', '')
    }

    supabaseInstance = createClient(supabaseUrl, supabaseKey)
  }

  return supabaseInstance
}

// Keep for backwards compatibility
export const supabase = new Proxy(
  {},
  {
    get(target, prop) {
      return getSupabaseClient()[prop as string]
    },
  }
) as any

export type Database = {
  public: {
    Tables: {
      users_profile: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string
          stripe_subscription_id: string
          status: string
          tier: string
          currency: string
          amount: number
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          stripe_invoice_id: string
          amount: number
          currency: string
          status: string
          pdf_url: string | null
          created_at: string
        }
      }
      cancellation_offers: {
        Row: {
          id: string
          user_id: string
          reason: string
          discount_percentage: number | null
          discount_months: number | null
          custom_offer: string | null
          status: string
          created_at: string
        }
      }
    }
  }
}
