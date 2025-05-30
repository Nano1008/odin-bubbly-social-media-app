"use client";

import Post from "@/components/Post";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/feed`);
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
  }, [API_BASE_URL]);

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto mt-10 space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            content={post.content}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
            likedByCurrentUser={post.likedByCurrentUser}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
