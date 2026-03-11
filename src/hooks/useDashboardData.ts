import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface KPIData {
  todayCreated: number;
  reviewNeeded: number;
  failed: number;
  published: number;
}

export interface RecentCase {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
}

export function useDashboardData() {
  const [kpi, setKpi] = useState<KPIData>({ todayCreated: 0, reviewNeeded: 0, failed: 0, published: 0 });
  const [recentCases, setRecentCases] = useState<RecentCase[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];

    try {
      const [casesRes, customersRes] = await Promise.all([
        supabase.from('cases').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('customers').select('id, name'),
      ]);

      const cases = casesRes.data || [];
      const customers = customersRes.data || [];
      const customerMap = new Map(customers.map(c => [c.id, c.name]));

      setKpi({
        todayCreated: cases.filter(c => c.created_at?.startsWith(today)).length,
        reviewNeeded: cases.filter(c => c.status === 'review_needed').length,
        failed: cases.filter(c => c.status === 'failed').length,
        published: cases.filter(c => c.status === 'completed').length,
      });

      setRecentCases(cases.slice(0, 10).map(c => ({
        id: c.id,
        status: c.status,
        created_at: c.created_at,
        updated_at: c.updated_at,
        customer_name: customerMap.get(c.customer_id) || '알 수 없음',
      })));
    } catch (e) {
      console.error('Failed to fetch dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { kpi, recentCases, loading, refetch: fetchData };
}
