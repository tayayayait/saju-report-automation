import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, systemInstruction, model } = await req.json()

    // 1. Validate inputs
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    // 2. Get GEMINI_API_KEY from edge function env
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured on the server.")
    }

    // 3. User requested gemini-3-flash-preview. Use it as default.
    const targetModel = model || 'gemini-3-flash-preview';
    
    // We add alt=sse to the URL to receive Server-Sent Events natively from Gemini
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:streamGenerateContent?alt=sse&key=${apiKey}`
    
    const payload = {
      system_instruction: systemInstruction ? {
        parts: [{ text: systemInstruction }]
      } : undefined,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini Error:", err);
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    // 4. Stream back to the client directly (SSE format)
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });

  } catch (error: any) {
    console.error("Edge Function Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
