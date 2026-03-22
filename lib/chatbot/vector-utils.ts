import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: text,
    })
    return embedding
  } catch (error) {
    console.error('[v0] Error generating embedding:', error)
    throw error
  }
}

export async function searchKnowledgeBase(
  query: string,
  limit: number = 5
): Promise<
  Array<{
    id: string
    content: string
    title: string
    section: string
    similarity: number
  }>
> {
  try {
    // Get embedding for the query
    const queryEmbedding = await getEmbedding(query)

    // Search for similar documents in Supabase
    const { data, error } = await supabase.rpc('search_knowledge_base', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.6,
      match_count: limit,
    })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('[v0] Error searching knowledge base:', error)
    return []
  }
}

export async function getRelevantContext(
  query: string,
  language: string
): Promise<string> {
  try {
    const results = await searchKnowledgeBase(query, 5)

    if (results.length === 0) {
      return ''
    }

    // Format context from search results
    const context = results
      .map((result) => `${result.title}\n${result.content}`)
      .join('\n\n---\n\n')

    return context
  } catch (error) {
    console.error('[v0] Error getting relevant context:', error)
    return ''
  }
}
