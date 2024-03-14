import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Login from "./pages/login";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: (
            <>
              <Home />
            </>
          ),
        },
        {
          path: "/login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to={"/dashboard/user"} replace />,
          index: true,
        },
        {
          path: "user",
          element: (
            <>
              <User />
            </>
          ),
        },
      ],
    },
  ]);
}
