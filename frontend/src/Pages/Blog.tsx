import Heading from "../components/Heading"
import Post from "../components/Post"
import AuthorSec from "../components/AuthorSec"


export default function Blog() {
  return (
    <div className="grid grid-cols-3 gap-x-2 mt-2">
      <div className="left flex flex-col gap-y-4 p-10 justify-start col-start-1 col-end-3 shadow-sm">
        <Heading/>
        <Post/>
      </div>
      <div className="right">
        <AuthorSec/>
      </div>
    </div>
  )
}
