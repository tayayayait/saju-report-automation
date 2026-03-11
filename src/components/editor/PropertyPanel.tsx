import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { type Editor } from '@tiptap/react';

interface PropertyPanelProps {
  editor: Editor | null;
}

export function PropertyPanel({ editor }: PropertyPanelProps) {
  // In the future, this component can read the active block from `editor` and display relevant properties.

  return (
    <div className="w-[360px] shrink-0 border-l border-border flex flex-col bg-card">
      <div className="h-12 border-b border-border flex items-center px-4 font-semibold text-body-md text-foreground">
        속성 및 주석
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="rounded-xs shadow-none border-border">
          <CardContent className="p-3">
            <div className="text-body-sm font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> 
              팀 코멘트
            </div>
            <div className="space-y-3">
              <div className="bg-muted p-2 rounded-sm text-caption">
                <span className="font-semibold text-primary block mb-1">최에디터 (오후 2:30)</span>
                이 부분의 해석이 너무 단정적입니다. 표현을 조금 부드럽게 수정해주세요.
              </div>
              <div className="bg-primary-soft text-primary-dark p-2 rounded-sm text-caption border border-primary/20">
                <span className="font-semibold block mb-1">나 (오후 2:35)</span>
                수정 반영했습니다!
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xs shadow-none border-border">
          <CardContent className="p-3">
            <div className="text-body-sm font-semibold mb-2">프롬프트 변수 정보</div>
            <p className="text-caption text-muted-foreground leading-relaxed">
              현재 블록은 <code className="bg-muted px-1 rounded">{'{{일간_성격}}'}</code> 변수로부터 생성되었습니다.
              재요청 시 이 블록만 업데이트할 수 있습니다.
            </p>
            <Button size="sm" variant="outline" className="w-full mt-3 h-8 text-caption">
              해당 블록만 AI 재요청
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
