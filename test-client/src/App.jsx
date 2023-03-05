import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewHome from "./pages/NewHome";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from 'react-hot-toast'
import RoomPage from "./pages/RoomPage";
import Room from "./pages/Room";

export default function App() {
  // const navigate = useNavigate();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage /> },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "room/:roomId",
          element: <Room />,
        },
      ],
    },
  ]);

  


  return (
    <div>
      <Toaster position="bottom-center"/>
      <RouterProvider router={router} />
    </div>
  );
}
