import React, { useState } from 'react';
import { StepWizard } from '@/components/public/StepWizard';
import { SajuFormData } from '@/components/public/types';
import { calculateFourPillars } from 'manseryeok';
import { SajuHeroSection } from '@/components/saju/SajuHeroSection';
import { SajuWongukCard } from '@/components/saju/SajuWongukCard';
import { OhengDistributionChart } from '@/components/saju/OhengDistributionChart';
import { PublicAnalysisViewer } from '@/components/public/PublicAnalysisViewer';
import { InputSummaryBar } from '@/components/public/InputSummaryBar';
import { DaeunTimeline } from '@/components/saju/DaeunTimeline';
import { getAllSipsung } from '@/lib/sipsung';
import { calculateDaeun } from '@/lib/daeun';
import { estimateYongsin } from '@/lib/yongsin';
import { Sparkles } from 'lucide-react';

export default function PublicSaju() {
  const [formData, setFormData] = useState<SajuFormData | null>(null);
  const [sajuResult, setSajuResult] = useState<any>(null);

  const handleComplete = (data: SajuFormData) => {
    setFormData(data);
    
    try {
      if (data.birth_year && data.birth_month && data.birth_day) {
        let h = 0, m = 0;
        if (data.birth_time) {
          const params = data.birth_time.split(':');
          h = parseInt(params[0], 10) || 0;
          m = parseInt(params[1], 10) || 0;
        }

        const result = calculateFourPillars({
          year: data.birth_year,
          month: data.birth_month,
          day: data.birth_day,
          hour: h,
          minute: m,
          is음력: data.calendar_type === 'lunar' || data.calendar_type === 'lunar_leap',
          isLeapMonth: data.calendar_type === 'lunar_leap',
        });

        const hanjaObj = result.toHanjaObject();
        const sipsung = getAllSipsung(hanjaObj);
        const yongsin = estimateYongsin(hanjaObj);
        const daeunList = calculateDaeun(hanjaObj, data.gender || '남성', data.birth_year);

        setSajuResult({
          fourPillars: result,
          hanja: hanjaObj,
          dayElement: result.dayElement,
          dayYinYang: result.dayYinYang,
          sipsung,
          yongsin,
          daeunList,
          daeun: daeunList.length > 0 ? daeunList[0].startAge : '확인불가',
          ...data
        });
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8f7f6] text-slate-900 font-['Inter',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        
        {/* ──── Sticky Header (from Stitch) ──── */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap px-6 md:px-10 py-4 bg-[#f8f7f6]/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-[#1A2B3C] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#e77e23]" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">사주 AI 연구소</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <a className="text-sm font-medium leading-normal hover:text-[#e77e23] transition-colors" href="#">이용 방법</a>
              <a className="text-sm font-medium leading-normal hover:text-[#e77e23] transition-colors" href="#">요금 안내</a>
              <a className="text-sm font-medium leading-normal hover:text-[#e77e23] transition-colors" href="#">소개</a>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e77e23] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e77e23]/90 transition-colors">
              <span className="truncate">분석 시작하기</span>
            </button>
          </div>
        </header>

        {/* ──── Main Content ──── */}
        <main className="flex-1 px-4 py-12 md:px-10 lg:px-40 flex flex-col items-center">
          <div className="max-w-[960px] w-full flex flex-col gap-12">
            
            {!sajuResult ? (
              <>
                {/* Hero Section (from Stitch) */}
                <div className="text-center flex flex-col gap-4 animate-in fade-in duration-500">
                  <h1 className="text-[#1A2B3C] text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                    당신의 진짜 운명,<br/>AI 명리학으로 해독하다.
                  </h1>
                  <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
                    데이터 기반의 정교한 AI 사주 분석으로 당신의 삶을 새롭게 설계하세요. 전통 명리학과 최신 AI 기술의 완벽한 결합.
                  </p>
                </div>

                {/* Wizard Card (Stitch Bento Grid style) */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-6 md:p-10">
                    <StepWizard onComplete={handleComplete} />
                  </div>
                </div>
              </>
            ) : (
              /* ──── Analysis Results ──── */
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700 mx-auto max-w-[1080px] w-full">

                {/* 상단 요약 바 */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-3 sticky top-[72px] z-40">
                  <InputSummaryBar sajuResult={sajuResult} onReset={() => setSajuResult(null)} />
                </div>
                
                {/* 메인 Hero (일간/용신/강약) */}
                <SajuHeroSection hanjaObj={sajuResult.hanja} yongsinInfo={sajuResult.yongsin} />
                
                {/* 사주 원국 + 오행 분포 (Bento Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="col-span-1 lg:col-span-7">
                    <SajuWongukCard hanjaObj={sajuResult.hanja} sipsungObj={sajuResult.sipsung} className="h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-100 rounded-2xl overflow-hidden" />
                  </div>
                  <div className="col-span-1 lg:col-span-5">
                    <OhengDistributionChart hanjaObj={sajuResult.hanja} yongsinInfo={sajuResult.yongsin} className="h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-2xl overflow-hidden p-6" />
                  </div>
                </div>

                {/* 대운 타임라인 */}
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                  <DaeunTimeline daeunList={sajuResult.daeunList} />
                </div>

                {/* AI 분석 섹션 */}
                <div className="pt-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#e77e23]/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#e77e23]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#1A2B3C] tracking-tight">AI 사주 분석 리포트</h2>
                  </div>
                  <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-10">
                    <PublicAnalysisViewer sajuResult={sajuResult} />
                  </div>
                </div>

                <div className="text-center pt-12 pb-6">
                  <p className="text-slate-500 font-medium mb-4">내 사주가 마음에 드셨나요?</p>
                  <button 
                    onClick={() => setSajuResult(null)}
                    className="bg-[#1A2B3C] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#1A2B3C]/90 transition-all hover:-translate-y-0.5"
                  >
                    지인 사주 더 알아보기
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
