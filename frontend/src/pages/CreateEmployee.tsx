import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../constants/departments'
import { createEmployee } from '../services/employeeApi'

interface EmployeeForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  designation: string
  salary: string
  joiningDate: string
}

function CreateEmployee() {
  const navigate = useNavigate()

  const [form, setForm] = useState<EmployeeForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    joiningDate: '',
  })

  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
const auth = {
  username: import.meta.env.VITE_API_USERNAME,
  password: import.meta.env.VITE_API_PASSWORD,
}
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setError('')
    setSaving(true)

    try {
await createEmployee({
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  phone: form.phone,
  department: form.department,
  designation: form.designation,
  salary: Number(form.salary),
  joiningDate: form.joiningDate,
})
      navigate('/employees')
    } catch (error: any) {
      console.error(error)

      if (error.response?.status === 409) {
        setError('An employee with this email already exists.')
      } else if (error.response?.status === 400) {
        setError('Please check the entered employee details.')
      } else {
        setError('Unable to create employee. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Add Employee
        </h1>

        <p className="mt-2 text-slate-600">
          Add a new employee to the organization.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                First Name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Last Name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="employee@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Department
              </label>

            <select
  id="department"
  name="department"
  value={form.department}
  onChange={(e) =>
    setForm((previous) => ({
      ...previous,
      department: e.target.value,
    }))
  }
  required
  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
>
  <option value="">Select Department</option>

  {DEPARTMENTS.map((department) => (
    <option key={department} value={department}>
      {department}
    </option>
  ))}
</select>
            </div>

            <div>
              <label
                htmlFor="designation"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Designation
              </label>

              <input
                id="designation"
                name="designation"
                type="text"
                value={form.designation}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="e.g. Software Developer"
              />
            </div>

            <div>
              <label
                htmlFor="salary"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Salary
              </label>

              <input
                id="salary"
                name="salary"
                type="number"
                min="0"
                value={form.salary}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="85000"
              />
            </div>

            <div>
              <label
                htmlFor="joiningDate"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Joining Date
              </label>

              <input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={() => navigate('/employees')}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Employee'}
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateEmployee