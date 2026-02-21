'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/app/lib/utils';
import Link from 'next/link';
import clsx from 'clsx';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex gap-2">
      {allPages.map((page, index) => {
        if (page === '...') {
          return <span key={index}>...</span>;
        }

        return (
          <Link
            key={index}
            href={createPageURL(page)}
            className={clsx(
              'px-3 py-1 border rounded',
              page === currentPage && 'bg-blue-500 text-white'
            )}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}