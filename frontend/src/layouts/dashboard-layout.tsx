import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navbar';

export function DashboardLayout() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <Navbar />

      <Outlet />
    </div>
  );
}
