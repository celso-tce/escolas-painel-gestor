import React from 'react';

export type SimpleTableRows = Array<{
  classes?: string;
  cols: Array<{
    classes?: string;
    content: React.ReactNode;
  }>;
}>;

type SimpleTableProps = {
  headerClasses?: string;
  tableClasses?: string;
  rowClasses?: string;
  colClasses?: string;
  header?: Array<{
    classes?: string;
    label: string;
  }>;
  rows: SimpleTableRows;
};

const SimpleTable: React.FC<SimpleTableProps> = (props) => {
  const { header, rows, headerClasses, rowClasses, colClasses, tableClasses } = props;
  const extraCss = tableClasses ?? '';

  return (
    <div className="max-w-full overflow-x-auto">
      <table className={`items-center w-full bg-white border-collapse ${extraCss}`}>
        {header && (
          <thead>
            <tr>
              {header.map((item, index) => (
                <th key={index} className={`px-6 py-3 align-middle border border-solid uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100 ${headerClasses ?? ''} ${item.classes ?? ''}`}>
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={`${rowClasses ?? ''} ${row.classes ?? ''}`}>
              {row.cols.map((col, index) => (
                <td key={index} className={`border-t-0 px-6 py-3 align-middle border-l-0 border-r-0 whitespace-nowrap text-slate-700 ${colClasses ?? ''} ${col.classes ?? ''}`}>
                  {col.content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(SimpleTable);
