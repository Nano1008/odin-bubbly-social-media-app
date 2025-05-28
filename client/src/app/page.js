import Post from "@/components/Post";

function Home() {
  const posts = [
    {
      id: "1",
      authorId: "1",
      content: "Hello, world!",
      likes: 3,
      comments: 1,
    },
    {
      id: "2",
      authorId: "1",
      content: "This is my second post!",
      likes: 5,
      comments: 2,
    },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Feed</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          authorId={post.authorId}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
}

export default Home;
