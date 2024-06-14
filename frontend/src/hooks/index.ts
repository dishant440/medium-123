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

export const getblog = async (id:string) =>{
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
 

  try {
    const response = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`,{
      headers: {
        Authorization:localStorage.getItem('token')
      }
    });
    setBlogs(response.data)

  } catch (error) {
    
  }

}


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
      console.log(response.data);
      
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

  return { loading, blogs, error};
};
