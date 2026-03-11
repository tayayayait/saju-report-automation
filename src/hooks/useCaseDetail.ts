import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CaseData {
  id: string;
  status: string;
  generation_mode: string | null;
  prompt_version: string | null;
  model: string | null;
  pdf_version: number | null;
  created_at: string;
  updated_at: string;
  draft_content?: string | null;
  final_content?: string | null;
  customer: {
    name: string;
    gender: string;
    birth_date: string;
    birth_time: string | null;
    birth_place: string | null;
    calendar_type: string;
  };
}

export function useCaseDetail(id: string | undefined) {
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCase = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from('cases')
        .select(`
          id, status, generation_mode, prompt_version, model, pdf_version, created_at, updated_at, draft_content, final_content,
          customers!inner(name, gender, birth_date, birth_time, birth_place, calendar_type)
        `)
        .eq('id', id)
        .single();

      if (data) {
        const customer = Array.isArray(data.customers) ? data.customers[0] : data.customers;
        setCaseData({
          ...data,
          customer: customer as CaseData['customer'],
        });
      }
    } catch (e) {
      console.error('Failed to fetch case detail:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  return { caseData, loading, refetch: fetchCase };
}
