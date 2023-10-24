import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/System/Login";
import Home from "../pages/System/Home";
import Restaurant from "../pages/Customer/Restaurant";
import Order from "../pages/Customer/Order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: '/orders',
        element: <>Orders</>
      },
      {
        path: '/timeSetting',
        element: <>TimeSetting</>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/restaurant/:id",
    element: <Restaurant />,
  },
  {
    path: "/restaurant/:id/order",
    element: <Order />
  },
  {
    path: "/*",
    element: <Navigate to="/" />
  }
]);
