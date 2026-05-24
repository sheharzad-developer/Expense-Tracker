import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  user_email: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string | null;
  occurred_on: string;
  created_at: string;
};

function getEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env (and Vercel env vars for deploys).`);
  }
  return value;
}

let browserClient: SupabaseClient | null = null;
export function getSupabaseBrowser(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(
      getEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
      getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      { auth: { persistSession: false } }
    );
  }
  return browserClient;
}

export function supabaseAdmin(): SupabaseClient {
  return createClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    getEnv("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY),
    { auth: { persistSession: false } }
  );
}
