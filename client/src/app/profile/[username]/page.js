import Post from "@/components/Post";
import Header from "@/components/Header";
import Image from "next/image";

export default async function ProfilePage({ params }) {
  const user = {
    username: "",
    name: "Alice Example",
    profilePicture:
      "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/48.jpg",
    createdAt: "2024-06-01T00:00:00Z",
    followers: [{}, {}, {}],
    following: [{}],
  };

  const posts = [
    {
      id: 1,
      author: user,
      content: "My first post on this app!",
      imageUrl: "",
      likes: [{}],
      comments: [{}, {}],
      createdAt: "2025-05-27T22:00:00Z",
    },
  ];

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 space-y-6">
        <div className="flex items-center gap-4">
          <Image
            width={80}
            height={80}
            src={user.profilePicture}
            alt=""
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name || user.username}</h2>
            <p className="text-gray-500 text-sm">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              {user.followers.length} followers · {user.following.length}{" "}
              following
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}
