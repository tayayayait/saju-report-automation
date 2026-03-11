import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HistoryItem {
  id: string;
  status: string;
  created_at: string;
  generation_mode: string | null;
  pdf_version: number | null;
  updated_at: string;
  customers: {
    name: string;
  };
}

export function useHistoryData() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HistoryItem[]>([]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      let query = supabase.from('cases').select(`
        id, status, created_at, generation_mode, pdf_version, updated_at,
        customers!inner(name)
      `).order('updated_at', { ascending: false }).limit(20);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as any);
      }
      
      if (search) {
        query = query.ilike('customers.name', `%${search}%`);
      }

      const { data: casesData } = await query;
      setData(casesData || []);
    } catch (e) {
      console.error('Failed to fetch history:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [search, statusFilter]);

  return { 
    data, 
    search, 
    setSearch, 
    statusFilter, 
    setStatusFilter, 
    loading, 
    refetch: fetchHistory 
  };
}
