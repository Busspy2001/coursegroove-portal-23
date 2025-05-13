
import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container px-4 py-8 flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
