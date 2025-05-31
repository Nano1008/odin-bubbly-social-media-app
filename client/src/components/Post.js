import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Heart, MessageCircle, Send } from "lucide-react";
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
    <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header: Author Info + Time */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            width={40}
            height={40}
            src={author.profilePicture}
            alt={author.name}
            className="w-10 h-10 rounded-full ring-2 ring-white/50"
          />
          <span className="font-semibold text-gray-700">{author.name}</span>
        </div>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed">
        {content}
      </p>

      {/* Actions */}
      <div className="flex items-center space-x-6 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 ${
            liked
              ? "text-pink-500 bg-pink-50"
              : "text-gray-500 hover:text-pink-500 hover:bg-pink-50"
          }`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          <span className="text-sm">{likesCount}</span>
        </button>

        <button
          onClick={handleExistingComment}
          className="flex items-center space-x-2 p-2 rounded-xl text-gray-500 hover:text-purple-500 hover:bg-purple-50 transition-all duration-300"
        >
          <MessageCircle size={18} />
          <span className="text-sm">{commentsList.length}</span>
        </button>
      </div>

      {/* Comments */}
      {displayComments && (
        <div className="space-y-3 mb-4">
          {commentsList.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-3 p-3 bg-white/30 rounded-2xl"
            >
              <Image
                src={comment.author.profilePicture}
                alt="Comment Author"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full ring-1 ring-white/50"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <strong className="text-sm text-gray-700">
                    {comment.author.name || comment.author.username}
                  </strong>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment Input */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center space-x-3"
      >
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a gentle comment..."
          className="flex-1 p-3 bg-white/50 border border-white/50 rounded-2xl focus:outline-none focus:border-purple-300 transition-all duration-300 text-sm"
        />
        <button
          type="submit"
          className="p-3 bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Send size={16} className="text-white" />
        </button>
      </form>
    </div>
  );
}

export default Post;
