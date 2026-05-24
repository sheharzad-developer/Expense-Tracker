export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Health",
  "Entertainment",
  "Shopping",
  "Education",
  "Other",
] as const;

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investment",
  "Gift",
  "Other",
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Housing: "#a855f7",
  Utilities: "#06b6d4",
  Health: "#ef4444",
  Entertainment: "#ec4899",
  Shopping: "#eab308",
  Education: "#10b981",
  Salary: "#22c55e",
  Freelance: "#14b8a6",
  Investment: "#6366f1",
  Gift: "#f43f5e",
  Other: "#64748b",
};

export function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}
