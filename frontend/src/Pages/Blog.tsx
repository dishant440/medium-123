import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/Heading";
import Post from "../components/Post";
import AuthorSec from "../components/AuthorSec";
import medium from "../assets/medium.svg";
import { useReadBlog } from "../hooks";
import { Loading, Error } from "../components";

export default function Blog() {
  const { id } = useParams<{ id: string }>();
  const { readBlog, loading, error, blog } = useReadBlog();

  useEffect(() => {
    if (id) {
      readBlog(id);
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      <img className="w-10 h-10 mx-10 mt-2" src={medium} alt="Medium Logo" />

      <div className="grid grid-cols-3 gap-x-2 mt-2">
        <div className="left flex flex-col gap-y-4 p-10 justify-start col-start-1 col-end-3 shadow-sm">
          {blog && (
            <>
              <Heading title={blog.title} />
              <Post content={blog.content} />
            </>
          )}
        </div>
        <div className="right">
          {blog && <AuthorSec author={blog.author} />}
        </div>
      </div>
    </>
  );
}
