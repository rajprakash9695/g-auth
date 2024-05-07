import { ReactNode, createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface IInitialValues {
  user: null | any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
}

const initialValues: IInitialValues = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
};

export const AuthContext = createContext(initialValues);

interface IProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const user = await getUser();

      if (user?.data) {
        setIsAuthenticated(true);
        setUser(user?.data);
        setIsLoading(false);
        console.log('log: token', token);
      }
    }

    init();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('token', token);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    const user = await getUser();

    setIsAuthenticated(true);
    setUser(user?.data);
  };

  const logOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  const getUser = async () => {
    try {
      const res = await axiosInstance.get('/auth/@me');

      return res.data;
    } catch (error) {
      logOut();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, isAuthenticated, isLoading }}>
      {isLoading ? ( // Render loading indicator while isLoading is true
        <>Loading...</> // Replace LoadingIndicator with your loading component
      ) : (
        children // Render children when loading is complete
      )}
    </AuthContext.Provider>
  );
}

function verifyToken(token: string) {
  return true;
}
