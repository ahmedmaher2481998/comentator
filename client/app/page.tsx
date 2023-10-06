import Image from "next/image";
import CreatePost from "./(components)/CreatePost";
import PostList from "./(components)/PostList";
// import CreateComment from "./(components)/CreateComment";
// import CommentList from "./(components)/CommentList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  pt-1 pb-20  m-auto">
      <h1 className="text-center w-full mb-20 bg-zinc-200 rounded-xl text-slate-800 h-10 container flex items-center justify-center">
        <p className="text-2xl">Commentator</p>
      </h1>
      <CreatePost />
      <PostList />
    </main>
  );
}
