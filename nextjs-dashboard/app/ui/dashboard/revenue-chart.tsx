import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

function getMaxValue(values: number[]) {
  const max = Math.max(...values, 0);
  return max === 0 ? 1 : max;
}

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  const values = revenue.map((d) => d.revenue);
  const maxValue = getMaxValue(values);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-end gap-2">
          {revenue.map((d) => {
            const heightPct = Math.round((d.revenue / maxValue) * 100);

            return (
              <div key={d.month} className="flex w-full flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-md bg-blue-500"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{d.month}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}