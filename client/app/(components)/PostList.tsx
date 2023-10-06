import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";
import { ports } from "../../../utils";

type PostWithCommentsType = {
  [postId: string]: {
    id: string;
    title: string;
    comments: { id: string; content: string }[];
  };
};

async function getPosts() {
  const res = await axios.get(`http://localhost:${ports.query}/posts`);
  return res.data;
}

const PostList = async () => {
  // const [posts, setPosts] = useState<PostType>({});
  const posts: PostWithCommentsType = await getPosts();

  return (
    <div className="max-w-3xl w-full mt-6 ">
      <p className="w-full">posts :</p>
      <div className="flex gap-2 justify-start items-start">
        {Object.values(posts)?.map((p) => {
          // console.log("Values ", Object.values(posts));
          return (
            <div
              key={p.id}
              className="block w-[30%] max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {p.title}
              </h5>
              <div className="font-normal text-gray-700 dark:text-gray-400">
                <CommentList comments={p.comments} />
                <CreateComment postId={p.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
