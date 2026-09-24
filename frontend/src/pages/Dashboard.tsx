import { useEffect, useState } from 'react'

import {
  getDashboard,
  type DashboardResponse,
} from '../services/dashboardApi'

function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(true)
  const [dashboardError, setDashboardError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setDashboardLoading(true)
        setDashboardError('')

        const data = await getDashboard()
        setDashboard(data)
      } catch (err) {
        console.error('Failed to load dashboard:', err)
        setDashboardError('Failed to load dashboard data.')
      } finally {
        setDashboardLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const statCards = [
    {
      title: 'Total Employees',
      value: dashboard?.totalEmployees ?? 0,
      accent: 'blue',
      detail: 'Across all departments',
    },
    {
      title: 'Active Employees',
      value: dashboard?.activeEmployees ?? 0,
      accent: 'green',
      detail: 'Currently working',
    },
    {
      title: 'Inactive Employees',
      value: dashboard?.inactiveEmployees ?? 0,
      accent: 'slate',
      detail: 'On hold / inactive',
    },
    {
      title: 'Departments',
      value: dashboard?.totalDepartments ?? 0,
      accent: 'purple',
      detail: 'Teams represented',
    },
  ]

  if (dashboardLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm">
        <p className="text-slate-600">Loading dashboard...</p>
      </div>
    )
  }

  if (dashboardError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
        {dashboardError}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 p-6 text-white shadow-lg shadow-slate-200/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
              Overview
            </p>
            <h1 className="mt-3 text-3xl font-bold">Employee Overview</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Welcome back, Admin. Here’s a quick snapshot of your workforce and team distribution.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            + Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              card.accent === 'blue'
                ? 'ring-1 ring-blue-100'
                : card.accent === 'green'
                  ? 'ring-1 ring-green-100'
                  : card.accent === 'slate'
                    ? 'ring-1 ring-slate-200'
                    : 'ring-1 ring-violet-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  card.accent === 'blue'
                    ? 'bg-blue-500'
                    : card.accent === 'green'
                      ? 'bg-green-500'
                      : card.accent === 'slate'
                        ? 'bg-slate-500'
                        : 'bg-violet-500'
                }`}
              />
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-800">{card.value}</p>
            <p className="mt-2 text-xs text-slate-500">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Recent Employees</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            Updated today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Department</th>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Status</th>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Joined</th>
              </tr>
            </thead>

            <tbody>
              {dashboard?.recentEmployees?.map((employee) => (
                <tr key={employee.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {employee.firstName} {employee.lastName}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">{employee.department}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        employee.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : employee.status === 'INACTIVE'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(employee.joiningDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}

              {(!dashboard?.recentEmployees || dashboard.recentEmployees.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800">Employees by Department</h2>
          </div>

          <div className="p-6">
            {!dashboard?.departmentStats || dashboard.departmentStats.length === 0 ? (
              <p className="text-sm text-slate-500">No department data available.</p>
            ) : (
              <div className="space-y-4">
                {dashboard.departmentStats.map((stat) => (
                  <div key={stat.department}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{stat.department}</span>
                      <span className="text-sm text-slate-500">{stat.count}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100">
                      <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{
                          width: dashboard.totalEmployees
                            ? `${(stat.count / dashboard.totalEmployees) * 100}%`
                            : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800">Employee Status</h2>
          </div>

          <div className="p-6">
            <div className="space-y-5">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Active</span>
                  <span className="text-sm text-slate-500">{dashboard?.activeEmployees ?? 0}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
                    style={{
                      width: dashboard?.totalEmployees
                        ? `${(dashboard.activeEmployees / dashboard.totalEmployees) * 100}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Inactive</span>
                  <span className="text-sm text-slate-500">{dashboard?.inactiveEmployees ?? 0}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-500"
                    style={{
                      width: dashboard?.totalEmployees
                        ? `${(dashboard.inactiveEmployees / dashboard.totalEmployees) * 100}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard