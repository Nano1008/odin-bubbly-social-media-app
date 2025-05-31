"use client";
import { useEffect, useState } from "react";
import User from "@/components/User";
import Header from "@/components/Header";

export default function UsersPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [API_BASE_URL]);

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
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, status: data.followed ? "following" : "not following" }
            : user
        )
      );
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <Header />
      <div className="max-w-2xl mx-auto pt-6 pb-24 px-4">
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Discover People
          </h2>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <User
                  id={user.id}
                  profilePicture={user.profilePicture}
                  name={user.name}
                  username={user.username}
                />
                <button
                  className="px-6 py-2 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleFollow(user.id)}
                >
                  {user.status === "following" ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
