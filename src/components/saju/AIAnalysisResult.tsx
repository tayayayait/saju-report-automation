import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2, Fingerprint } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AIAnalysisResultProps {
  content: string;
  isLoading: boolean;
  className?: string;
}

export function AIAnalysisResult({ content, isLoading, className }: AIAnalysisResultProps) {
  const charCount = content.replace(/\s/g, '').length;

  return (
    <Card className={cn("p-6 sm:p-8 bg-white border-border rounded-xl shadow-saju-md min-h-[400px] flex flex-col", className)}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
        <h3 className="text-heading-sm font-bold text-slate-800 flex items-center gap-2 font-display">
          <Fingerprint className="w-5 h-5 text-indigo-500" />
          AI 심층 분석 리포트
        </h3>
        {content && !isLoading && (
          <span className="text-[11px] font-medium text-muted-foreground bg-slate-100 px-2.5 py-1 rounded-full">
            공백 제외 {charCount.toLocaleString()}자
          </span>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading && !content ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4 py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500/80" />
            <p className="text-body-sm font-medium animate-pulse">
              명리학 AI 엔진이 사주 구성을 분석하고 있습니다...
            </p>
          </div>
        ) : (
          <div className="prose prose-sm sm:prose-base prose-slate max-w-none prose-h3:text-indigo-800 prose-h3:font-display prose-h3:border-b prose-h3:pb-2 prose-strong:text-indigo-900 prose-ul:my-2 prose-li:my-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || '*선택된 카테고리의 분석 결과가 여기에 표시됩니다.*'}
            </ReactMarkdown>
            {isLoading && (
              <span className="inline-block w-2.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle" />
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
