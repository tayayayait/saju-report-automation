import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { AlertCircle, CheckCircle2, RefreshCcw } from "lucide-react"
import { SajuHeroSection } from "./saju/SajuHeroSection"
import { SajuWongukCard } from "./saju/SajuWongukCard"
import { OhengDistributionChart } from "./saju/OhengDistributionChart"

interface NormalizationResultPanelProps {
  result: any;
  onClear: () => void;
  className?: string;
}

export function NormalizationResultPanel({ result, onClear, className }: NormalizationResultPanelProps) {
  if (!result) return null;

  const formatDaeun = (daeun: unknown): string => {
    if (daeun == null) return "-";
    if (typeof daeun === "string" || typeof daeun === "number") return String(daeun);
    if (typeof daeun !== "object") return "-";

    const value = daeun as {
      current?: { age_range?: unknown; ganzhi?: unknown };
      startAge?: unknown;
      startAgePrecise?: unknown;
    };

    const currentAgeRange = typeof value.current?.age_range === "string" ? value.current.age_range : "";
    const currentGanzhi = typeof value.current?.ganzhi === "string" ? value.current.ganzhi : "";

    if (currentAgeRange || currentGanzhi) {
      return [currentAgeRange, currentGanzhi].filter(Boolean).join(" ");
    }

    if (typeof value.startAge === "number") {
      return `${value.startAge}세 시작`;
    }

    if (typeof value.startAgePrecise === "number") {
      return `${Math.floor(value.startAgePrecise)}세 시작`;
    }

    return "-";
  };

  const daeunLabel = formatDaeun(result.daeun);

  if (result.error) {
    return (
      <Card className={`mb-6 rounded-radius-md shadow-saju-sm border-destructive/20 bg-destructive-soft ${className || ''}`}>
        <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
          <AlertCircle className="w-8 h-8 text-destructive opacity-80" />
          <span className="text-body-md font-semibold text-destructive">사주 명식 추출 실패</span>
          <p className="text-caption text-destructive/80 text-center max-w-sm">{result.error}</p>
          <button onClick={onClear} className="mt-2 text-caption font-medium text-destructive underline underline-offset-2">다시 시도하기</button>
        </CardContent>
      </Card>
    );
  }

  // Parse ssaju output
  const pillars = [
    { label: '시주(時)', gan: result.sigan, ji: result.siji },
    { label: '일주(日)', gan: result.ilgan, ji: result.ilji },
    { label: '월주(月)', gan: result.wolgan, ji: result.wolji },
    { label: '년주(年)', gan: result.nyeongan, ji: result.nyeonji },
  ];

  return (
    <Card className={`mb-6 rounded-radius-md shadow-saju-sm border-border overflow-hidden ${className || ''}`}>
      <CardHeader className="pb-4 border-b border-border/50 bg-slate-50 relative flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-heading-md flex items-center gap-2">
            추출된 사주 명식
            {result.warning && (
              <span className="inline-flex items-center gap-1 text-[11px] text-warning bg-warning/10 px-2 py-0.5 rounded-full font-normal">
                <AlertCircle className="w-3 h-3" /> 주의
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] text-success bg-success/10 px-2 py-0.5 rounded-full font-normal">
              <CheckCircle2 className="w-3 h-3" /> 추출 성공
            </span>
          </CardTitle>
          <CardDescription className="mt-1">
            입력된 생년월일시 데이터를 바탕으로 도출된 四柱八字(사주팔자)입니다. 이 데이터는 리포트 생성 시 AI의 프롬프트로 주입됩니다.
          </CardDescription>
        </div>
        <button 
          onClick={onClear}
          className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-slate-200 transition-colors"
          title="재초기화"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </CardHeader>
      
      <CardContent className="p-6">
        {result.warning && (
          <div className="mb-6 p-3 rounded bg-warning/10 border border-warning/20 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
            <p className="text-body-sm text-warning/90 leading-tight">
              {result.warning}
            </p>
          </div>
        )}
      
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Column: Hero & Chart */}
          <div className="flex-1 flex flex-col sm:flex-row xl:flex-col gap-6 w-full xl:max-w-sm shrink-0">
            <SajuHeroSection hanjaObj={result?.hanja || {}} className="flex-1" />
            
            {/* Metadata */}
            <div className="bg-white border border-border rounded-xl divide-y divide-border/50 text-body-sm shadow-saju-sm overflow-hidden flex-1 xl:flex-none">
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-muted-foreground font-medium">대운수</span>
                <span className="font-semibold text-foreground">{daeunLabel}</span>
              </div>
              <div className="flex items-center justify-between p-4 px-5">
                <span className="text-muted-foreground font-medium">일진(오늘)</span>
                <span className="font-medium text-foreground">{result?.today || '-'}</span>
              </div>
              <div className="flex flex-col gap-1.5 p-4 px-5 bg-slate-50/50">
                <span className="text-caption text-muted-foreground font-medium">입력값 검증</span>
                <div className="font-mono text-[11px] text-text-tertiary line-clamp-2 mt-0.5 break-all">
                  {JSON.stringify(result?.input || {}).replace(/[{}]/g, '').replace(/"/g, '')}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: 4 Pillars & Oheng Distribution */}
          <div className="flex-[2] flex flex-col gap-6 overflow-hidden">
            <SajuWongukCard hanjaObj={result?.hanja || {}} />
            <OhengDistributionChart hanjaObj={result?.hanja || {}} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
