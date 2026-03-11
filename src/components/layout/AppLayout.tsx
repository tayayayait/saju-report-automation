import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';
import { SessionExpiryWarning } from '@/components/SessionExpiryWarning';

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-auto p-6 lg:p-8 relative">
            <Outlet />
            <SessionExpiryWarning />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
