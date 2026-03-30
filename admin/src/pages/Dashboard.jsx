import { AppSidebar } from "@/components/core/AppSidebar";
// import { ChartAreaInteractive } from "@/components/core/ChartsAreaIntercative";
// import { DataTable } from "@/components/core/DataTable";
// import { SectionCards } from "@/components/core/SectionsCards";
import { SiteHeader } from "@/components/core/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import data from "../json/data.json";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* CHILD ROUTES WILL RENDER HERE */}
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
