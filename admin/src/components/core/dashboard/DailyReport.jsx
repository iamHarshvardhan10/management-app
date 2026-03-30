import { Button } from "@/components/ui/button";
import { IconFileExcel } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import React from "react";
import { DataTable } from "../DataTable";
import data from "../../../json/data.json";

const DailyReport = () => {
  return (
    <div className="flex flex-1 flex-col px-4 py-4 md:gap-6 md:py-6">
      <div className="flex items-center justify-between">
        <Button>
          <Plus /> Add
        </Button>

        <Button variant="outline">
          <IconFileExcel /> Import Excel
        </Button>
      </div>

      <div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default DailyReport;
