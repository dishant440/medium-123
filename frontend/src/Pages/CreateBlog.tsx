import React, { useState } from "react";
import { Input } from "../components/index";
import medium from "../assets/medium.svg";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog submitted:", { title, content });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg min-h-screen rounded-lg p-8 max-w-4xl w-full">
        <div className="grid grid-cols-3">
          <img className="w-10 h-10" src={medium} alt="" />
          
          <h1 className="text-3xl font-bold mb-6 text-center">Create Blog</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              Label="Title"
              id="title"
              Type="text"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              Placeholder="Title"
              ClassName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[300px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
