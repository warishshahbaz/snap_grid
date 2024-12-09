import React from "react";

interface UserCardProps {
  avatarUrl: string;
  name: string;
  summary: string;
  createdDate: string;
}

const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  summary,
  createdDate,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Avatar Section */}
      <div className="flex justify-center mt-4">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
        />
      </div>

      {/* Name Section */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 mt-1">{createdDate}</p>
      </div>

      {/* Summary Section */}
      <div className="mt-4 px-6 py-4">
        <p className="text-gray-600 text-sm">{summary}</p>
      </div>
    </div>
  );
};

export default UserCard;
