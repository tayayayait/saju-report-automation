import { supabase } from '@/integrations/supabase/client';

export interface GenerateRequest {
  caseId: string;
  mode: string;
  model: string;
  scopes: { [key: string]: boolean };
  promptVersion: string;
  promptText: string;
}

export const generateDraft = async (
  request: GenerateRequest, 
  onProgress?: (step: string) => void,
  onChunk?: (text: string) => void
) => {
  try {
    if (onProgress) onProgress('prepare');
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (onProgress) onProgress('prompt');
    const systemInstruction = "당신은 20년 경력의 명리학 사주 전문가입니다. 제시된 사주 원국과 고객 정보를 바탕으로 분석 리포트를 작성합니다.";
    
    if (onProgress) onProgress('request');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey =
      import.meta.env.VITE_SUPABASE_ANON_KEY ??
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    const response = await fetch(`${supabaseUrl}/functions/v1/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token ?? anonKey}`
      },
      body: JSON.stringify({
        prompt: request.promptText,
        systemInstruction,
        model: request.model
      })
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
    }
    
    if (onProgress) onProgress('process');

    const reader = response.body?.getReader();
    if (!reader) throw new Error('스트림을 읽을 수 없습니다.');
    
    const decoder = new TextDecoder();
    let fullText = '';
    
    while(true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      
      for (const line of lines) {
         if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr && dataStr !== '[DONE]') {
               try {
                  const data = JSON.parse(dataStr);
                  const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textPart) {
                     fullText += textPart;
                     if (onChunk) onChunk(fullText);
                  }
               } catch(e) {}
            }
         }
      }
    }

    if (onProgress) onProgress('complete');
    return fullText;
  } catch (error: any) {
    console.error(error);
    throw new Error('초안 생성 중 오류가 발생했습니다: ' + error.message);
  }
};

export const generateCategoryAnalysis = async (
  promptText: string,
  modelName: string = 'gemini-2.5-flash',
  onChunk?: (text: string) => void
) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const systemInstruction = "당신은 20년 경력의 명리학 사주 전문가입니다. 제시된 사주 원국과 고객 정보를 바탕으로 분석 리포트를 작성합니다.";
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey =
      import.meta.env.VITE_SUPABASE_ANON_KEY ??
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    const response = await fetch(`${supabaseUrl}/functions/v1/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token ?? anonKey}`
      },
      body: JSON.stringify({
        prompt: promptText,
        systemInstruction,
        model: modelName
      })
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('스트림을 읽을 수 없습니다.');
    
    const decoder = new TextDecoder();
    let fullText = '';
    
    while(true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      
      for (const line of lines) {
         if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr && dataStr !== '[DONE]') {
               try {
                  const data = JSON.parse(dataStr);
                  const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textPart) {
                     fullText += textPart;
                     if (onChunk) onChunk(fullText);
                  }
               } catch(e) {}
            }
         }
      }
    }

    return fullText;
  } catch (error: any) {
    console.error(error);
    throw new Error('분석 생성 중 오류가 발생했습니다: ' + error.message);
  }
};
