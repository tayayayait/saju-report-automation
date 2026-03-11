import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { StatusBadge } from '@/components/StatusBadge';
import { ArrowLeft, User, Printer, Save, Bell, Settings } from 'lucide-react';
import { AIGenerationTab } from '@/components/case/AIGenerationTab';
import { EditorTab } from '@/components/case/EditorTab';
import { PDFPublishTab } from '@/components/case/PDFPublishTab';
import { CaseLogicTab } from '@/components/case/CaseLogicTab';

interface CaseData {
  id: string;
  status: string;
  generation_mode: string | null;
  prompt_version: string | null;
  model: string | null;
  pdf_version: number | null;
  created_at: string;
  updated_at: string;
  draft_content: string | null;
  final_content: string | null;
  customer: {
    name: string;
    gender: string;
    birth_date: string;
    birth_time: string | null;
    birth_place: string | null;
    calendar_type: string;
  };
}

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCase();
  }, [id]);

  const fetchCase = async () => {
    const { data } = await supabase
      .from('cases')
      .select(`
        id, status, generation_mode, prompt_version, model, pdf_version, created_at, updated_at, draft_content, final_content,
        customers!inner(name, gender, birth_date, birth_time, birth_place, calendar_type)
      `)
      .eq('id', id!)
      .single();

    if (data) {
      const customer = Array.isArray(data.customers) ? data.customers[0] : data.customers;
      setCaseData({
        ...data,
        customer: customer as CaseData['customer'],
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-[#1A2B3C]/10 rounded-full"></div>
          <p className="text-[#1A2B3C] font-semibold">워크스페이스 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-20 bg-[#F8F9FA] h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-500 mb-4">케이스를 찾을 수 없습니다.</p>
        <button className="px-5 py-2.5 bg-[#1A2B3C] text-white rounded-lg" onClick={() => navigate('/')}>대시보드로 이동</button>
      </div>
    );
  }

  return (
    <div className="font-display bg-[#F8F9FA] text-[#1A2B3C] overflow-hidden h-screen w-full flex flex-col">
      {/* Context Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0 z-10 w-full shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold leading-tight truncate max-w-[300px] md:max-w-none">
              {caseData.customer.name} - Case #{caseData.id.split('-')[0]}
            </h1>
            <p className="text-gray-500 text-xs font-medium">케이스 상세 워크스페이스</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <StatusBadge status={caseData.status as any} />
          <button className="flex cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-[#E67E22] hover:bg-[#D35400] text-white text-sm font-bold shadow-sm transition-colors">
            <span className="truncate">초안 저장</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative w-full">
        
        {/* Column 1: Left (300px) - 정보 및 데이터 */}
        <aside className="w-full lg:w-[320px] xl:w-[380px] lg:border-r border-gray-200 flex flex-col overflow-y-auto bg-[#F8F9FA] p-4 gap-4 flex-shrink-0">
          
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-[#1A2B3C] h-20 p-4 flex flex-col justify-end relative">
              <h3 className="text-white text-base font-bold relative z-10">고객 정보</h3>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Name / Gender</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">
                    <User className="w-3 h-3" />
                  </div>
                  <p className="text-sm font-semibold">{caseData.customer.name} ({caseData.customer.gender === 'male' ? '남성' : '여성'})</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">출생 정보</p>
                <p className="text-sm font-medium font-mono">
                  {caseData.customer.birth_date} {caseData.customer.birth_time || ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {caseData.customer.calendar_type === 'solar' ? '양력' : '음력'} 
                  {caseData.customer.birth_place ? ` · ${caseData.customer.birth_place}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Logic Box (CaseLogicTab) */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col gap-2 flex-shrink-0 min-h-[400px]">
             <h3 className="text-sm font-bold text-[#1A2B3C] border-b border-gray-100 mb-2 pb-2">분석 로직 및 사주 속성</h3>
             <CaseLogicTab customer={caseData.customer} />
          </div>

        </aside>

        {/* Column 2: Center (Flex) - Editor Area */}
        <section className="flex-1 flex flex-col bg-white lg:border-r border-gray-200 min-w-[500px] overflow-hidden justify-start">
          
          {/* AI Generator Panel (Top of center) */}
          <div className="border-b border-gray-200 bg-gray-50 p-4 flex-shrink-0 min-h-[150px] overflow-y-auto">
             <AIGenerationTab 
                caseId={id!} 
                initialMode={caseData.generation_mode || '30p'} 
                initialModel={caseData.model || 'gpt-4o'} 
                customerData={caseData.customer}
                draftContent={caseData.draft_content}
                onUpdate={fetchCase}
              />
          </div>

          {/* Text Editor Canvas (Fill remaining) */}
          <div className="flex-1 overflow-hidden relative">
             <EditorTab caseId={id!} caseData={caseData as any} onUpdate={fetchCase} />
          </div>

        </section>

        {/* Column 3: Right (300px) - 미리보기 및 발행 */}
        <aside className="w-full lg:w-[320px] xl:w-[380px] flex flex-col bg-[#F8F9FA] overflow-y-auto flex-shrink-0">
          
          {/* PDF Publisher */}
          <div className="p-4 border-b border-gray-200 flex flex-col gap-4 min-h-[400px]">
            <h3 className="text-sm font-bold text-[#1A2B3C] flex items-center justify-between">
              <span>PDF Publish Panel</span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">v{caseData.pdf_version || 0}</span>
            </h3>
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-2">
               <PDFPublishTab caseId={id!} caseData={caseData as any} onUpdate={fetchCase} />
            </div>
          </div>

          {/* System Metadata / Timeline */}
          <div className="p-4 flex flex-col gap-4">
             <h3 className="text-sm font-bold text-[#1A2B3C]">타임라인 메타데이터</h3>
             <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
               <ul className="text-xs text-gray-500 space-y-3 font-mono">
                 <li className="flex justify-between">
                   <span>Created at:</span>
                   <span>{new Date(caseData.created_at).toLocaleString()}</span>
                 </li>
                 <li className="flex justify-between">
                   <span>Last updated:</span>
                   <span>{new Date(caseData.updated_at).toLocaleString()}</span>
                 </li>
                 <li className="flex justify-between">
                   <span>Model used:</span>
                   <span>{caseData.model || '-'}</span>
                 </li>
               </ul>
             </div>
          </div>

        </aside>

      </main>
    </div>
  );
}
