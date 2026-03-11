import { cn } from '@/lib/utils';
import { Circle, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

type Status = 'waiting' | 'in_progress' | 'completed' | 'review_needed' | 'failed';

const statusConfig: Record<Status, { label: string; icon: typeof Clock; className: string }> = {
  waiting: { label: '대기', icon: Clock, className: 'bg-muted text-muted-foreground' },
  in_progress: { label: '진행중', icon: Circle, className: 'bg-blue-50 text-blue-700 border-blue-200' },
  completed: { label: '완료', icon: CheckCircle, className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  review_needed: { label: '검토필요', icon: AlertCircle, className: 'bg-amber-50 text-amber-700 border-amber-200' },
  failed: { label: '실패', icon: XCircle, className: 'bg-red-50 text-red-700 border-red-200' },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-caption font-medium border',
      config.className
    )}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
