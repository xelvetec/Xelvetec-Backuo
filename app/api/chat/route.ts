import { streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  console.log('[v0] Chat API called')
  
  try {
    const body = await req.json()
    console.log('[v0] Request body:', JSON.stringify(body).substring(0, 100))
    
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('[v0] Invalid messages:', messages)
      return new Response(JSON.stringify({ error: 'Invalid messages' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    console.log('[v0] Last message:', lastMessage)
    
    if (!lastMessage || lastMessage.role !== 'user') {
      console.log('[v0] Invalid message role')
      return new Response(JSON.stringify({ error: 'Invalid message' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    let userText = ''
    if (typeof lastMessage.content === 'string') {
      userText = lastMessage.content
    } else if (Array.isArray(lastMessage.content)) {
      const textPart = lastMessage.content.find((p: any) => p.type === 'text')
      if (textPart) {
        userText = textPart.text
      }
    } else if (lastMessage.content && typeof lastMessage.content === 'object') {
      userText = (lastMessage.content as any).text || ''
    }

    console.log('[v0] User text:', userText)

    if (!userText.trim()) {
      console.log('[v0] Empty message text')
      return new Response(JSON.stringify({ error: 'Empty message' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get knowledge base context
    let contextText = ''
    try {
      const { data: kbData } = await supabase
        .from('knowledge_base')
        .select('title, content')
        .limit(5)
      
      if (kbData && kbData.length > 0) {
        contextText = kbData
          .map((item: any) => `${item.title}: ${item.content}`)
          .join('\n\n')
        console.log('[v0] KB context retrieved:', contextText.substring(0, 100))
      } else {
        console.log('[v0] No KB data found')
      }
    } catch (error) {
      console.log('[v0] KB search error:', error)
    }

    const systemPrompt = `Du bist ein hilfreicher AI-Assistent für xelvetec.ch. Du sprichst perfekt Deutsch, Türkisch und Englisch.

Du hilfst Kunden mit Fragen zu unseren Services wie Webentwicklung, SEO, Hosting, E-Commerce und App-Entwicklung.

Sei freundlich, professionell und hilfsbereit. Wenn du etwas nicht weißt, sage ehrlich Bescheid.

${contextText ? `\nVerfügbare Informationen:\n${contextText}` : ''}`

    console.log('[v0] System prompt length:', systemPrompt.length)

    // Convert messages for the model
    console.log('[v0] Converting messages...')
    const modelMessages = await convertToModelMessages(messages)
    console.log('[v0] Converted messages count:', modelMessages.length)

    // Stream response
    console.log('[v0] Starting stream with model: openai/gpt-4o')
    const result = streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
      maxTokens: 1024,
    })

    console.log('[v0] Streaming response...')
    
    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    })
  } catch (error) {
    console.error('[v0] Chat API error:', error)
    const errorMsg = error instanceof Error ? error.message : String(error)
    return new Response(JSON.stringify({ error: 'Internal server error', details: errorMsg }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
