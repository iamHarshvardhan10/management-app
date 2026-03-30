import React from "react";
import data from "../../../json/data.json";
import { SectionCards } from "../SectionsCards";
import { DataTable } from "../DataTable";
const DashboardMain = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
        </div>
        <div className="px-6">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
