import "./Home.css";
import StatusUpdate from "./StatusUpdate";
import useAxios from "../hooks/useAxios";
import { CircularProgress } from "@mui/material";
import Post from "./Post";
import { useEffect, useState } from "react";

export default function Home() {
  const [newLocalPosts, setNewLocalPosts] = useState([]);
  const { data: posts, isPending } = useAxios("/post/getPosts", "GET");

  const handleNewLocalPost = (post) => {
    setNewLocalPosts([...newLocalPosts, post]);
  };

  return (
    <div className="home">
      <StatusUpdate handleNewLocalPost={handleNewLocalPost} />

      <div className="main">
        {isPending && <CircularProgress className="progress-bar" />}
        {newLocalPosts &&
          newLocalPosts
            .slice(0)
            .reverse()
            .map((localPost) => (
              <Post
                key={localPost.id}
                postBody={localPost.post}
                createdAt={localPost.createdAt}
                username={localPost.username}
              />
            ))}
        {posts &&
          posts.map((post) => (
            <Post
              key={post.id}
              postBody={post.post}
              createdAt={post.createdAt}
              username={post.username}
            />
          ))}
      </div>
    </div>
  );
}
