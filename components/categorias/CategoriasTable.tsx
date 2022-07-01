import React from 'react';
import { Categoria } from "escolas-shared";
import Badge from "../ui/misc/Badge";
import SimpleTable, { SimpleTableRows } from "../ui/tables/SimpleTable";
import FormItem from "../ui/forms/FormItem";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";
import ReactSelect, { SingleValue } from "react-select";
import { SelectUtils, StatusOptionType, TipoOptionType } from "../../lib/ui-utils";
import Button from "../ui/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Utils } from "../../lib/utils";

type CategoriasTableProps = {
  categorias: Categoria[];
  onClickShowCategoria: (categoria: Categoria) => void;
  onClickEditarCategoria: (categoria: Categoria) => void;
  onClickDeletarCategoria: (categoria: Categoria) => void;
};

const statusOptions = [
  { value: undefined, label: '(Todas)' },
  ...SelectUtils.statusOptions,
];

const tipoOptions = [
  { value: undefined, label: 'Todos' },
  ...SelectUtils.tipoOptions,
]

const CategoriasTable: React.FC<CategoriasTableProps> = ({
  categorias,
  onClickShowCategoria,
  onClickEditarCategoria,
  onClickDeletarCategoria,
}) => {
  const [filterNome, setFilterNome] = React.useState('');

  const categoriasSorted = React.useMemo(() => {
    return categorias.sort((categoriaA, categoriaB) => {
      return categoriaB.id - categoriaA.id;
    });
  }, [categorias]);

  const categoriasFiltered = React.useMemo(() => {
    const filterNomeLower = filterNome.trim().toLowerCase();

    const hasFilterNomeLower = filterNomeLower ? true : false;

    if (!hasFilterNomeLower)
      return categoriasSorted;

    return categoriasSorted.filter((categoria) => {
      let pass = true;

      if (hasFilterNomeLower)
        pass &&= categoria.titulo.toLocaleLowerCase().includes(filterNomeLower)
          || categoria.descricao.toLocaleLowerCase().includes(filterNomeLower);

      return pass;
    });
  }, [categoriasSorted, filterNome]);

  const rows: SimpleTableRows = React.useMemo(() => {
    return categoriasFiltered.map((categoria) => {
      const opcoes = (
        <div className="flex space-x-1">
          <Button
            onClick={() => onClickShowCategoria(categoria)}
            color="primary"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faEye} fixedWidth />
          </Button>
          <Button
            onClick={() => onClickEditarCategoria(categoria)}
            color="info"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faPencil} fixedWidth />
          </Button>
          <Button
            onClick={() => onClickDeletarCategoria(categoria)}
            color="danger"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth />
          </Button>
        </div>
      );

      return {
        cols: [
          { content: categoria.id },
          { content: categoria.titulo },
          { content: categoria.descricao },
          { content: opcoes },
        ],
      };
    });
  }, [categoriasFiltered, onClickShowCategoria, onClickEditarCategoria, onClickDeletarCategoria]);

  return (<>
    <div className="flex flex-wrap pt-2 border-t border-b border-slate-200">
      <FormItem className="lg:w-4/12 px-4">
        <Label label="Pesquisar" htmlFor="filter-busca" />
        {React.useMemo(() => (
          <Input
            htmlId="filter-busca"
            placeholder="Pesquisar..."
            value={filterNome}
            onChange={setFilterNome}
            debounceTimeMs={250}
          />
        ), [filterNome])}
      </FormItem>
    </div>

    {React.useMemo(() => (
      <SimpleTable
        headerClasses="text-xs"
        colClasses="text-xs font-medium"
        header={[
          { label: '#' },
          { label: 'Título' },
          { label: 'Descrição' },
          { label: 'Opções' },
        ]}
        rows={rows}
      />
    ), [rows])}
  </>);
};

export default React.memo(CategoriasTable);
