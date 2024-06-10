import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Input,Button} from '../components/index'

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 

  function handleSubmit(){

  }

  return (
   <>
   <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="left">
        <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>
          <form  onSubmit={handleSubmit}>
            <Input Label="username" Placeholder="username" name="username" Value={username}/>
            <Input Label="email" Placeholder="email" name="email" Value={email}/>
            <Input Label="password" Placeholder="*****" name="password" Value={password}/>
            <Button Type="submit" value="Sign Up" />
          </form>
      </div>
      <div className="right"></div>
   </div>
   </>
  )
}
