"use client";
import Link from "next/link";

function Header() {
  const handleLogout = () => {
    // Implement logout logic here, e.g., clear session, redirect to login
    console.log("User logged out");
  };
  return (
    <header className="p-4 bg-white shadow sticky top-0 flex justify-between items-center">
      <h1 className="text-xl font-bold">Bubbly</h1>
      <nav className="flex items-center gap-6 text-gray-700">
        <Link href="/">Feed</Link>
        <Link href="/users">Users</Link>
        <Link href="/profile/me">My Profile</Link>{" "}
        {/* Or dynamic route based on session */}
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
