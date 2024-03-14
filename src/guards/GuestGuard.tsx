import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ReactNode } from "react";

type IGuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: IGuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return <>{children}</>;
}
