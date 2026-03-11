import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DeepAnalysisResultProps {
  categoryTitle: string;
  content: string;
  isLoading: boolean;
  className?: string;
}

export function DeepAnalysisResult({ categoryTitle, content, isLoading, className }: DeepAnalysisResultProps) {
  const charCount = content.replace(/\s/g, '').length;

  if (!content && !isLoading) return null;

  return (
    <Card className={cn("p-6 sm:p-8 bg-slate-50 border-primary/20 rounded-xl shadow-saju-lg relative overflow-hidden", className)}>
      {/* 장식 효과 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60 relative z-10">
        <h3 className="text-heading-sm font-bold text-foreground flex items-center gap-2 font-display">
          <Sparkles className="w-5 h-5 text-primary" />
          [{categoryTitle}] 딥다이브 리포트
        </h3>
        {content && !isLoading && (
          <span className="text-[11px] font-medium text-muted-foreground bg-white border border-border px-2.5 py-1 rounded-full shadow-sm">
            공백 제외 {charCount.toLocaleString()}자
          </span>
        )}
      </div>

      <div className="relative z-10">
        {isLoading && !content ? (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary/80" />
            <p className="text-body-sm font-medium animate-pulse">
              해당 주제에 대해 AI가 사주 명식을 깊이 분석 중입니다...
            </p>
          </div>
        ) : (
          <div className="prose prose-sm sm:prose-base prose-slate max-w-none prose-h3:text-primary prose-h3:font-display prose-h3:border-b prose-h3:pb-2 prose-strong:text-foreground prose-ul:my-2 prose-li:my-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
            {isLoading && (
              <span className="inline-block w-2.5 h-4 ml-1 bg-primary/60 animate-pulse align-middle" />
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
