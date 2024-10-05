import React from "react";

// Components
import { Skeleton } from "@/components/ui/skeleton";

/**
 * List Loader Component
 * @returns List Loader
 */
const ListLoader: React.FC = () => {
  return (
    <div className="w-1/2 max-w-md mt-4 space-y-2 px-2">
      {/* Skeleton for the title */}
      <Skeleton className="h-4 w-1/2" />

      {/* Skeleton for the description */}
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default ListLoader;
