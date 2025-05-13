
import React from "react";
import { PageTransition } from "../ui/page-transition";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
}
