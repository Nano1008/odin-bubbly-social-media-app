"use client";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Post from "@/components/Post";
import Header from "@/components/Header";
import Image from "next/image";

function ProfilePage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      });
  }, [API_BASE_URL, id]);

  const handleFollow = async (userId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/follow/${userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to follow/unfollow user");
      }
      const data = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        isFollowing: !prevUser.isFollowing,
        followers: data.followers,
      }));
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  if (isLoading) return <p className="text-center mt-8">Loading profile...</p>;
  if (!user) return <p className="text-center mt-8">User not found.</p>;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 space-y-6">
        <div className="flex items-center gap-4">
          <Image
            width={80}
            height={80}
            src={user.profilePicture}
            alt={user.name || user.username}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name || user.username}</h2>
            <p className="text-gray-500 text-sm">
              Joined{" "}
              {formatDistanceToNow(new Date(user.createdAt), {
                addSuffix: true,
              })}
            </p>
            <p className="text-sm text-gray-600">
              {user.followers.length} followers · {user.following.length}{" "}
              following
            </p>
            {!user.isSelf && (
              <button
                onClick={() => handleFollow(user.id)}
                className={`mt-2 px-4 py-1 rounded-full text-white text-sm ${
                  user.isFollowing ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {user.isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {user.posts.map((post) => (
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
          )) || <p className="text-center text-gray-500">No posts yet</p>}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
