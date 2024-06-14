import PostCard from "../components/PostCard";
import AppBar from "../components/AppBar";
import { useBlog } from "../hooks";
import { Loading } from "../components";

export default function AllPost() {
  const {loading,blogs} = useBlog();

  if (loading) {
    return <div>
      <Loading/>
    </div>
  }
  

  return (<>
  <AppBar/>
  <div className="mx-20">
      <div className=" flex flex-col justify-items-center ">
        <div className="TopBar flex flex-row mx-10 mt-2 h-16 items-center  shadow-lg">
            <span className="mx-4 font-serif font-semibold">For You</span>
            <span className="mx-4 font-serif font-semibold">Following</span>
        </div>
     <div className="flex flex-col mx-10 mt-2 shadow-md p-2">
      {
        blogs.map(blog=><PostCard
          title={blog.title}
          authorName={blog.author.name || "Anonymous"} 
          publishedDate="2024-06-08" 
        />)
      }
    
      
     </div>
      </div>
    </div>
  </>
  );
}
