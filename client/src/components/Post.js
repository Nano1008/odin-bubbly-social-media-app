import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState } from "react";

function Post({
  id,
  author,
  content,
  imageUrl,
  likes,
  comments,
  createdAt,
  likedByCurrentUser,
}) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [likesCount, setLikesCount] = useState(likes.length);
  const [liked, setLiked] = useState(likedByCurrentUser);
  const [displayComments, setDisplayComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentsList, setCommentsList] = useState(comments);

  const handleLike = async () => {
    const res = await fetch(`${API_BASE_URL}/api/posts/${id}/like`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setLikesCount(data.likesCount);
      setLiked((prev) => !prev);
    }
  };

  const handleExistingComment = () => {
    setDisplayComments((prev) => !prev);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const res = await fetch(`${API_BASE_URL}/api/posts/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: commentInput }),
      credentials: "include",
    });

    if (res.ok) {
      const newComment = await res.json();
      setCommentsList((prev) => [newComment.comment, ...prev]);
      setCommentInput("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      {/* Header: Author Info + Time */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Image
            width={40}
            height={40}
            src={author.profilePicture || "https://via.placeholder.com/40"}
            alt={author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-semibold text-gray-700">{author.name}</span>
        </div>
        <span className="text-sm text-gray-400">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{content}</p>

      {/* Likes and Comments */}
      <div className="flex justify-between text-sm text-gray-500">
        <button onClick={handleLike}>
          {liked ? "❤️" : "🤍"} {likesCount}
        </button>

        <button onClick={handleExistingComment}>
          {commentsList.length} comments
        </button>
      </div>

      {displayComments &&
        commentsList.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center gap-2 text-sm mt-2"
          >
            <Image
              src={comment.author.profilePicture}
              alt="Comment Author"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <div>
              <strong>{comment.author.name || comment.author.username}</strong>{" "}
              {comment.content}{" "}
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        ))}

      {/* Comment Section */}
      <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-2">
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button type="submit" className="text-blue-500 text-sm">
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
