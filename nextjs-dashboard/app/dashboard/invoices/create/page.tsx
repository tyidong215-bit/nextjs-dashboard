import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Invoice',
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
    <main>
        <h1>Create Invoice</h1>
        <h1 className="text-xl md:text-2xl">請求書ページ（invoices）</h1>
        <p className="mt-4 text-gray-600">ここは後で実装していくよ。</p>  
    <Breadcrumbs
        breadcrumbs={[
    { label: 'Invoices', href: '/dashboard/invoices' },
        {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
        },
        ]}
        />
        <Form customers={customers} />
    </main>
    );
}