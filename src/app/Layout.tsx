import { Navbar } from '@/navbar/Navbar';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
