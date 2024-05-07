import { Navigate, Outlet, useRoutes } from "react-router-dom";

import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";
import { ElementType, Suspense, lazy } from "react";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Component {...props} />
    </Suspense>
  );
};

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

const Home = Loadable(lazy(() => import("./pages/home")));
const User = Loadable(lazy(() => import("./pages/user")));
const Login = Loadable(lazy(() => import("./pages/login")));
