import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  auth: {
    username: import.meta.env.VITE_API_USERNAME,
    password: import.meta.env.VITE_API_PASSWORD,
  },
});

export interface DepartmentStat {
  department: string;
  count: number;
}

export interface RecentEmployee {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  status: string;
  joiningDate: string;
}

export interface DashboardResponse {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  totalDepartments: number;
  departmentStats: DepartmentStat[];
  recentEmployees: RecentEmployee[];
}

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await api.get<DashboardResponse>('/dashboard');
  return response.data;
};