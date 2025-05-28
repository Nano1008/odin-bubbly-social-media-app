import Post from "@/components/Post";

function Home() {
  const posts = [
    {
      id: "1",
      author: { name: "Alice", profileImage: "https://example.com/avatar.jpg" },
      content: "Hello, world!",
      imageUrl: "https://example.com/image.jpg",
      likes: [{}, {}, {}],
      comments: [{}, {}],
      createdAt: "2025-05-28T20:10:00.000Z",
    },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Feed</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          author={post.author}
          content={post.content}
          imageUrl={post.imageUrl}
          likes={post.likes}
          comments={post.comments}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
}

export default Home;
