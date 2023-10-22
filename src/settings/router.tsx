import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Restaurant from "../pages/Customer/Restaurant";

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
    element: <Restaurant />
  }
]);
