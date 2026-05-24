import { formatCurrency } from "@/lib/categories";

type Props = {
  income: number;
  expenses: number;
  balance: number;
};

export function SummaryCards({ income, expenses, balance }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card label="Balance" value={balance} accent="indigo" />
      <Card label="Income" value={income} accent="emerald" />
      <Card label="Expenses" value={expenses} accent="rose" />
    </div>
  );
}

function Card({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "indigo" | "emerald" | "rose";
}) {
  const accents = {
    indigo: "from-indigo-500 to-purple-500",
    emerald: "from-emerald-500 to-teal-500",
    rose: "from-rose-500 to-orange-500",
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-20 blur-xl ${accents[accent]}`}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {formatCurrency(value)}
      </p>
    </div>
  );
}
