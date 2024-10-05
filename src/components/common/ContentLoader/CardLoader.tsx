import React from "react";

// Components
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-white border rounded-lg shadow-md w-64">
      {/* Title Skeleton */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Text Skeletons */}
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export default CardSkeleton;
