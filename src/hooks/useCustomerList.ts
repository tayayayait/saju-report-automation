import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CustomerListItem {
  id: string;
  name: string;
  gender: string;
  birth_date: string;
  birth_place: string | null;
  created_at: string;
}

export function useCustomerList() {
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('customers')
        .select('id, name, gender, birth_date, birth_place, created_at')
        .order('created_at', { ascending: false });
      setCustomers(data || []);
    } catch (e) {
      console.error('Failed to fetch customers:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return { 
    customers, 
    filteredCustomers: filtered, 
    search, 
    setSearch, 
    loading, 
    refetch: fetchCustomers 
  };
}
