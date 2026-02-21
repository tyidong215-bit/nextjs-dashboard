import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* ⭐ サブタイトル追加 */}
      <p className="mb-6 text-sm text-gray-500">
        Overview of your business metrics
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* cardsは後で */}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<p>Loading chart...</p>}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<p>Loading invoices...</p>}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}