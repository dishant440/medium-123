import React, { useState } from "react";
import { Input, Button } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const toastId = toast.loading("Signing up...");

    try {
      const response = await axios.post("http://127.0.0.1:8787/api/v1/user/signup", {
        name,
        email,
        password,
        username,
      });
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      toast.update(toastId, {
        render: "Signup successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/signin");
    } catch (error:any) {
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
      <div className="flex justify-evenly items-center p-4 mt-15">
        <div className="left bg-white shadow-lg flex flex-col w-[300px] justify-center items-center p-4 ">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-600 mt-2">Create your account</p>
            <span className="text-gray-600 text-sm">Already have an account
              <Link to="/signin" className="pl-2 text-gray-600 underline">Log in</Link>
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              Label="username"
              Placeholder="username"
              name="username"
              Value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <Input
              Label="Name"  
              Placeholder="Name"
              name="Name"
              Value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
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
            <Button Type="submit" value="Sign Up" />
          </form>
        </div>
        <div className="right flex flex-col w-[400px] gap-y-3">
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
