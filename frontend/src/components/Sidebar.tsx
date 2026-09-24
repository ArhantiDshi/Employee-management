import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-xl font-bold">Employee Management</h1>
      </div>

      <nav className="flex-1 px-4 py-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg mb-2 ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`
          }
        >
          Employees
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar