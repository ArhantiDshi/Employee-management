import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import {
  getEmployees,
  deleteEmployee,
    type Employee,
} from '../services/employeeApi'

import { DEPARTMENTS } from '../constants/departments'

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)
const [deleteLoading, setDeleteLoading] = useState(false)
const [search, setSearch] = useState('')
const [department, setDepartment] = useState('')
const [status, setStatus] = useState('')

const [page, setPage] = useState(0)
const [totalPages, setTotalPages] = useState(0)
const [totalElements, setTotalElements] = useState(0)
const pageSize = 10

const handleDelete = async () => {
  if (!deletingId) return

  try {
    setDeleteLoading(true)
    setError('')

    await deleteEmployee(deletingId)

    setEmployees((currentEmployees) =>
      currentEmployees.filter(
        (employee) => employee.id !== deletingId
      )
    )

    setDeletingId(null)
  } catch (error) {
    console.error(error)
    setError('Unable to delete employee. Please try again.')
  } finally {
    setDeleteLoading(false)
  }
}

const navigate = useNavigate()
useEffect(() => {
  const loadEmployees = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getEmployees(
        page,
        pageSize,
        search,
        department,
        status
      )

      setEmployees(data.content)
      setTotalPages(data.totalPages)
      setTotalElements(data.totalElements)
    } catch (err) {
      console.error('Failed to load employees:', err)
      setError('Failed to load employees.')
    } finally {
      setLoading(false)
    }
  }

  loadEmployees()
}, [page, search, department, status])
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-600">Loading employees...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Employees
          </h1>

          <p className="mt-1 text-slate-600">
            Manage your employees.
          </p>
        </div>

       <button
  onClick={() => navigate('/employees/new')}
  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
>
  + Add Employee
</button>
      </div>

      {/* Search and filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div>
            <label
              htmlFor="employee-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search
            </label>

         <input
  id="employee-search"
  type="text"
  value={search}
  onChange={(e) => {
    setSearch(e.target.value)
    setPage(0)
  }}
  placeholder="Search employees..."
  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
/>
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Department
            </label>
 <select
  id="department"
  value={department}
  onChange={(e) => {
    setDepartment(e.target.value)
    setPage(0)
  }}
  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
  <option value="">All Departments</option>

  {DEPARTMENTS.map((department) => (
    <option key={department} value={department}>
      {department}
    </option>
  ))}
</select>

          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

           <select
  id="status"
  value={status}
  onChange={(e) => {
    setStatus(e.target.value)
    setPage(0)
  }}
  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
>
  <option value="">All Status</option>
  <option value="ACTIVE">Active</option>
  <option value="INACTIVE">Inactive</option>
</select>
          </div>
        </div>
      </div>

      {/* Employee table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Name
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Email
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Salary
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-3 text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {employee.firstName} {employee.lastName}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {employee.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {employee.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    ₹{employee.salary.toLocaleString('en-IN')}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        employee.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                     <button
  onClick={() => navigate(`/employees/${employee.id}/edit`)}
  className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
>
  Edit
</button>

                     <button
  onClick={() => setDeletingId(employee.id)}
  className="text-sm font-medium text-red-600 hover:text-red-800"
>
  Delete
</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
    <div className="mt-5 flex items-center justify-between">
  <p className="text-sm text-slate-600">
    Showing {employees.length} of {totalElements} employees
  </p>

  <div className="flex items-center gap-2">
    <button
      type="button"
      disabled={page === 0}
      onClick={() => setPage((currentPage) => currentPage - 1)}
      className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Previous
    </button>

    <span className="px-3 py-2 text-sm text-slate-600">
      Page {page + 1} of {totalPages}
    </span>

    <button
      type="button"
      disabled={page >= totalPages - 1}
      onClick={() => setPage((currentPage) => currentPage + 1)}
      className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>
      {deletingId !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

      <h2 className="text-lg font-semibold text-slate-800">
        Delete Employee
      </h2>

      <p className="mt-3 text-sm text-slate-600">
        Are you sure you want to delete this employee?
        This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">

        <button
          type="button"
          onClick={() => setDeletingId(null)}
          disabled={deleteLoading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteLoading}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleteLoading ? 'Deleting...' : 'Delete'}
        </button>

      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default Employees