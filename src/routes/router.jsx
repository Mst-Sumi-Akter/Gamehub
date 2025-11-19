import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import GameDetails from "../pages/GameDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/ForgotPassword";
import UpdateProfile from "../pages/UpdateProfile";
import PrivateRoute from "./PrivateRoute"; 
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Register />,
      },
    ],
  },
  {
    path: "/game",
    element: <h1>game layout</h1>,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/games/:id",
    element: (
      <PrivateRoute>
        <GameDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth/update-profile",
    element: <UpdateProfile />,
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
