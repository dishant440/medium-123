import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useReadBlog = () => {
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  const readBlog = async (id: string) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlog(response.data);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { readBlog, loading, error, blog };
};


export const useCreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlog = async (title: string, content: string) => {
    const backend_url = "http://127.0.0.1:8787";
    const token = localStorage.getItem("token");

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${backend_url}/api/v1/blog/create`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );


      return response.data;
    } catch (error: any) {
      setError(error.message);
      throw error;  // Rethrow error to allow the component to handle it if needed
    } finally {
      setLoading(false);
    }
  };

  return { createBlog, loading, error };
};

export const useBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const backend_url = "http://127.0.0.1:8787";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
