import React from "react";

interface SkeletonLoaderProps {
  count: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count,className }) => {
  return (
    <div className={`flex space-x-4 overflow-hidden ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="flex-shrink-0">
          <div className="w-60 h-80 bg-black-20 rounded-lg animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
