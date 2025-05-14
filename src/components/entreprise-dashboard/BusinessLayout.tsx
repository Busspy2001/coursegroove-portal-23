
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
          <div className="flex-1">
            <div className="container px-4 py-8 flex-grow">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BusinessLayout;
