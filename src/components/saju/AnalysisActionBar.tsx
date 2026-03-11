import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AnalysisActionBarProps {
  content: string;
  title: string;
}

export function AnalysisActionBar({ content, title }: AnalysisActionBarProps) {
  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    toast({
      title: "복사 완료",
      description: "리포트가 클립보드에 복사되었습니다.",
    });
  };

  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `사주리포트_${title.replace(/\s/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: "다운로드 시작",
      description: "마크다운 파일로 저장됩니다.",
    });
  };

  return (
    <div className="flex items-center gap-2 mt-4 justify-end">
      <Button variant="outline" size="sm" onClick={handleCopy} disabled={!content} className="gap-1.5 border-border text-foreground">
        <Copy className="w-4 h-4" />
        <span>복사</span>
      </Button>
      <Button variant="outline" size="sm" onClick={handleDownload} disabled={!content} className="gap-1.5 border-border text-foreground">
        <Download className="w-4 h-4" />
        <span>MD 저장</span>
      </Button>
    </div>
  );
}
