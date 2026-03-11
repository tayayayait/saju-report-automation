import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Stepper } from '@/components/ui/stepper';
import { DiffViewer } from '@/components/ui/diff-viewer';
import { PromptVariableTag } from '@/components/ui/prompt-variable-tag';
import { Play, RotateCcw, AlertTriangle, Cpu } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateDraft, GenerateRequest } from '@/services/aiGenerationService';
import { fetchLatestPromptVersion } from '@/services/promptService';
import { supabase } from '@/integrations/supabase/client';
import { calculateFourPillars, fourPillarsToString } from 'manseryeok';

interface AIGenerationTabProps {
  caseId: string;
  initialMode?: string;
  initialModel?: string;
  customerData?: any;
  draftContent?: string | null;
  onUpdate?: () => void;
}

const GENERATION_STEPS = [
  { id: 'prepare', label: '준비' },
  { id: 'prompt', label: '프롬프트 조합' },
  { id: 'request', label: 'AI 요청' },
  { id: 'process', label: '결과 처리' },
  { id: 'complete', label: '완료' },
];

export function AIGenerationTab({ caseId, initialMode = '30p', initialModel = 'gemini-3-flash-preview', customerData, draftContent, onUpdate }: AIGenerationTabProps) {
  const [mode, setMode] = useState(initialMode);
  const [model, setModel] = useState(initialModel);
  const [scopes, setScopes] = useState({
    personality: true,
    job: true,
    health: true,
    wealth: false,
    fortune_10y: false,
    fortune_1y: false,
  });

  const [generating, setGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState('prepare');
  const [showDiff, setShowDiff] = useState(false);
  const [promptVersion, setPromptVersion] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [saving, setSaving] = useState(false);
  
  const handleScopeChange = (key: keyof typeof scopes) => {
    setScopes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAccept = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('cases')
        .update({ 
          draft_content: { text: generatedContent },
          status: 'in_progress',
          generation_mode: mode as '30p' | '100p',
          model: model,
          prompt_version: promptVersion
        })
        .eq('id', caseId);
        
      if (error) throw error;
      
      toast({ title: "초안 채택", description: "성공적으로 반영되었습니다." });
      if (onUpdate) onUpdate();
    } catch (e: any) {
      toast({ title: '저장 실패', description: e.message || '저장 중 문제가 발생했습니다.', variant: 'destructive' });
    } finally {
      setSaving(false);
      setShowDiff(false);
    }
  };

  const startGeneration = async () => {
    setGenerating(true);
    setShowDiff(false);
    setGeneratedContent('');
    
    try {
      const ver = await fetchLatestPromptVersion(mode);
      setPromptVersion(ver);

      // Calculate Saju
      let sajuResult = null;
      if (customerData?.birth_date && customerData?.birth_time) {
        const [year, month, day] = customerData.birth_date.split('-').map(Number);
        const [hour, minute] = customerData.birth_time.split(':').map(Number);
        const fourPillars = calculateFourPillars({
          year, month, day, hour, minute,
          isLunar: customerData.calendar_type === 'lunar' || customerData.calendar_type === 'lunar_leap',
          isLeapMonth: customerData.calendar_type === 'lunar_leap'
        });
        sajuResult = {
          원국: fourPillarsToString(fourPillars),
          한자: fourPillars.toHanjaObject(),
          일간오행: fourPillars.dayElement,
          일간음양: fourPillars.dayYinYang,
        };
      }

      // Build Prompt Text
      const selectedScopes = Object.entries(scopes).filter(([_, v]) => v).map(([k]) => k);
      const promptText = `
고객 명식 정보:
${JSON.stringify(sajuResult, null, 2)}

분석 요청 범위:
${selectedScopes.join(', ')}

위 데이터를 바탕으로 상세한 사주 분석 리포트를 작성해주세요.`;

      const request: GenerateRequest = {
        caseId,
        mode,
        model,
        scopes,
        promptVersion: ver,
        promptText,
      };

      const resultText = await generateDraft(
        request, 
        (step) => setCurrentStep(step),
        (chunkText) => {
          setGeneratedContent(chunkText);
          setShowDiff(true); // 스트리밍이 시작되면 즉시 Diff 뷰어를 보여줌
        }
      );
      
      setGeneratedContent(resultText);
      toast({ title: 'AI 초안 생성 완료', description: '생성 결과를 검토해주세요.' });
    } catch (e: any) {
      toast({ title: '오류 발생', description: e.message || '생성 중 문제가 발생했습니다.', variant: 'destructive' });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Parameters */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-radius-md shadow-saju-sm border-border">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-heading-md">생성 파라미터</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="space-y-2">
                <Label className="text-body-sm font-semibold">생성 모드</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30p">기본 (30p 템플릿)</SelectItem>
                    <SelectItem value="100p">프리미엄 (100p 템플릿)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-body-sm font-semibold">AI 모델</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini-3-flash-preview">Gemini 3 Flash (미리보기)</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o (권장)</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-2">
                <Label className="text-body-sm font-semibold">생성 범위 설정</Label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={scopes.personality} onCheckedChange={() => handleScopeChange('personality')} />
                    <span className="text-body-sm">성격 및 기질</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={scopes.job} onCheckedChange={() => handleScopeChange('job')} />
                    <span className="text-body-sm">직업 및 적성</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={scopes.health} onCheckedChange={() => handleScopeChange('health')} />
                    <span className="text-body-sm">건강운</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={scopes.wealth} onCheckedChange={() => handleScopeChange('wealth')} />
                    <span className="text-body-sm">재물운</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={scopes.fortune_10y} onCheckedChange={() => handleScopeChange('fortune_10y')} />
                    <span className="text-body-sm">대운 (10년)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox checked={scopes.fortune_1y} onCheckedChange={() => handleScopeChange('fortune_1y')} />
                    <span className="text-body-sm">세운 (1년)</span>
                  </label>
                </div>
              </div>

              <Button 
                onClick={startGeneration} 
                disabled={generating} 
                className="w-full mt-4 bg-primary text-white"
              >
                {generating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    <span>생성 중...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>초안 생성 시작</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Progress & Result Viewer */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <Card className="rounded-radius-md shadow-saju-sm border-border flex-1 flex flex-col">
            <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center justify-between">
              <CardTitle className="text-heading-md">진행 상태 및 결과</CardTitle>
              {generating && <div className="text-caption text-text-tertiary font-mono animate-pulse">Running...</div>}
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col gap-6">
              <div className="bg-surface-secondary rounded-md p-6 border border-border">
                <Stepper steps={GENERATION_STEPS} currentStepId={currentStep} />
              </div>

              {/* Progress log or Diff View */}
              <div className="flex-1 flex flex-col min-h-[300px]">
                {showDiff ? (
                  <div className="flex-1 flex flex-col h-full space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-body-md font-semibold flex items-center gap-2">
                        <span>생성 결과 검토</span>
                        <PromptVariableTag name={promptVersion || "v1.2.0"} type="system" />
                      </h4>
                    </div>
                    {/* Simulated DiffViewer component */}
                    <div className="flex-1 min-h-[400px]">
                      <DiffViewer 
                        originalContent={draftContent || "[기존 생성된 초안 내용이 없습니다]"} 
                        newContent={generatedContent} 
                        onAccept={handleAccept}
                        onReject={() => toast({ title: "적용 취소", description: "이전 상태를 유지합니다." })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-md bg-muted/20">
                    <div className="text-center text-muted-foreground flex flex-col items-center">
                      <Cpu className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-body-lg">좌측 패널에서 파라미터를 설정하고 시작하세요</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
