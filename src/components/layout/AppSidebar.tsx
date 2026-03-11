import {
  LayoutDashboard,
  Users,
  Clock,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
  LogOut,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { title: '대시보드', url: '/', icon: LayoutDashboard },
  { title: '고객 관리', url: '/customers', icon: Users },
  { title: '이력 관리', url: '/history', icon: Clock },
  { title: '설정', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { profile, signOut, roles, hasRole } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (item.title === '설정' && !hasRole('admin')) return false;
    if (item.title === '이력 관리' && !(hasRole('admin') || hasRole('editor'))) return false;
    return true;
  });

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <div className="h-16 flex items-center px-4 gap-3 border-b border-border shrink-0">
        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
          <Shield className="w-4.5 h-4.5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-title-sm text-foreground truncate">
            사주 리포트
          </span>
        )}
      </div>

      <SidebarContent className="px-3 py-4">
        {!collapsed && (hasRole('admin') || hasRole('editor')) && (
          <Button
            size="sm"
            className="w-full mb-4 h-9 rounded-xs bg-primary hover:bg-primary-hover text-primary-foreground text-body-sm gap-2"
            onClick={() => window.location.href = '/customers/new'}
          >
            <Plus className="w-4 h-4" />
            새 고객 등록
          </Button>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-body-md transition-colors duration-150 ${
                        isActive(item.url)
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      activeClassName=""
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border">
        {!collapsed && profile && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary text-caption font-medium">
                {profile.display_name?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm text-foreground truncate">{profile.display_name}</p>
              <p className="text-caption text-text-tertiary capitalize">{roles[0] || 'viewer'}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>로그아웃</span>}
        </Button>
        <Separator className="my-2" />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="w-full h-8 text-muted-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
