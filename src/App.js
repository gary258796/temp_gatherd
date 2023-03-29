import Home from "./pages/Home";
import JoinUs from "./pages/JoinUs";
// import AddVendor from "./pages/AddVendor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ScrollToTop from "./components/ScrollToTop";
import Experience from "./pages/Experience";
import Menu from "./pages/Menu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route exact path="/joinus" element={<Explore />} />
          <Route exact path="/experience" element={<Experience />} />
          <Route exact path="/experiences/:experienceId" element={<Menu />} />
          {/* <Route exact path="/addVendor" element={<AddVendor />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
