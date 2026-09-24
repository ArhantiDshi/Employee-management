function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-slate-800">
        Employee Management
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          Welcome, Admin
        </span>

        <button
          type="button"
          className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header