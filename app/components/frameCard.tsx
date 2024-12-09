import React from "react";

interface FrameCardProps {
  imageUrl: string;
  category: string;
  description?: string;
}

const FrameCard: React.FC<FrameCardProps> = ({
  imageUrl,
  category,
  description,
}) => {
  return (
    <div className="w-72 bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      {/* Image Section */}
      <img src={imageUrl} alt={category} className="h-48 w-full object-cover" />

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{category}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default FrameCard;
