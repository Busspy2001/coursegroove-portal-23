
import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import BusinessSidebar from "./BusinessSidebar";
import { BusinessAuthGuard } from "./BusinessAuthGuard";
import { Outlet } from "react-router-dom";

const BusinessLayout = () => {
  console.log("Rendering BusinessLayout component");
  
  return (
    <BusinessAuthGuard>
      <SidebarProvider>
        <div className="min-h-screen flex flex-col w-full">
          <div className="flex flex-1">
            <BusinessSidebar />
            <div className="flex-1 bg-gray-50 dark:bg-gray-800">
              <div className="container px-4 py-6 md:py-8 flex-grow max-w-7xl mx-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </BusinessAuthGuard>
  );
};

export default BusinessLayout;
