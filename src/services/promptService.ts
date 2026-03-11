import { supabase } from '@/integrations/supabase/client';

export interface PromptVariable {
  key: string;
  name: string;
  type: 'system' | 'user';
  description?: string;
}

export const getPromptVariables = (): PromptVariable[] => {
  return [
    { key: 'customer_name', name: '고객명', type: 'system' },
    { key: 'birth_date', name: '생년월일', type: 'system' },
    { key: 'gender', name: '성별', type: 'system' },
    { key: 'job_focus', name: '직업운 강화', type: 'user' },
    { key: 'health_focus', name: '건강운 상세', type: 'user' },
  ];
};

export const fetchLatestPromptVersion = async (mode: string) => {
  // In a real scenario, this would fetch from a prompts configuration table
  // For now, returning a static version string mock
  return `v1.2.0-${mode}`;
};
