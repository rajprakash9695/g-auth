import { ReactNode, createContext, useEffect, useState } from "react";

interface IInitialValues {
  user: null | any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: any) => void;
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
    function init() {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const isValid = verifyToken(token);

      if (!isValid) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUser({
        firstName: "Ashutosh",
        lastName: "Maurya",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocIB5i1FruImTRYC7Ozleko-15qQ-nUy1k3OEXKG2aH-=s96-c",
        email: "ashutoshbksgold@gmail.com",
      });
      setIsLoading(false);
      console.log("log: token", token);
    }

    init();
  }, []);

  const login = async (token: string, user: any) => {
    console.log("log: token", token, user);
    localStorage.setItem("log: token", token);
    setIsAuthenticated(true);
    setUser(user);
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
