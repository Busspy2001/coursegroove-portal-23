
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { NoCompanyMessage } from "./components/NoCompanyMessage";
import { OverviewHeader } from "./components/OverviewHeader";
import { MetricsGrid } from "./components/MetricsGrid";
import { BusinessOverviewTabs } from "./BusinessOverviewTabs";
import { useCompanyData } from "./useCompanyData";

const BusinessOverview = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { loading, companyData, stats } = useCompanyData(currentUser);
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }
  
  if (!companyData) {
    return <NoCompanyMessage />;
  }

  return (
    <div className="space-y-6">
      <OverviewHeader userName={currentUser?.full_name} />
      <MetricsGrid stats={stats} />
      <BusinessOverviewTabs stats={stats} />
    </div>
  );
};

export default BusinessOverview;
