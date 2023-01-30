import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { store } from "./app/redux/store";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import DashboardPage from "./pages/dashboard.page";
import "./index.css";
import VerifyPage from "./pages/activate.page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "ui/styles.css";
import "./index.css";
import RequireUser from "./features/auth/lib/requireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verification/:email/:hex",
    element: <VerifyPage />,
  },
  {
    path: "/dashboard",
    element: <RequireUser allowedRoles={["user", "admin"]} />,
    children: [
      {
        element: <DashboardPage />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
