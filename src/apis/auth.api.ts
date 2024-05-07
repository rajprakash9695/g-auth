import axiosInstance from '../utils/axiosInstance';

const QUERY_KEY = 'auth';

interface IAuth {
  email: string;
  password: string;
}

export async function loginFn({ email, password }: IAuth) {
  console.log('log: auth', email, password);

  return;
  const res = await axiosInstance.post('/auth/login', { email, password });
  return res.data;
}
