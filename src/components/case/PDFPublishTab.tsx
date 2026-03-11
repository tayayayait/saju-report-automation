import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageThumbnail } from '@/components/ui/page-thumbnail';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileWarning, Eye, FileText, CheckCircle } from 'lucide-react';
import { generatePDFFromElement } from '@/services/pdfService';
import { toast } from '@/hooks/use-toast';

interface PDFPublishTabProps {
  caseId: string;
  caseData: any;
  onUpdate: () => void;
}

export function PDFPublishTab({ caseId, caseData, onUpdate }: PDFPublishTabProps) {
  const [activePage, setActivePage] = useState(1);
  const [publishing, setPublishing] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const htmlContent = caseData?.final_content?.html || 
                      caseData?.draft_content?.text?.replace(/\n/g, '<br>') || 
                      '<p>저장된 리포트 내용이 없습니다.</p>';

  const handlePublish = async () => {
    if (!pdfRef.current) return;
    setPublishing(true);
    try {
      await generatePDFFromElement(pdfRef.current, {
        filename: `${caseData.customer.name}_사주리포트.pdf`,
        margin: [20, 15, 20, 15]
      });
      toast({ title: 'PDF 다운로드 완료', description: '생성된 PDF 파일이 다운로드되었습니다.' });
    } catch (e) {
      console.error(e);
      toast({ title: 'PDF 발행 실패', description: '처리 중 오류가 발생했습니다.', variant: 'destructive' });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex h-[800px] border border-border rounded-md overflow-hidden bg-background">
      {/* 1. Left Panel (Thumbnails) - 140px */}
      <div className="w-[140px] shrink-0 border-r border-border flex flex-col bg-surface-secondary/50">
        <div className="h-12 border-b border-border flex items-center justify-center font-semibold text-body-sm text-muted-foreground p-2">
          미리보기
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 items-center">
          <PageThumbnail pageNumber={1} isActive={activePage === 1} onClick={() => setActivePage(1)} />
        </div>
      </div>

      {/* 2. Center Panel (PDF Preview) */}
      <div className="flex-1 flex flex-col min-w-[500px] bg-slate-100 relative overflow-y-auto">
        <div className="sticky top-4 right-4 z-10 flex gap-2 justify-end px-4">
          <Button variant="secondary" size="sm" className="shadow-md h-9">
            <Eye className="w-4 h-4 mr-2" /> 확대 보기
          </Button>
        </div>
        
        <div className="flex-1 flex justify-center p-8">
          {/* Print Area - Ref for PDF Generation */}
          <div 
            ref={pdfRef}
            className="w-[800px] bg-white shadow-lg shrink-0 border border-border p-[40px] print:m-0 print:border-none print:shadow-none min-h-[1131px]"
          >
            {/* Header Mock */}
            <div className="text-3xl font-serif text-slate-800 border-b-2 border-slate-800 pb-2 mb-8 flex justify-between">
              <span>{caseData.customer.name}님의 사주 분석 레포트</span>
            </div>
            
            <div 
              className="prose prose-slate max-w-none prose-h1:text-heading-lg prose-h2:text-heading-md" 
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />

            <div className="mt-20 pt-4 border-t border-border text-center text-xs text-muted-foreground/50">
              Saju Report Automation System | Copyright © 2026
            </div>
          </div>
        </div>
      </div>

      {/* 3. Right Panel (Publish Options) - 320px */}
      <div className="w-[320px] shrink-0 border-l border-border flex flex-col bg-card overflow-y-auto">
        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-heading-md font-semibold mb-4">퍼블리싱 설정</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-body-sm">적용 템플릿</Label>
                <Select defaultValue="premium">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">기본 템플릿</SelectItem>
                    <SelectItem value="premium">프리미엄 템플릿</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-2">
                <Label className="text-body-sm mb-2 block">옵션 포함 여부</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox defaultChecked />
                    <span className="text-body-sm">표지 포함 (지원 예정)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox defaultChecked />
                    <span className="text-body-sm">자동 목차 생성 (지원 예정)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox defaultChecked />
                    <span className="text-body-sm">명식 차트 첨부 (지원 예정)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-heading-sm font-semibold mb-4">발행 조치</h3>
            <Button
              className="w-full h-11 bg-primary text-white text-body-md font-semibold mb-3 hover:scale-[1.02] transition-transform"
              onClick={handlePublish}
              disabled={publishing}
            >
              {publishing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                  PDF 생성 중... 
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  최종 PDF 다운로드
                </div>
              )}
            </Button>
            
            <p className="text-caption text-yellow-600 bg-yellow-50 p-2 rounded flex items-start gap-1.5 border border-yellow-200">
              <FileWarning className="w-4 h-4 shrink-0 mt-0.5" />
              <span>현재 HTML 기반의 브라우저 렌더링으로 PDF를 추출합니다. 배경 그래픽이 올바르게 나타나지 않을 수 있습니다.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
