import { useState, useEffect } from 'react';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Search, Filter, Download, ChevronLeft, ChevronRight, History, MoreVertical } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, [search, statusFilter]);

  const fetchHistory = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-full font-display flex flex-col items-center">
      <div className="w-full max-w-[1520px] px-4 md:px-8 py-5 flex flex-col flex-1">
        
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8 mt-2">
          <div>
            <h2 className="text-3xl font-black text-[#1A2B3C] tracking-tight flex items-center gap-3">
              <History className="w-8 h-8 text-[#E67E22]" />
              History Management
            </h2>
            <p className="text-gray-500 mt-1 text-sm">전체 사주 리포트 생성 및 퍼블리싱 이력을 확인하고 관리합니다.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-[#1A2B3C] border border-gray-200 hover:bg-gray-50 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            CSV 다운로드
          </button>
        </header>

        {/* Content Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 min-h-[500px] overflow-hidden">
          
          {/* Search & Filters */}
          <div className="p-5 border-b border-gray-200 flex flex-wrap items-center gap-4 bg-gray-50/50">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white text-[#1A2B3C] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] sm:text-sm transition-colors" 
                placeholder="고객명으로 검색..." 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] h-10 bg-white border-gray-200 text-[#1A2B3C] focus:ring-[#E67E22]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="completed">발행 완료</SelectItem>
                  <SelectItem value="review_needed">검토 필요</SelectItem>
                  <SelectItem value="failed">실패</SelectItem>
                  <SelectItem value="draft">초안</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-10 bg-white border-gray-200 text-[#1A2B3C] focus:ring-[#E67E22]">
                <SelectValue placeholder="템플릿 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 템플릿</SelectItem>
                <SelectItem value="30p">기본 30p</SelectItem>
                <SelectItem value="100p">프리미엄 100p</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-[#F1F5F9]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/4">Customer</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/6">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/6">Template</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/12">PDF Version</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/6">최종 수정일</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/12">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={6} className="px-6 py-4">
                        <div className="h-10 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                      <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">조회된 이력 데이터가 없습니다.</p>
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-gray-50 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/cases/${item.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-semibold text-[#1A2B3C]">
                            {Array.isArray(item.customers) ? item.customers[0]?.name : item.customers?.name}
                          </div>
                          <span className="text-xs text-gray-400 font-mono">#{item.id.substring(0,6)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={item.status as any} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.generation_mode === '100p' ? (
                           <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span>프리미엄 100p</span>
                        ) : (
                           <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>기본 30p</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        v{item.pdf_version || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {new Date(item.updated_at).toLocaleString('ko-KR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-gray-400 hover:text-[#E67E22] transition-colors p-2 rounded hover:bg-[#E67E22]/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cases/${item.id}`);
                          }}
                        >
                          <MoreVertical className="w-5 h-5 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          {!loading && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 bg-gray-50">
              <span>Showing {data.length} records</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E67E22] text-white font-medium">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
