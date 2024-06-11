import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup,Signin,Blog,CreateBlog, AllPost} from "./Pages/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/allPost" element={<AllPost />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
