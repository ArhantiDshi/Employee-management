function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 shadow-sm backdrop-blur-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Human Resources
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-800">Employee Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 sm:inline-flex">
          Welcome, Admin
        </span>

        <button
          type="button"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header