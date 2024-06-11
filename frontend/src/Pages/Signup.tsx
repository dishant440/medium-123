import { useState } from "react";
import { Input, Button } from "../components/index";
import { Link } from "react-router-dom";

export default function Signup() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}

  return (
    <>
      <div className="flex justify-evenly items-center p-4 mt-20">
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
    </>
  );
}
