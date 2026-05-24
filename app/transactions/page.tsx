import { auth } from "@/auth";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { Header } from "@/components/Header";
import { TransactionList } from "@/components/TransactionList";
import { supabaseAdmin, type Transaction } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const session = await auth();
  const email = session!.user!.email!;

  let transactions: Transaction[] = [];
  let loadError: string | null = null;
  try {
    const { data, error } = await supabaseAdmin()
      .from("transactions")
      .select("*")
      .eq("user_email", email)
      .order("occurred_on", { ascending: false });
    if (error) loadError = error.message;
    else transactions = (data as Transaction[]) ?? [];
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load.";
  }

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-slate-950">
      <Header email={email} />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Transactions
        </h1>

        {loadError && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <strong>Setup needed:</strong> {loadError}
          </div>
        )}

        <AddTransactionForm />
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}
