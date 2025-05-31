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
    fetch(`${API_BASE_URL}/api/users/${id}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res;
      })
      .then((res) => {
        if (!res) return;
        return res.json();
      })
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

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-700">Loading profile...</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-700">User not found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <Header />
      <div className="max-w-2xl mx-auto pt-6 pb-24 px-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  width={80}
                  height={80}
                  src={user.profilePicture}
                  alt={user.name || user.username}
                  className="w-20 h-20 rounded-full ring-4 ring-white/50"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-700">
                  {user.name || user.username}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  Joined{" "}
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>
                    <strong className="text-gray-700">
                      {user.followers.length}
                    </strong>{" "}
                    followers
                  </span>
                  <span>
                    <strong className="text-gray-700">
                      {user.following.length}
                    </strong>{" "}
                    following
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!user.isSelf && (
            <button
              onClick={() => handleFollow(user.id)}
              className={`px-6 py-2 font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                user.isFollowing
                  ? "bg-gradient-to-r from-red-300 to-pink-300 hover:from-red-400 hover:to-pink-400 text-white"
                  : "bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white"
              }`}
            >
              {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          {user.posts && user.posts.length > 0 ? (
            user.posts.map((post) => (
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
            ))
          ) : (
            <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-8 shadow-lg text-center">
              <p className="text-gray-500">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
