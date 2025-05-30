"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function Header() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/current_user`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkAuth();
  }, [API_BASE_URL]);

  const handleLogout = () => {
    // Implement logout logic here, e.g., clear session, redirect to login
    console.log("User logged out");
  };
  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <header className="p-4 bg-white shadow sticky top-0 flex justify-between items-center">
      <h1 className="text-xl font-bold">Bubbly</h1>
      <nav className="flex items-center gap-6 text-gray-700">
        <Link href="/">Feed</Link>
        <Link href="/users">Users</Link>
        <Link href={`/profile/${user.id}`}>My Profile</Link>{" "}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
