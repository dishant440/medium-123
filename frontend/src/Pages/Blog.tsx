import Heading from "../components/Heading";
import Post from "../components/Post";
import AuthorSec from "../components/AuthorSec";
import medium from "../assets/medium.svg";

export default function Blog() {
  return (
    <>
      <img className="w-10 h-10 mx-10 mt-2" src={medium} alt="" />

      <div className="grid grid-cols-3 gap-x-2 mt-2 ">
        <div className="left flex flex-col gap-y-4 p-10 justify-start col-start-1 col-end-3 shadow-sm">
          <Heading />
          <Post />
        </div>
        <div className="right">
          <AuthorSec />
        </div>
      </div>
    </>
  );
}
