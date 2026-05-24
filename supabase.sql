-- Run this in Supabase Dashboard → SQL Editor → New query

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  type text not null check (type in ('income', 'expense')),
  amount numeric(12, 2) not null check (amount > 0),
  category text not null,
  description text,
  occurred_on date not null,
  created_at timestamptz not null default now()
);

create index transactions_user_date_idx
  on public.transactions (user_email, occurred_on desc);

-- All access goes through the server (service role key bypasses RLS),
-- so this just blocks any accidental client-side reads with the anon key.
alter table public.transactions enable row level security;
