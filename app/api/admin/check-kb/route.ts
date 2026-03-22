import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function GET() {
  try {
    console.log('[v0] Checking knowledge base...')

    // Get count of KB items
    const { count, error: countError } = await supabase
      .from('knowledge_base')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      return Response.json({
        error: 'Error counting KB items',
        details: countError.message,
      })
    }

    console.log('[v0] KB item count:', count)

    // Get sample items
    const { data: items, error: itemError } = await supabase
      .from('knowledge_base')
      .select('id, title, section, content')
      .limit(5)

    if (itemError) {
      return Response.json({
        error: 'Error fetching KB items',
        details: itemError.message,
      })
    }

    console.log('[v0] Sample items:', items?.length)

    return Response.json({
      success: true,
      totalItems: count,
      sampleItems: items,
      message: count === 0 ? 'Knowledge base is empty! Run populate-kb first.' : 'Knowledge base has data.',
    })
  } catch (error) {
    console.error('[v0] Error checking KB:', error)
    return Response.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
