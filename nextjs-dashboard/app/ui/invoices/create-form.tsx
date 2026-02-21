'use client';

import { useActionState } from 'react';
import { createInvoice, State } from '@/app/lib/actions';
import { CustomerField } from '@/app/lib/definitions';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function Form({
  customers,
}: {
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Customer */}
        <div className="mb-4">
          <label
            htmlFor="customer"
            className="mb-2 block text-sm font-medium"
          >
            Choose customer
          </label>

          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div
            id="customer-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p
                  className="mt-2 text-sm text-red-500"
                  key={error}
                >
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium"
          >
            Choose an amount
          </label>

          <div className="relative mt-2 rounded-md">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="amount-error"
            />
          </div>

          <div
            id="amount-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p
                  className="mt-2 text-sm text-red-500"
                  key={error}
                >
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>

          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  className="h-4 w-4 cursor-pointer"
                  aria-describedby="status-error"
                />
                <span className="ml-2 text-sm">
                  Pending
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="paid"
                  className="h-4 w-4 cursor-pointer"
                  aria-describedby="status-error"
                />
                <span className="ml-2 text-sm">
                  Paid
                </span>
              </label>
            </div>
          </div>

          <div
            id="status-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p
                  className="mt-2 text-sm text-red-500"
                  key={error}
                >
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>

      {/* Form message */}
      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="mt-4 text-sm text-red-500">
            {state.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
}