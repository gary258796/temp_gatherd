import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/System/Login";
import Home from "../pages/System/Home";
import Restaurant from "../pages/Customer/Restaurant";
import Order from "../pages/Customer/Order";
import CustomerHome from "../pages/Customer/Home";
import Orders from "../pages/System/Orders";

// archive
import ArchiveHome from "../archive/pages/Home";
import AboutUs from "../archive/pages/AboutUs";
import JoinUs from "../archive/pages/JoinUs";
import Experience from "../archive/pages/Experience";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerHome />
  },
  {
    path: "/os",
    element: <Home />,
    children: [
      {
        path: '/os/orders',
        element: <Orders />,
      },
      {
        path: '/os/timeSetting',
        element: <>TimeSetting</>
      }
    ]
  },
  {
    path: "/os/login",
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
    path: "/archive",
    element: <ArchiveHome />
  },
  {
    path: "/archive/aboutus",
    element: <AboutUs />
  },
  {
    path: "/archive/joinus",
    element: <JoinUs />
  },
  {
    path: "/archive/experiences/:experienceId",
    element: <Experience />
  },
  {
    path: "/*",
    element: <></>
  }
]);
