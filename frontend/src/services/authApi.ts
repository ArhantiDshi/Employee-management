import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1`;

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  username: string;
  role: 'ADMIN' | 'HR_MANAGER' | 'VIEWER';
}

export const login = async (username: string, password: string) => {
  const response = await axios.post<LoginResponse>(`${baseURL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};
