import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface TimePeriodInputModalProps {
  onSubmit: (period: string, topic: string) => void;
  onCancel: () => void;
  className?: string;
}

export function TimePeriodInputModal({ onSubmit, onCancel, className }: TimePeriodInputModalProps) {
  const [period, setPeriod] = React.useState('');
  const [topic, setTopic] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!period) return;
    onSubmit(period, topic);
  };

  return (
    <Card className="p-6 bg-white border border-border rounded-xl shadow-saju-lg w-full max-w-md mx-auto relative">
      <h3 className="text-heading-sm font-bold text-foreground flex items-center gap-2 mb-4 font-display">
        <Search className="w-5 h-5 text-indigo-500" />
        특정 시기 집중 분석
      </h3>
      <p className="text-body-sm text-text-secondary mb-6">
        궁금하신 연도와 월(시기) 및 집중적으로 분석하고 싶은 주제를 적어주시면, 해당 기간의 운세 흐름을 자세히 딥다이브 해드립니다.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="period" className="text-body-sm font-medium">궁금한 시기 (예: 내년 상반기, 2026년 3월)</Label>
          <Input 
            id="period"
            value={period} 
            onChange={(e) => setPeriod(e.target.value)} 
            placeholder="예) 2026년 가을" 
            required 
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-body-sm font-medium">집중 분석 주제 (선택)</Label>
          <Input 
            id="topic"
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
            placeholder="예) 승진운, 문서운, 이사운" 
            className="h-11"
          />
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">취소</Button>
          <Button type="submit" disabled={!period} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
            분석 시작
          </Button>
        </div>
      </form>
    </Card>
  );
}
