
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import EmployeeSidebar from "./EmployeeSidebar";

interface EmployeeLayoutProps {
  children?: ReactNode;
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <div className="flex flex-1">
          <EmployeeSidebar />
          <div className="flex-1 bg-gray-50 dark:bg-gray-800">
            <div className="container px-4 py-6 md:py-8 flex-grow max-w-7xl mx-auto">
              {children || <Outlet />}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeLayout;
