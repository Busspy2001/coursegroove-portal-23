
import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import BusinessSidebar from "./BusinessSidebar";

interface BusinessLayoutProps {
  children: ReactNode;
}

const BusinessLayout = ({ children }: BusinessLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <div className="flex flex-1">
          <BusinessSidebar />
          <div className="flex-1 bg-gray-50 dark:bg-gray-800">
            <div className="container px-4 py-6 md:py-8 flex-grow max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BusinessLayout;
