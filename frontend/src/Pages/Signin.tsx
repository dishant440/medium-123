import { useState } from "react";
import { Input, Button } from "../components/index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8787/api/v1/user/signin",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      toast.update(toastId, {
        render: "Signin successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/allpost");
    } catch (error: any) {
      toast.update(toastId, {
        render: error.response?.data?.message || "Error during signup",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }
  return (
    <>
      <div className="flex justify-evenly items-center p-4 mt-20">
        <div className="left bg-white shadow-lg flex flex-col w-[300px] justify-center items-center p-4 ">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-gray-600 mt-2">Welcome back!</p>
            <span className="text-gray-600 text-sm">
              Don't have an account?
              <Link to="/signup" className="pl-2 text-gray-600 underline">
                Sign Up
              </Link>
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              Label="email"
              Placeholder="email"
              name="email"
              Value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              Label="password"
              Placeholder="*****"
              name="password"
              Value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button Type="submit" value="Sign In" />
          </form>
        </div>
        <div className="right flex flex-col w-[400px] gap-y-3 mt-20">
          <p className="text-2xl font-bold ">
            The customer service I received was exceptional. The support team
            went above and beyond to address my concerns.
          </p>
          <div className="text-sm flex flex-col ">
            <span className="font-bold">Jules Winfield</span>
            <span>CEO Acme Inc</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
