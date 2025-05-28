import Image from "next/image";

export default function User({ profilePicture, name, username }) {
  console.log(profilePicture, name, username);
  return (
    <div className="flex items-center gap-3">
      <Image
        width={40}
        height={40}
        src={profilePicture}
        alt=""
        className="w-10 h-10 rounded-full"
      />
      <span className="font-semibold text-gray-700">{name || username}</span>
    </div>
  );
}
