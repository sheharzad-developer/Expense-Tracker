import { auth } from "@/auth";
import { Header } from "@/components/Header";
import { SpendingChart } from "@/components/SpendingChart";
import { SummaryCards } from "@/components/SummaryCards";
import { TransactionList } from "@/components/TransactionList";
import { supabaseAdmin, type Transaction } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const email = session!.user!.email!;

  let transactions: Transaction[] = [];
  let loadError: string | null = null;

  try {
    const { data, error } = await supabaseAdmin()
      .from("transactions")
      .select("*")
      .eq("user_email", email)
      .order("occurred_on", { ascending: false })
      .limit(10);
    if (error) loadError = error.message;
    else transactions = (data as Transaction[]) ?? [];
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load.";
  }

  // Compute monthly summary from ALL transactions in this month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 10);

  let monthlyRows: Transaction[] = [];
  try {
    const { data } = await supabaseAdmin()
      .from("transactions")
      .select("*")
      .eq("user_email", email)
      .gte("occurred_on", monthStart);
    monthlyRows = (data as Transaction[]) ?? [];
  } catch {
    // ignore — already surfaced via loadError
  }

  const income = monthlyRows
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);
  const expenses = monthlyRows
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);
  const balance = income - expenses;

  const byCategoryMap = new Map<string, number>();
  monthlyRows
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      byCategoryMap.set(
        t.category,
        (byCategoryMap.get(t.category) ?? 0) + Number(t.amount)
      );
    });
  const byCategory = Array.from(byCategoryMap.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-slate-950">
      <Header email={email} />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            This month
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {now.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </p>
        </div>

        {loadError && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <strong>Setup needed:</strong> {loadError}
          </div>
        )}

        <SummaryCards income={income} expenses={expenses} balance={balance} />

        <div className="grid gap-6 lg:grid-cols-2">
          <SpendingChart data={byCategory} />
          <div>
            <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">
              Recent transactions
            </h2>
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}
