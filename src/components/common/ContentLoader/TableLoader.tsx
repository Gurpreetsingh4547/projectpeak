import React from "react";

// Components
import { Skeleton } from "@/components/ui/skeleton";

const TableLoader: React.FC = () => {
  return (
    <div className="w-[100%]">
      <div className="border-b h-[30px] flex justify-between">
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
      </div>
      <div className="border bg-gray-200 mt-5 rounded-sm h-[40px] flex justify-between items-center pl-5 pr-5">
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
      </div>

      <div className="border bg-gray-200 mt-5 rounded-sm h-[40px] flex justify-between items-center pl-5 pr-5   ">
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
      </div>

      <div className="border bg-gray-200 mt-5 rounded-sm h-[40px] flex justify-between items-center pl-5 pr-5   ">
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
        <Skeleton className="w-[100px] h-[20px] rounded-sm" />
      </div>
    </div>
  );
};

export default TableLoader;
