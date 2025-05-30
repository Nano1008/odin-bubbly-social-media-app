import Image from "next/image";
import Link from "next/link";

export default function User({ id, profilePicture, name, username }) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  return (
    <div className="flex items-center gap-3">
      <Image
        width={40}
        height={40}
        src={profilePicture}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <Link href={`/profile/${id}`}>
        <span className="font-semibold text-gray-700">{name || username}</span>
      </Link>
    </div>
  );
}
