import * as React from 'react';
import { calculateFourPillars } from 'manseryeok';
import { NormalizationResultPanel } from '@/components/NormalizationResultPanel';
import { HapChungPanel } from '@/components/saju/HapChungPanel';
import { SinsalPanel } from '@/components/saju/SinsalPanel';
import { TwelveUnseongPanel } from '@/components/saju/TwelveUnseongPanel';
import { AnalysisCategoryGrid, AnalysisCategory } from '@/components/saju/AnalysisCategoryGrid';
import { AIAnalysisResult } from '@/components/saju/AIAnalysisResult';
import { DeepAnalysisCards, DeepAnalysisCategory } from '@/components/saju/DeepAnalysisCards';
import { DeepAnalysisResult } from '@/components/saju/DeepAnalysisResult';
import { IljinCalendar } from '@/components/saju/IljinCalendar';
import { TimePeriodInputModal } from '@/components/saju/TimePeriodInputModal';
import { AnalysisActionBar } from '@/components/saju/AnalysisActionBar';
import { generateCategoryAnalysis } from '@/services/aiGenerationService';
import { getPromptForCategory } from '@/services/promptTemplates';
import { getPromptForDeepAnalysis } from '@/services/promptTemplates/deepAnalysis';
import { generateMonthlyIljin, IljinDay } from '@/services/iljinCalendarService';
import { toast } from '@/hooks/use-toast';

