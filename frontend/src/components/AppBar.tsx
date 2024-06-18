import { useNavigate } from "react-router-dom";
import medium from "../assets/medium.svg";
import { useAuth } from "../context/AuthContext";

export default function AppBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");

      logout();
    } else {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  };

  return (
    <div className="flex flex-row justify-between mx-8 mt-4 items-center">
      <span className="text-xl font-bold">Medium</span>
      <div className="flex flex-row items-center gap-x-2">
        <span className="w-10 h-10">
          <img src={medium} alt="Medium Logo" />
        </span>
        <button
          onClick={handleAuthButtonClick}
          className="ml-4 px-4 py-2 bg-black text-white rounded"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
