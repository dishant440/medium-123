import { useState,useEffect } from "react";
import axios from "axios";

export const  useBlog = () =>{
    const [loading,setLoading] = useState(true);
    const [blogs,setBlog] = useState([]);
    const backend_url = "http://127.0.0.1:8787"

    useEffect(() =>{
        axios.get(`${backend_url}/api/v1/blog/bulk`)
            .then((response) =>{
                setBlog(response.data);
                setLoading(false);
            } ) 
    },[]);
    return {loading,blogs}
}

