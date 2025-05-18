
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const EmployeeSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-40" />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 col-span-2 rounded-md" />
      </div>
      
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-64 w-full rounded-md" />
    </div>
  );
};
