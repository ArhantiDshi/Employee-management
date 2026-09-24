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

  if (dashboardLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-600">
          Loading dashboard...
        </p>
      </div>
    )
  }

  if (dashboardError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {dashboardError}
      </div>
    )
  }

  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome back, Admin. Here's an overview of your employees.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Employees */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Employees
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-800">
            {dashboard?.totalEmployees ?? 0}
          </p>
        </div>

        {/* Active Employees */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Active Employees
          </p>

          <p className="mt-3 text-3xl font-bold text-green-600">
            {dashboard?.activeEmployees ?? 0}
          </p>
        </div>

        {/* Inactive Employees */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Inactive Employees
          </p>

          <p className="mt-3 text-3xl font-bold text-red-600">
            {dashboard?.inactiveEmployees ?? 0}
          </p>
        </div>

        {/* Departments */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Departments
          </p>

          <p className="mt-3 text-3xl font-bold text-blue-600">
            {dashboard?.totalDepartments ?? 0}
          </p>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Employees
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Name
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboard?.recentEmployees?.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t border-slate-200"
                >
                  <td className="px-6 py-4 text-sm text-slate-800">
                    {employee.firstName} {employee.lastName}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {employee.department}
                  </td>

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
                    {new Date(
                      employee.joiningDate
                    ).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}

              {(!dashboard?.recentEmployees ||
                dashboard.recentEmployees.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dashboard Analytics */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Employees by Department */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Employees by Department
            </h2>
          </div>

          <div className="p-6">

            {!dashboard?.departmentStats ||
            dashboard.departmentStats.length === 0 ? (
              <p className="text-sm text-slate-500">
                No department data available.
              </p>
            ) : (
              <div className="space-y-4">

                {dashboard.departmentStats.map((stat) => (
                  <div key={stat.department}>

                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        {stat.department}
                      </span>

                      <span className="text-sm text-slate-500">
                        {stat.count}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">

                      <div
                        className="h-2 rounded-full bg-blue-600"
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

        {/* Employee Status */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Employee Status
            </h2>
          </div>

          <div className="p-6">

            <div className="space-y-5">

              {/* Active */}
              <div>

                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Active
                  </span>

                  <span className="text-sm text-slate-500">
                    {dashboard?.activeEmployees ?? 0}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{
                      width: dashboard?.totalEmployees
                        ? `${
                            (dashboard.activeEmployees /
                              dashboard.totalEmployees) *
                            100
                          }%`
                        : '0%',
                    }}
                  />

                </div>
              </div>

              {/* Inactive */}
              <div>

                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Inactive
                  </span>

                  <span className="text-sm text-slate-500">
                    {dashboard?.inactiveEmployees ?? 0}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-slate-400"
                    style={{
                      width: dashboard?.totalEmployees
                        ? `${
                            (dashboard.inactiveEmployees /
                              dashboard.totalEmployees) *
                            100
                          }%`
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