import SideNav from '@/app/ui/dashboard/sidenav';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
　 return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
　  <div className="w-full flex-none md:w-64 pt-4">
　　 <SideNav />
</div>

        <div className="grow p-6 md:overflow-y-auto md:p-12">
        {children}
    </div>
    </div>
);
}
