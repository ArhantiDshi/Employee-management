import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1`,
  auth: {
    username: import.meta.env.VITE_API_USERNAME,
    password: import.meta.env.VITE_API_PASSWORD,
  },
});

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status?: string;
}

export interface EmployeePage {
  content: Employee[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const getEmployees = async (
  page = 0,
  size = 10,
  search = '',
  department = '',
  status = ''
): Promise<EmployeePage> => {
  const response = await api.get<EmployeePage>('/employees', {
    params: {
      page,
      size,
      ...(search && { search }),
      ...(department && { department }),
      ...(status && { status }),
    },
  });

  return response.data;
};

export const getEmployeeById = async (
  id: number
): Promise<Employee> => {
  const response = await api.get<Employee>(`/employees/${id}`);

  return response.data;
};

export const createEmployee = async (
  employee: Omit<Employee, 'id'>
): Promise<Employee> => {
  const response = await api.post<Employee>('/employees', employee);

  return response.data;
};

export const updateEmployee = async (
  id: number,
  employee: Omit<Employee, 'id'>
): Promise<Employee> => {
  const response = await api.put<Employee>(
    `/employees/${id}`,
    employee
  );

  return response.data;
};

export const deleteEmployee = async (
  id: number
): Promise<void> => {
  await api.delete(`/employees/${id}`);
};