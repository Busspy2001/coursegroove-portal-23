
import React, { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/Footer";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <div className="flex flex-1">
          <AdminSidebar />
          <div className="flex-1">
            <div className="container px-4 py-8 flex-grow">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
