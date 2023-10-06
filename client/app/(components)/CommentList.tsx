import { ports } from "../../../utils";
import axios from "axios";
import React from "react";

type CommentsType = {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}[];
async function getComments(postId: string): Promise<CommentsType> {
  const res = await axios.get(
    `http://localhost:${ports.comments}/posts/${postId}/comments`
  );
  return res.data;
}

const CommentList = async ({ comments }: { comments: CommentsType }) => {
  // const comments = await getComments(postId);

  return (
    <div>
      comments
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {comments.map((c) => {
          return (
            <li key={c.id} className="w-full px-4 py-2 rounded-b-lg">
              -
              {c.status === "approved"
                ? c.content
                : c.status === "pending"
                ? "This is comment is getting reviewed"
                : "The comment is rejected "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentList;
