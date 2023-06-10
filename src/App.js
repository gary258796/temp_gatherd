import Home from "./pages/Home";
// import JoinUs from "./pages/JoinUs";
// import AddVendor from "./pages/AddVendor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JoinUs from "./pages/JoinUs";
import ScrollToTop from "./components/ScrollToTop";
import Experience from "./pages/Experience";
import Menu from "./pages/Menu";
import Guideline from "./pages/Host/Guideline";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Request from "./pages/Request";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { getUserData } from "./utils/user";
import User from "./pages/User";
import Profile from "./pages/User/Profile";
import UserOrders from "./pages/User/Orders";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = getUserData();
    userData && setUser(userData);
  }, []);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId="1018066292186-p5a7gl85c3uf6tbo32fl6i9m45far5mn.apps.googleusercontent.com">
        <BrowserRouter>
          <ScrollToTop />
          <Header user={user} onUserChange={setUser} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/explore"
              element={<Navigate to="../joinus" replace />}
            />
            <Route exact path="/joinus" element={<JoinUs />} />
            <Route exact path="/experience" element={<Experience />} />
            <Route exact path="/experiences/:experienceId" element={<Menu />} />
            <Route
              exact
              path="/experiences/:experienceId/checkout"
              element={<Checkout />}
            />
            <Route
              exact
              path="/experiences/:experienceId/request"
              element={<Request />}
            />
            <Route exact path="/user" element={<User user={user} />} />
            <Route
              exact
              path="/user/profile"
              element={<Profile user={user} />}
            />
            <Route
              exact
              path="/user/orders"
              element={<UserOrders user={user} />}
            />
            <Route exact path="/host/guideline" element={<Guideline />} />
            <Route exact path="/system/orders" element={<Orders />} />
            {/* <Route exact path="/addVendor" element={<AddVendor />} /> */}
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
