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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
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
          <Route exact path="/host/guideline" element={<Guideline />} />
          {/* <Route exact path="/addVendor" element={<AddVendor />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
