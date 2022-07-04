import React from 'react';
import SimpleTable, { SimpleTableCol, SimpleTableHeaderData, SimpleTableRow } from "../ui/tables/SimpleTable";
import Button from "../ui/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { BasicModel } from "../../lib/types";

export type BasicResourceTableProps<TModel extends BasicModel> = {
  resources: TModel[];
  onClickShowResource?: (resource: TModel) => void;
  onClickEditarResource?: (resource: TModel) => void;
  onClickDeletarResource?: (resource: TModel) => void;
};

export type ExtraResourceTableProps<TModel extends BasicModel> = {
  filtersContent?: React.ReactNode;
  headerCols: SimpleTableHeaderData[];
  generateCols: (res: TModel) => SimpleTableCol[];
  applyFilter: (resources: TModel[]) => TModel[];
};

type ResourceTableProps<TModel extends BasicModel> =
  BasicResourceTableProps<TModel> & ExtraResourceTableProps<TModel>;

function ResourceTable<TModel extends BasicModel>({
  resources,
  onClickShowResource,
  onClickEditarResource,
  onClickDeletarResource,
  filtersContent,
  headerCols,
  generateCols,
  applyFilter,
}: ResourceTableProps<TModel>) {
  const resourcesFiltered = React.useMemo(() => {
    return applyFilter(resources);
  }, [resources, applyFilter]);

  const resourcesSorted = React.useMemo(() => {
    return resourcesFiltered.sort((resA, resB) => {
      return resB.id - resA.id;
    });
  }, [resourcesFiltered]);

  const hasOpcao = onClickShowResource || onClickEditarResource || onClickDeletarResource;

  let header: SimpleTableHeaderData[] = [
    { label: '#' },
    ...headerCols,
  ];

  if (hasOpcao) {
    header.push({ label: 'Opções' });
  }

  const rows: SimpleTableRow[] = React.useMemo(() => {
    return resourcesSorted.map((res) => {
      const opcoes = hasOpcao && (
        <div className="flex space-x-1">
          {onClickShowResource && <Button
            onClick={() => onClickShowResource(res)}
            color="primary"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faEye} fixedWidth />
          </Button>}
          {onClickEditarResource && <Button
            onClick={() => onClickEditarResource(res)}
            color="info"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faPencil} fixedWidth />
          </Button>}
          {onClickDeletarResource && <Button
            onClick={() => onClickDeletarResource(res)}
            color="danger"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth />
          </Button>}
        </div>
      );

      let cols: SimpleTableCol[] = [
        { content: res.id},
        ...generateCols(res),
      ];

      if (hasOpcao) {
        cols.push({ content: opcoes });
      }

      return { cols };
    });
  }, [resourcesSorted, onClickShowResource, onClickEditarResource, onClickDeletarResource]);

  return (<>
    {filtersContent && (
      <div className="flex flex-wrap pt-2 border-t border-b border-slate-200">
        {filtersContent}
      </div>
    )}

    {React.useMemo(() => (
      <SimpleTable
        headerClasses="text-xs"
        colClasses="text-xs font-medium"
        header={header}
        rows={rows}
      />
    ), [rows])}
  </>);
}

export default ResourceTable;
