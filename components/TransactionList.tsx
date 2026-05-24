"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteTransaction } from "@/app/transactions/actions";
import { formatCurrency, CATEGORY_COLORS } from "@/lib/categories";
import type { Transaction } from "@/lib/supabase";

type Props = {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
};

export function TransactionList({ transactions, onDelete }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Delete this transaction?")) return;
    if (onDelete) {
      onDelete(id);
      return;
    }
    startTransition(async () => {
      await deleteTransaction(id);
      router.refresh();
    });
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        No transactions yet. Add your first one above.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {transactions.map((t) => {
          const isIncome = t.type === "income";
          const color = CATEGORY_COLORS[t.category] ?? "#64748b";
          return (
            <li
              key={t.id}
              className="flex items-center gap-4 px-4 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: color }}
              >
                {t.category[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                    {t.description || t.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {t.category}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(t.occurred_on).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span
                className={`text-sm font-semibold ${
                  isIncome
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {isIncome ? "+" : "−"}
                {formatCurrency(t.amount)}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                disabled={isPending}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 dark:hover:bg-rose-950/40"
                aria-label="Delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
