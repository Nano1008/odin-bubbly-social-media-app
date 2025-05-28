"use client";
import Image from "next/image";

export default function UsersPage() {
  const users = [
    {
      id: "1",
      name: "Alice",
      username: "alice",
      profilePicture:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
      status: "not_following", // or 'following', 'pending'
    },
    {
      id: "2",
      name: "Bob",
      username: "bob",
      profilePicture:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
      status: "following",
    },
  ];

  const getFollowButton = (status) => {
    if (status === "following")
      return <span className="text-green-600">Following</span>;
    if (status === "pending")
      return <span className="text-yellow-600">Pending</span>;
    return (
      <button
        className="text-blue-500 hover:underline"
        onClick={() => alert("Follow clicked")}
      >
        Follow
      </button>
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Users</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
          >
            <div className="flex items-center gap-3">
              <Image
                width={40}
                height={40}
                src={user.profilePicture}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold text-gray-700">
                {user.name || user.username}
              </span>
            </div>
            {getFollowButton(user.status)}
          </li>
        ))}
      </ul>
    </div>
  );
}
