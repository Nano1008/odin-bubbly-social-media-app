import { useState } from "react";

function PostForm({ onPostCreated }) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent("");
    } else {
      const err = await res.json();
      alert(err.error || "Failed to create post");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border rounded-xl bg-white shadow"
    >
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows="3"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

export default PostForm;
