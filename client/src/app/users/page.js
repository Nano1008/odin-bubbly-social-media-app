"use client";
import { useEffect, useState } from "react";
import User from "@/components/User";
import Header from "@/components/Header";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users");
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
  }, []);

  const handleFollow = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/follow/${userId}`,
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
    <>
      <Header />
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Users</h1>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
            >
              <User
                profilePicture={user.profilePicture}
                name={user.name}
                username={user.username}
              />
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() => handleFollow(user.id)}
              >
                {user.status === "following" ? "Unfollow" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
