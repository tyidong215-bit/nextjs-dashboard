import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

  // ✅ UUIDじゃないなら、DBに投げる前に404（"aaaa"対策）
    if (!z.string().uuid().safeParse(id).success) {
    notFound();
    }

    const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
    ]);

  // ✅ UUID形式でも、DBに存在しないなら404
    if (!invoice) {
    notFound();
    }

    return (
    <main>
      <h1>Edit Invoice</h1>
        <Breadcrumbs
        breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
            },
        ]}
        />
        <Form invoice={invoice} customers={customers} />
    </main>
    );
}