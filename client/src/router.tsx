import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    Component: LoginForm,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
