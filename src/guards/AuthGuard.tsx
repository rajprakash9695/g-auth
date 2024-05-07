import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactNode, useState } from 'react';
import Login from '../pages/login';

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  console.log('log: auth', isAuthenticated);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
