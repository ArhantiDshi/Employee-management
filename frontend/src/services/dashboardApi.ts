import api from './apiClient';

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
