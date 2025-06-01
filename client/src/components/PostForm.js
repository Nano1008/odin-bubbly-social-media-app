import { useState } from "react";
import { Plus } from "lucide-react";

function PostForm() {
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
      credentials: "include",
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
    <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-4 bg-white/50 border border-white/50 rounded-2xl focus:outline-none focus:border-purple-300 transition-all duration-300 resize-none"
          rows="3"
          placeholder="What's bubbling in your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <Plus size={18} />
            <span>{loading ? "Posting..." : "Share"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
