import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup,Signin,Dashboard} from "./Pages/index"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
