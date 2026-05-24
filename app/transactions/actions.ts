"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { supabaseAdmin, type TransactionType } from "@/lib/supabase";

type CreateInput = {
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  occurred_on: string;
};

export async function createTransaction(input: CreateInput) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Not signed in." };
  if (!input.amount || input.amount <= 0) return { error: "Amount must be greater than zero." };
  if (!input.category) return { error: "Category is required." };
  if (!input.occurred_on) return { error: "Date is required." };

  try {
    const { error } = await supabaseAdmin().from("transactions").insert({
      user_email: session.user.email,
      type: input.type,
      amount: input.amount,
      category: input.category,
      description: input.description?.trim() || null,
      occurred_on: input.occurred_on,
    });
    if (error) return { error: error.message };
    revalidatePath("/transactions");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to add." };
  }
}

export async function deleteTransaction(id: string) {
  const session = await auth();
  if (!session?.user?.email) return { error: "Not signed in." };

  try {
    const { error } = await supabaseAdmin()
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("user_email", session.user.email);
    if (error) return { error: error.message };
    revalidatePath("/transactions");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete." };
  }
}
