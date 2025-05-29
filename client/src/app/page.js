"use client";

import Post from "@/components/Post";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/posts/feed");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto mt-10 space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            author={post.author}
            content={post.content}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