export function CaseLogicTab({ customer }: { customer: any }) {
  const [sajuResult, setSajuResult] = React.useState<any>(null);

  // Phase 4 states
  const [selectedCat, setSelectedCat] = React.useState<AnalysisCategory | null>(null);
  const [catContent, setCatContent] = React.useState<string>('');
  const [isCatLoading, setIsCatLoading] = React.useState<boolean>(false);

  // Phase 5 states
  const [selectedDeepCat, setSelectedDeepCat] = React.useState<DeepAnalysisCategory | null>(null);
  const [deepContent, setDeepContent] = React.useState<string>('');
  const [isDeepLoading, setIsDeepLoading] = React.useState<boolean>(false);
  const [showPeriodModal, setShowPeriodModal] = React.useState<boolean>(false);

  // Iljin Calendar states
  const [calendarYear, setCalendarYear] = React.useState<number>(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = React.useState<number>(new Date().getMonth() + 1);
  const [iljinDays, setIljinDays] = React.useState<IljinDay[]>([]);
  const [isCalendarLoading, setIsCalendarLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!customer || !customer.birth_date) return;
    try {
      const [year, month, day] = customer.birth_date.split('-').map(Number);
      const isLunar = customer.calendar_type !== 'solar';
      const isLeapMonth = customer.calendar_type === 'lunar_leap';
      
      let hour = 12, minute = 0; // fallback
      if (customer.birth_time) {
         const parts = customer.birth_time.split(':').map(Number);
         hour = parts[0]; minute = parts[1];
      }

      const result = calculateFourPillars({ year, month, day, hour, minute, isLunar, isLeapMonth });
      setSajuResult({
        hanja: result.toHanjaObject(),
        dayElement: result.dayElement,
        dayYinYang: result.dayYinYang,
        raw: result,
      });
    } catch(e) {
      console.error(e);
    }
  }, [customer]);

  const handleCategorySelect = async (cat: AnalysisCategory) => {
    if (!sajuResult) return;
    setSelectedCat(cat);
    setCatContent('');
    setIsCatLoading(true);

    try {
      const prompt = getPromptForCategory(cat, sajuResult);
      await generateCategoryAnalysis(prompt, 'gemini-2.5-flash', (text) => setCatContent(text));
    } catch(e: any) {
      toast({ title: '분석 실패', description: e.message, variant: 'destructive' });
    } finally {
      setIsCatLoading(false);
    }
  };

  const executeDeepAnalysis = async (cat: DeepAnalysisCategory, extraContext?: string) => {
    if (!sajuResult) return;
    setSelectedDeepCat(cat);
    setDeepContent('');
    setShowPeriodModal(false);
    setIsDeepLoading(true);

    try {
      const prompt = getPromptForDeepAnalysis(cat, sajuResult, extraContext);
      await generateCategoryAnalysis(prompt, 'gemini-2.5-pro', (text) => setDeepContent(text));
    } catch(e: any) {
      toast({ title: '심화 분석 실패', description: e.message, variant: 'destructive' });
    } finally {
      setIsDeepLoading(false);
    }
  };

  const handleDeepCategorySelect = (cat: DeepAnalysisCategory) => {
    if (cat === 'specific_period') {
      setSelectedDeepCat('specific_period');
      setShowPeriodModal(true);
    } else {
      executeDeepAnalysis(cat);
    }
  };

  const loadIljinCalendar = React.useCallback(async (y: number, m: number) => {
    if (!sajuResult) return;
    setIsCalendarLoading(true);
    try {
       const days = await generateMonthlyIljin(sajuResult.hanja.day.korean[0], sajuResult.dayElement, sajuResult.dayYinYang, y, m);
       setIljinDays(days);
    } catch(e) {}
    setIsCalendarLoading(false);
  }, [sajuResult]);

  React.useEffect(() => {
    if (sajuResult) {
      loadIljinCalendar(calendarYear, calendarMonth);
    }
  }, [sajuResult, calendarYear, calendarMonth, loadIljinCalendar]);

  const navMonth = (offset: number) => {
    let m = calendarMonth + offset;
    let y = calendarYear;
    if (m > 12) { m = 1; y++; }
    if (m < 1) { m = 12; y--; }
    setCalendarYear(y); setCalendarMonth(m);
  };

  if (!sajuResult) {
    return <div className="p-8 text-center text-muted-foreground">명식 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 2. 사주 원국 리뉴얼 (NormalizationResultPanel) */}
      <section>
        <h2 className="text-xl font-bold mb-4">운명 지도 (四柱八字)</h2>
        <NormalizationResultPanel result={sajuResult} onClear={() => {}} />
      </section>

      {/* 3. 합충신살 12운성 */}
      <section>
        <h2 className="text-xl font-bold mb-4">상호작용 및 특수 기운</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <HapChungPanel hanjaObj={sajuResult.hanja} />
           <SinsalPanel hanjaObj={sajuResult.hanja} />
           <TwelveUnseongPanel hanjaObj={sajuResult.hanja} />
        </div>
      </section>

      {/* 4. 8대 카테고리 분석 */}
      <section>
        <h2 className="text-xl font-bold mb-4">AI 8대 카테고리 운세</h2>
        <div className="flex flex-col xl:flex-row gap-6">
           <div className="flex-1">
             <AnalysisCategoryGrid selectedCategory={selectedCat} onSelect={handleCategorySelect} />
           </div>
           <div className="flex-[2] flex flex-col">
             <AIAnalysisResult content={catContent} isLoading={isCatLoading} />
             {catContent && <AnalysisActionBar content={catContent} title={selectedCat || '분석'} />}
           </div>
        </div>
      </section>

      {/* 5. 7가지 딥다이브 */}
      <section>
        <h2 className="text-xl font-bold mb-4">AI 심층 딥다이브 리포트</h2>
        <div className="space-y-6">
           <DeepAnalysisCards selectedCategory={selectedDeepCat} onSelect={handleDeepCategorySelect} />
           
           {showPeriodModal && (
             <TimePeriodInputModal 
               onSubmit={(p, t) => executeDeepAnalysis('specific_period', `시기: ${p}, 주제: ${t}`)}
               onCancel={() => setShowPeriodModal(false)}
             />
           )}
           
           <div className="flex flex-col">
              <DeepAnalysisResult categoryTitle="심층 분석" content={deepContent} isLoading={isDeepLoading} />
              {deepContent && <AnalysisActionBar content={deepContent} title="딥다이브" />}
           </div>
           
           {/* 일진 달력 */}
           <div className="mt-8 pt-6 border-t border-border">
             <IljinCalendar 
               year={calendarYear} 
               month={calendarMonth} 
               days={iljinDays}
               onPrevMonth={() => navMonth(-1)}
               onNextMonth={() => navMonth(1)}
               isLoading={isCalendarLoading}
             />
           </div>
        </div>
      </section>
    </div>
  );
}
