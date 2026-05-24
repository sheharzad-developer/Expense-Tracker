import Link from "next/link";
import { signIn } from "@/auth";

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-2xl font-bold text-white shadow-lg">
            $
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Expense Tracker
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Track your income and expenses. See where your money goes.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Your data stays private to your account.
        </p>

        <div className="mt-6 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
          <Link
            href="/demo"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Or try the form demo →
          </Link>
        </div>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961l3.007 2.332C4.672 5.166 6.656 3.58 9 3.58z"/>
    </svg>
  );
}
