import { useNavigate } from 'react-router-dom';
import { useCustomerList } from '@/hooks/useCustomerList';
import { Plus, Search, Filter, Edit2, User } from 'lucide-react';

export default function Customers() {
  const { customers, filteredCustomers, search, setSearch, loading } = useCustomerList();
  const navigate = useNavigate();

  // Helper to get initials
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  // Helper to generate consistent avatar background based on ID/Name
  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-indigo-100 text-indigo-700',
      'bg-emerald-100 text-emerald-700',
      'bg-amber-100 text-amber-700',
      'bg-rose-100 text-rose-700',
      'bg-cyan-100 text-cyan-700',
      'bg-purple-100 text-purple-700',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-[1520px] w-full mx-auto p-4 md:p-8 flex-1 flex flex-col font-display bg-[#F8F9FA] min-h-full">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-[#1A2B3C] tracking-tight">고객 관리</h2>
          <p className="text-gray-500 mt-1 text-sm">Manage and view your report automation clients.</p>
        </div>
        <button 
          onClick={() => navigate('/customers/new')}
          className="flex items-center gap-2 bg-[#E67E22] hover:bg-[#D35400] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          신규 고객 등록
        </button>
      </header>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 min-h-[500px] overflow-hidden">
        {/* Search & Filters */}
        <div className="p-5 border-b border-gray-200 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-[#F8F9FA] text-[#1A2B3C] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#E67E22] focus:border-[#E67E22] sm:text-sm transition-colors" 
              placeholder="Search customers by name, location..." 
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-[#1A2B3C] hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-[#F1F5F9]">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/4">Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/12">Gender</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/6">생년월일</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/6">출생지</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-[#1A2B3C] uppercase tracking-wider w-1/6">등록일</th>
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
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">{search ? '검색 결과가 없습니다.' : '등록된 고객이 없습니다.'}</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c, index) => (
                  <tr 
                    key={c.id} 
                    className="hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/customers/${c.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${getAvatarColor(index)}`}>
                          {getInitials(c.name)}
                        </div>
                        <div className="text-sm font-semibold text-[#1A2B3C]">{c.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {c.gender === 'male' ? 'Male' : c.gender === 'female' ? 'Female' : c.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {c.birth_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[150px]">
                      {c.birth_place || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/customers/${c.id}`);
                        }}
                        className="text-[#E67E22] hover:text-[#D35400] opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded hover:bg-[#E67E22]/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        {!loading && customers.length > 0 && (
          <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 bg-gray-50">
            <span>Showing {filteredCustomers.length} of {customers.length} customers</span>
          </div>
        )}
      </div>
    </div>
  );
}
