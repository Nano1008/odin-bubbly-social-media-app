import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export default function Post({
  author,
  content,
  imageUrl,
  likes,
  comments,
  createdAt,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      {/* Header: Author Info + Time */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {/* <Image
            width={40}
            height={40}
            src={author.profileImage || "https://via.placeholder.com/40"}
            alt={author.name}
            className="w-10 h-10 rounded-full mr-3"
          /> */}
          <span className="font-semibold text-gray-700">{author.name}</span>
        </div>
        <span className="text-sm text-gray-400">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{content}</p>

      {/* Optional Image */}
      {/* {imageUrl && (
        <Image
          width={600}
          height={400}
          src={imageUrl}
          alt="Post visual"
          className="rounded-xl mb-4 max-h-96 w-full object-cover"
        />
      )} */}

      {/* Footer: Likes and Comments */}
      <div className="text-sm text-gray-500 flex gap-4">
        <span>❤️ {likes.length}</span>
        <span>💬 {comments.length}</span>
      </div>
    </div>
  );
}
