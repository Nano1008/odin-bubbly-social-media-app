"use client";

import Post from "@/components/Post";
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import { useEffect, useState } from "react";

function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/feed`, {
          credentials: "include",
        });
        const data = await response.json();
        setPosts(data.postsWithLikes);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [API_BASE_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <Header />
      <div className="max-w-2xl mx-auto pt-6 pb-24 px-4 space-y-6">
        <PostForm />
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
    </div>
  );
}

export default Home;
