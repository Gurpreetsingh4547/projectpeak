import React from "react";

// Components
import { Skeleton } from "@/components/ui/skeleton";

const PieChartSkeleton: React.FC = () => {
  return (
    <div className="flex justify-around gap-5">
      <div className="border-2 border-gray-300 rounded-lg p-4">
        <Skeleton className="rounded-lg h-48 mb-4" />
        <div className="flex justify-between">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="w-16 h-5 rounded" />
          ))}
        </div>
      </div>

      {/* Pie Chart Loader */}
      <div className="w-60 h-60 relative">
        <Skeleton
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
};

export default PieChartSkeleton;
