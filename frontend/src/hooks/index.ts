import { useState, useEffect } from "react";
import axios from "axios";

interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const backend_url = "http://127.0.0.1:8787";
  const token = localStorage.getItem("token");
  console.log(token);
    
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/v1/blog/bulk`, {
          headers: {
            Authorization:`Bearer ${token}`,
          },
        });
        setBlogs(response.data.Blog);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [backend_url]);

  return { loading, blogs, error };
};
