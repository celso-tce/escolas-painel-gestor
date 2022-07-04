import React from 'react';
import { BasicModel } from "../../lib/types";
import SimpleTable from "../ui/tables/SimpleTable";

export type ResourceDetailsProps<TModel extends BasicModel> = {
  data: Array<{
    label: string;
    value: React.ReactNode;
  }>;
};

function ResourceDetails<TModel extends BasicModel>({
  data,
}: ResourceDetailsProps<TModel>): React.ReactElement {
  return (
    <div className="px-4 mb-4">
      <SimpleTable
        tableClasses="w-auto"
        rowClasses="hover:bg-slate-100"
        colClasses="px-2 py-2"
        rows={data.map((next) => (
          {
            cols: [
              { content: next.label, classes: 'font-bold' },
              { content: next.value },
            ]
          }
        ))}
      />
    </div>
  );
};

export default ResourceDetails;
