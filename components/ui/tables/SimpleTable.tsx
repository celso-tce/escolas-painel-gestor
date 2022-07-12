import React from 'react';

export type SimpleTableHeaderData = {
  label: string;
  classes?: string;
};

export type SimpleTableCol = {
  content: React.ReactNode;
  classes?: string;
  title?: string;
};

export type SimpleTableRow = {
  cols: SimpleTableCol[];
  classes?: string;
};

type SimpleTableProps = {
  headerClasses?: string;
  overrideHeaderClasses?: string;
  tableClasses?: string;
  overrideTableClasses?: string;
  rowClasses?: string;
  overrideRowClasses?: string;
  colClasses?: string;
  overrideColClasses?: string;
  header?: Array<SimpleTableHeaderData>;
  rows: SimpleTableRow[];
};

const SimpleTable: React.FC<SimpleTableProps> = ({
  header,
  rows,
  headerClasses,
  overrideHeaderClasses,
  rowClasses,
  overrideRowClasses,
  colClasses,
  overrideColClasses,
  tableClasses,
  overrideTableClasses,
}) => {
  const tableCss = overrideTableClasses ?? 'items-center w-full bg-white border-collapse';
  const colCss = overrideColClasses ?? 'px-4 py-2 align-middle whitespace-nowrap text-slate-700';
  const rowCss = overrideRowClasses ?? '';
  const headerCss = overrideHeaderClasses ?? 'px-4 py-2 align-middle border border-solid' +
    ' uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50' +
    ' text-slate-500 border-slate-100';

  return (
    <div className="max-w-full overflow-x-auto">
      <table className={`${tableCss} ${tableClasses ?? ''}`}>
        {header && (
          <thead>
            <tr>
              {header.map((item, index) => (
                <th
                  key={index}
                  className={`${headerCss} ${headerClasses ?? ''}
                    ${item.classes ?? ''}`}
                >
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={`${rowCss} ${rowClasses ?? ''} ${row.classes ?? ''}`}>
              {row.cols.map((col, index) => (
                <td
                  key={index}
                  className={`${colCss ?? ''} ${colClasses} ${col.classes ?? ''}`}
                  title={col.title}
                >
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
