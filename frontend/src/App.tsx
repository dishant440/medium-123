import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup,Signin,Blog} from "./Pages/index"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
