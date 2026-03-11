import React, { useState } from 'react';
import { AnalysisCategoryGrid, AnalysisCategory } from '@/components/saju/AnalysisCategoryGrid';
import { generateCategoryAnalysis } from '@/services/aiGenerationService';
import { getPromptForCategory } from '@/services/promptTemplates';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface PublicAnalysisViewerProps {
  sajuResult: any;
}

export function PublicAnalysisViewer({ sajuResult }: PublicAnalysisViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<AnalysisCategory | null>(null);
  const [analysisText, setAnalysisText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectCategory = async (category: AnalysisCategory) => {
    setSelectedCategory(category);
    setAnalysisText('');
    setLoading(true);

    try {
      const promptText = getPromptForCategory(category, sajuResult);
      
      // 스트리밍으로 텍스트 받아오기
      await generateCategoryAnalysis(
        promptText,
        'gemini-2.5-flash',
        (chunk) => {
          setAnalysisText(chunk);
        }
      );
    } catch (err: any) {
      console.error(err);
      toast({
        title: "분석 실패",
        description: err.message || "분석 리포트를 생성하는 중 오류가 발생했습니다.",
        variant: "destructive"
      });
      setAnalysisText('오류가 발생하여 리포트를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!analysisText) return;
    try {
      await navigator.clipboard.writeText(analysisText);
      setCopied(true);
      toast({ title: "복사 완료", description: "클립보드에 복사되었습니다." });
      setTimeout(() => setCopied(false), 2000);
    } catch(err) {
      toast({ title: "복사 실패", description: "클립보드 복사에 실패했습니다.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <AnalysisCategoryGrid 
        selectedCategory={selectedCategory} 
        onSelect={handleSelectCategory} 
      />

      {(analysisText || loading) && (
        <div className="bg-card rounded-radius-md shadow-saju-sm border border-border p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/50">
            <h3 className="text-body-lg font-bold text-foreground font-display flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
              AI 맞춤형 분석 리포트
            </h3>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy}
              disabled={!analysisText || loading}
              className="gap-2 h-9 rounded-full"
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사됨' : '결과 복사'}</span>
            </Button>
          </div>

          <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-body-md text-foreground prose-p:leading-relaxed prose-a:text-primary">
            {analysisText ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {analysisText}
              </ReactMarkdown>
            ) : null}
            
            {loading && (
              <div className="flex items-center gap-3 text-primary mt-6 mb-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-body-sm font-medium animate-pulse">
                  명리학 기반으로 운세를 깊이 있게 분석하고 있습니다...
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
