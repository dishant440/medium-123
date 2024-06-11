
import medium from "../assets/medium.svg";

export default function AppBar() {
  return (
    <div className="flex flex-row justify-between mx-8 mt-4">
        <span className="text-xl font-bold">Medium</span>
        <span className="w-10 h-10"><img src={medium} alt="" /></span>
    </div>
  )
}
