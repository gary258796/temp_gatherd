import Home from "./pages/Home";
// import AddVendor from "./pages/AddVendor";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/addVendor" element={<AddVendor />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
