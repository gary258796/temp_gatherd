import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Restaurant from "../pages/Customer/Restaurant";
import Order from "../pages/Customer/Order";
import OrderSuccess from "../pages/Customer/OrderSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>123</>,
    errorElement: <>Error!</>
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
    path: "/restaurant/:id/order/success",
    element: <OrderSuccess />
  }
]);
