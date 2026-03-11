import { ChevronDown } from 'lucide-react';
import { type Editor } from '@tiptap/react';

interface TableOfContentsProps {
  editor: Editor | null;
}

export function TableOfContents({ editor }: TableOfContentsProps) {
  // In a real implementation, this would dynamically parse the editor's heading nodes.
  // For now, this is a placeholder UI that matches the specification.
  
  return (
    <div className="w-[280px] shrink-0 border-r border-border flex flex-col bg-surface-secondary/50">
      <div className="h-12 border-b border-border flex items-center px-4 font-semibold text-body-md text-foreground">
        문서 목차
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex items-center gap-2 text-primary font-medium text-body-sm bg-primary/10 px-2 py-1.5 rounded-sm cursor-pointer">
          <ChevronDown className="w-4 h-4" />
          1. 성격 및 기질
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-body-sm px-2 py-1.5 hover:bg-muted/50 rounded-sm cursor-pointer pl-6">
          1.1 일간 분석
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-body-sm px-2 py-1.5 hover:bg-muted/50 rounded-sm cursor-pointer pl-6">
          1.2 오행의 조화
        </div>
        
        <div className="flex items-center gap-2 text-text-secondary font-medium text-body-sm px-2 py-1.5 hover:bg-muted/50 rounded-sm cursor-pointer mt-2">
          <ChevronDown className="w-4 h-4 -rotate-90" />
          2. 직업 및 적성
        </div>
        <div className="flex items-center gap-2 text-text-secondary font-medium text-body-sm px-2 py-1.5 hover:bg-muted/50 rounded-sm cursor-pointer mt-2">
          <ChevronDown className="w-4 h-4 -rotate-90" />
          3. 대운 분석 (10년)
        </div>
      </div>
    </div>
  );
}
