import api from '@/api/axios';

export const loginUser = async (email: string, password: string): Promise<string> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.token; 
};


export const registerUser = async (email: string, password: string, name: string) => {
  const response = await api.post('/auth/register', { 
    email, 
    password, 
    role: 'CLIENT'
  });
  return response.data;
};