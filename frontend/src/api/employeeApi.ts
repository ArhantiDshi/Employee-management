import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  auth: {
    username: 'admin',
    password: 'admin123',
  },
})

export const getEmployees = async (page: number, pageSize: number, search: string, department: string, status: string) => {
  const response = await api.get('/api/v1/employees')

  return response.data
}