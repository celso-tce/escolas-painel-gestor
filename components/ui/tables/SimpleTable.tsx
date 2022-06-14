import React from 'react';

type SimpleTableProps = {
  headerClasses?: string;
  rowClasses?: string;
  colClasses?: string;
  header?: Array<{
    classes?: string;
    label: string;
  }>;
  rows: Array<{
    classes?: string;
    cols: Array<{
      classes?: string;
      content: React.ReactNode;
    }>;
  }>;
};

const SimpleTable: React.FC<SimpleTableProps> = (props) => {
  const { header, rows, headerClasses, rowClasses, colClasses } = props;

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="items-center w-full bg-white border-collapse">
        {header && (
          <thead>
            <tr>
              {header.map((item, index) => (
                <th key={index} className={`px-6 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100 ${headerClasses ?? ''} ${item.classes ?? ''}`}>
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
                <td key={index} className={`border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-slate-700 ${colClasses ?? ''} ${col.classes ?? ''}`}>
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
