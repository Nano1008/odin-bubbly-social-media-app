export default function Post({ authorId, content, likes, comments }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-gray-700">{authorId}</span>
      </div>
      <p className="text-gray-800 mb-4">{content}</p>
      <div className="text-sm text-gray-500 flex gap-4">
        <span>❤️ {likes}</span>
        <span>💬 {comments}</span>
      </div>
    </div>
  );
}
