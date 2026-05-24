"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS, formatCurrency } from "@/lib/categories";

type Props = {
  data: Array<{ category: string; total: number }>;
};

export function SpendingChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Add an expense to see your spending breakdown.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">
        Spending by category
      </h2>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((d) => (
                <Cell
                  key={d.category}
                  fill={CATEGORY_COLORS[d.category] ?? "#64748b"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid rgb(226 232 240)",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2">
        {data.map((d) => (
          <li
            key={d.category}
            className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400"
          >
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[d.category] ?? "#64748b" }}
              />
              {d.category}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {formatCurrency(d.total)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
