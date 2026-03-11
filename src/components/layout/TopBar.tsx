import { Search, Bell, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

const routeTitles: Record<string, string> = {
  '/': '대시보드',
  '/customers': '고객 관리',
  '/customers/new': '새 고객 등록',
  '/history': '이력 관리',
  '/settings': '설정',
};

export function TopBar() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || '케이스 상세';

  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-4 gap-4 shrink-0 z-sticky">
      <SidebarTrigger className="text-muted-foreground" />

      <h1 className="text-heading-md font-semibold text-foreground">{title}</h1>

      <div className="flex-1" />

      <div className="relative w-80 hidden xl:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        <Input
          placeholder="고객명, 케이스 검색..."
          className="h-9 pl-9 rounded-xs border-border bg-background text-body-md placeholder:text-text-tertiary"
        />
      </div>

      <Button variant="ghost" size="icon" className="relative text-muted-foreground">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
      </Button>

      <Button
        size="sm"
        className="h-9 rounded-xs bg-primary hover:bg-primary-hover text-primary-foreground text-body-sm gap-2"
        onClick={() => window.location.href = '/customers/new'}
      >
        <Plus className="w-4 h-4" />
        빠른 생성
      </Button>
    </header>
  );
}
