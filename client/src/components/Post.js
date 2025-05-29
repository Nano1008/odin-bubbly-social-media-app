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
  const [likesCount, setLikesCount] = useState(likes.length);
  const [liked, setLiked] = useState(likedByCurrentUser);

  const handleLike = async () => {
    const res = await fetch(`http://localhost:3001/api/posts/${id}/like`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setLikesCount(data.likesCount);
      setLiked((prev) => !prev);
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

        <span>{comments.length} comments</span>
      </div>
    </div>
  );
}

export default Post;
