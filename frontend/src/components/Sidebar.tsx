import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-72 flex-col bg-slate-950 text-white shadow-2xl shadow-slate-200/40">
      <div className="border-b border-slate-800 px-6 py-6">
        <p className="sidebar-brand text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Portfolio App
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">Employee Hub</h1>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          Employees
        </NavLink>
      </nav>

      <div className="border-t border-slate-800 px-6 py-5 text-sm text-slate-400">
        Built for HR operations
      </div>
    </aside>
  )
}

export default Sidebar