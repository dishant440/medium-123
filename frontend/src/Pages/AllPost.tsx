import PostCard from "../components/PostCard";
import AppBar from "../components/AppBar";
import { useBlog } from "../hooks";
import { Loading } from "../components/index";
import { useNavigate } from "react-router-dom";

export default function AllPost() {
  const { loading, blogs } = useBlog();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handlePost = async (id: string) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <AppBar />
      <div className="mx-20">
        <div className="flex flex-col justify-items-center">
          <div className="TopBar flex flex-row mx-10 mt-2 h-16 items-center shadow-lg">
            <span className="mx-4 font-serif font-semibold">For You</span>
            <span className="mx-4 font-serif font-semibold">Following</span>
          </div>
          <div className="flex flex-col mx-10 mt-2 shadow-md p-2">
            {blogs.map((blog) => (
              <PostCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                authorName={blog.author.name || "Anonymous"}
                onClick={handlePost}
                content={blog.content}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
