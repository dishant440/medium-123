import { useState,useEffect } from "react";
import axios from "axios";

interface Blog {
    "content":string;
    "title":string;
    "id":number,
    "author":{
        "name":string
    }
}


export const  useBlog = () =>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlog] = useState<Blog[]>([]);
    const backend_url = "http://127.0.0.1:8787";
    const token = localStorage.getItem("token");

    useEffect(() =>{
        axios.get(`${backend_url}/api/v1/blog/bulk`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((response) =>{
                
                setBlog(response.data.blogs);
                setLoading(false);
            } ) 
    },[backend_url,token]);
    return {loading,blogs}
}

