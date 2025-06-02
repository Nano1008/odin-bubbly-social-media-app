"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Users, User, LogOut } from "lucide-react";

function Header() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/current_user`, {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data.currentUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };
    getUser();
  }, [API_BASE_URL]);

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/auth/logout`, {
      credentials: "include",
    })
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  if (isLoading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/50 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-white/50 shadow-lg sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/feed" className="flex items-center space-x-3">
            <div className="text-2xl">🫧</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
              Bubbly
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <Link
              href="/feed"
              className="p-2 hover:bg-purple-100 rounded-xl transition-colors group"
            >
              <Home
                size={20}
                className="text-purple-600 group-hover:text-purple-700"
              />
            </Link>
            <Link
              href="/users"
              className="p-2 hover:bg-purple-100 rounded-xl transition-colors group"
            >
              <Users
                size={20}
                className="text-purple-600 group-hover:text-purple-700"
              />
            </Link>
            <Link
              href={`/profile/${user.id}`}
              className="p-2 hover:bg-purple-100 rounded-xl transition-colors group"
            >
              <User
                size={20}
                className="text-purple-600 group-hover:text-purple-700"
              />
            </Link>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-100 rounded-xl transition-colors group"
            >
              <LogOut
                size={20}
                className="text-red-500 group-hover:text-red-600"
              />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
