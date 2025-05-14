
import React, { ReactNode } from "react";
import { PageTransition } from "../ui/page-transition";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
}
