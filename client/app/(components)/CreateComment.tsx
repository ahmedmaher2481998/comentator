"use client";
import axios from "axios";
import React, { useState } from "react";

const CreateComment = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState("");
  const handleCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:5001/posts/${postId}/comments`,
      { content }
    );
    console.log("res of creating a post ", res.data);

    setContent("");
  };
  return (
    <div className="max-w-md mt-4 w-full">
      <form onSubmit={handleCreateComment}>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            make a comment
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
            placeholder="write a comment"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
