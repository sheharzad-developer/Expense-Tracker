"use client";

import Link from "next/link";
import { useState } from "react";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { TransactionList } from "@/components/TransactionList";
import type { Transaction, TransactionType } from "@/lib/supabase";

type DemoInput = {
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  occurred_on: string;
};

export default function DemoPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function handleAdd(input: DemoInput) {
    const now = new Date().toISOString();
    setTransactions((prev) => [
      {
        id: crypto.randomUUID(),
        user_email: "demo@local",
        type: input.type,
        amount: input.amount,
        category: input.category,
        description: input.description.trim() || null,
        occurred_on: input.occurred_on,
        created_at: now,
      },
      ...prev,
    ]);
  }

  function handleDelete(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-900 dark:text-slate-100"
          >
            Expense Tracker
          </Link>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
            Demo · local only
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Form demo
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            No sign-in, no database — entries live in browser memory and disappear on refresh.
          </p>
        </div>

        <AddTransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </main>
    </div>
  );
}
