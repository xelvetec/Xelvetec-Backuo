import { createClient } from '@supabase/supabase-js'

let supabaseAdminInstance: any = null

export function getSupabaseAdmin() {
  if (!supabaseAdminInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    }

    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return supabaseAdminInstance
}

// Keep for backwards compatibility (for client-side code that might import it)
export const supabaseAdmin = new Proxy(
  {},
  {
    get(target, prop) {
      return getSupabaseAdmin()[prop as string]
    },
  }
) as any
