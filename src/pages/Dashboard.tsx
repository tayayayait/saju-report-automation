import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '@/hooks/useDashboardData';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Plus, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function Dashboard() {
  const { kpi, recentCases, loading } = useDashboardData();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-[1520px] mx-auto w-full flex flex-col gap-8 bg-[#F8F9FA] min-h-full font-display">
      <header className="flex items-center justify-between whitespace-nowrap mb-2">
        <h1 className="text-h2 font-bold leading-tight tracking-tight text-[#1A2B3C]">대시보드</h1>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <button 
            onClick={() => navigate('/customers/new')}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-5 bg-[#E67E22] text-white text-sm font-bold leading-normal tracking-wide hover:bg-[#E67E22]/90 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            <span>케이스 생성</span>
          </button>
        </div>
      </header>

      {/* KPI Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">오늘 생성</p>
          <p className="text-[#1A2B3C] text-4xl font-bold leading-tight">
            {loading ? <span className="animate-pulse bg-gray-200 text-transparent rounded">--</span> : kpi.todayCreated}
          </p>
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>처리 중</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">검토 필요</p>
          <p className="text-[#1A2B3C] text-4xl font-bold leading-tight">
            {loading ? <span className="animate-pulse bg-gray-200 text-transparent rounded">--</span> : kpi.reviewNeeded}
          </p>
          <div className="flex items-center gap-1 text-[#E67E22] text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>조치 필요</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">실패</p>
          <p className="text-[#1A2B3C] text-4xl font-bold leading-tight">
            {loading ? <span className="animate-pulse bg-gray-200 text-transparent rounded">--</span> : kpi.failed}
          </p>
          <div className="flex items-center gap-1 text-rose-600 text-sm font-medium">
            <TrendingDown className="w-4 h-4" />
            <span>확인 필요</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">발행 완료</p>
          <p className="text-[#1A2B3C] text-4xl font-bold leading-tight">
            {loading ? <span className="animate-pulse bg-gray-200 text-transparent rounded">--</span> : kpi.published}
          </p>
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            <span>정상 발행</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases Table */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold leading-tight text-[#1A2B3C]">최근 케이스</h2>
            <button onClick={() => navigate('/history')} className="text-[#E67E22] text-sm font-medium hover:underline">전체 보기</button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-gray-200">
                  <th className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">케이스 ID</th>
                  <th className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">고객명</th>
                  <th className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">상태</th>
                  <th className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">날짜</th>
                  <th className="px-6 py-4 text-gray-500 text-xs font-semibold uppercase tracking-wider text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                   [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="px-6 py-4">
                        <div className="h-6 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : recentCases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                      아직 등록된 케이스가 없습니다.
                    </td>
                  </tr>
                ) : (
                  recentCases.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => navigate(`/cases/${c.id}`)}>
                      <td className="px-6 py-4 text-sm font-medium text-[#1A2B3C] font-mono">#{c.id.substring(0,8)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">{c.customer_name}</td>
                      <td className="px-6 py-4">
                        {c.status === 'completed' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">발행 완료</span>}
                        {c.status === 'review_needed' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">검토 필요</span>}
                        {c.status === 'failed' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">실패</span>}
                        {c.status === 'draft' && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">초안</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                        {new Date(c.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 group-hover:text-[#E67E22] transition-colors">
                          <MoreVertical className="w-5 h-5 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold leading-tight px-2 text-[#1A2B3C]">시스템 상태 로그</h2>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 flex flex-col gap-4 flex-1">
            
            {loading ? (
             <div className="animate-pulse space-y-4">
                <div className="h-16 bg-gray-100 rounded-lg"></div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
             </div> 
            ) : recentCases.filter(c => c.status === 'failed').length > 0 ? (
              recentCases.filter(c => c.status === 'failed').slice(0, 3).map(c => (
                <div key={c.id} className="flex gap-4 p-3 rounded-lg bg-rose-50 border border-rose-100">
                  <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#1A2B3C]">리포트 생성 실패</p>
                    <p className="text-xs text-gray-600 mt-1">{c.customer_name}님의 AI 리포트 생성에 실패했습니다.</p>
                    <p className="text-xs text-gray-500 mt-2 font-mono">
                       {formatDistanceToNow(new Date(c.updated_at), { addSuffix: true, locale: ko })}
                    </p>
                  </div>
                </div>
              ))
            ) : null}

            <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#1A2B3C]">시스템 정상</p>
                <p className="text-xs text-gray-600 mt-1">버전 2.4.1 배포 완료. 모든 AI 모듈 정상 동작 중.</p>
                <p className="text-xs text-gray-500 mt-2 font-mono">오늘, 09:00</p>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
              <button className="w-full py-2 text-sm font-medium text-gray-500 hover:text-[#1A2B3C] transition-colors">전체 로그 보기</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
