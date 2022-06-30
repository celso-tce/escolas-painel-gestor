import React from 'react';
import { Escola } from "escolas-shared";
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
import EscolaStatus from "./EscolaStatus";
import { Utils } from "../../lib/utils";

type EscolasTableProps = {
  escolas: Escola[];
  onClickShowEscola: (escola: Escola) => void;
  onClickEditarEscola: (escola: Escola) => void;
  onClickDeletarEscola: (escola: Escola) => void;
};

const statusOptions = [
  { value: undefined, label: '(Todas)' },
  ...SelectUtils.statusOptions,
];

const tipoOptions = [
  { value: undefined, label: 'Todos' },
  ...SelectUtils.tipoOptions,
]

const EscolasTable: React.FC<EscolasTableProps> = ({
  escolas,
  onClickShowEscola,
  onClickEditarEscola,
  onClickDeletarEscola,
}) => {
  const [filterNome, setFilterNome] = React.useState('');

  const [filterStatusOption, setFilterStatusOption] =
    React.useState<SingleValue<StatusOptionType>>(statusOptions[1]); // default = "Ativa"

  const [filterTipoOption, setFilterTipoOption] =
    React.useState<SingleValue<TipoOptionType>>(tipoOptions[0]);

  const escolasSorted = React.useMemo(() => {
    return escolas.sort((escolaA, escolaB) => {
      return escolaB.id - escolaA.id;
    });
  }, [escolas]);

  const escolasFiltered = React.useMemo(() => {
    const filterStatus = filterStatusOption?.value;
    const filterNomeLower = filterNome.trim().toLowerCase();
    const filterTipo = filterTipoOption?.value;

    const hasFilterStatus = filterStatus !== undefined;
    const hasFilterNomeLower = filterNomeLower ? true : false;
    const hasFilterTipo = filterTipo !== undefined;

    if (!hasFilterStatus && !hasFilterNomeLower && !hasFilterTipo)
      return escolasSorted;

    return escolasSorted.filter((escola) => {
      let pass = true;

      if (hasFilterStatus)
        pass &&= escola.status === filterStatus;

      if (hasFilterNomeLower)
        pass &&= escola.nome.toLocaleLowerCase().includes(filterNomeLower);

      if (hasFilterTipo)
        pass &&= escola.tipo === filterTipo;

      return pass;
    });
  }, [escolasSorted, filterNome, filterStatusOption, filterTipoOption]);

  const rows: SimpleTableRows = React.useMemo(() => {
    return escolasFiltered.map((escola) => {
      const opcoes = (
        <div className="flex space-x-1">
          <Button
            onClick={() => onClickShowEscola(escola)}
            color="primary"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faEye} fixedWidth />
          </Button>
          <Button
            onClick={() => onClickEditarEscola(escola)}
            color="info"
            noPadding
            className="px-2 py-1"
          >
            <FontAwesomeIcon icon={faPencil} fixedWidth />
          </Button>
          <Button
            onClick={() => onClickDeletarEscola(escola)}
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
          { content: escola.id },
          { content: escola.nome },
          { content: Utils.escolaTipoLabel(escola.tipo) },
          { content: <EscolaStatus status={escola.status} /> },
          { content: escola.modalidades },
          { content: escola.diretorNome },
          { content: opcoes },
        ],
      };
    });
  }, [escolasFiltered, onClickEditarEscola]);

  return (<>
    <div className="flex flex-wrap pt-2 border-t border-b border-slate-200">
      <FormItem className="lg:w-3/12 px-4">
        <Label label="Pesquisar" htmlFor="filter-busca" />
        {React.useMemo(() => (
          <Input
            htmlId="filter-busca"
            placeholder="Nome da escola..."
            value={filterNome}
            onChange={setFilterNome}
            debounceTimeMs={250}
          />
        ), [filterNome])}
      </FormItem>

      <FormItem className="lg:w-3/12 px-4">
        <Label label="Status" htmlFor="filter-status" />
        {React.useMemo(() => (
          <ReactSelect
            id="filter-status"
            options={statusOptions}
            value={filterStatusOption}
            onChange={(newValue) => setFilterStatusOption(newValue)}
          />
        ), [filterStatusOption])}
      </FormItem>

      <FormItem className="lg:w-3/12 px-4">
        <Label label="Tipo" htmlFor="filter-tipo" />
        {React.useMemo(() => (
          <ReactSelect
            id="filter-tipo"
            options={tipoOptions}
            value={filterTipoOption}
            onChange={(newValue) => setFilterTipoOption(newValue)}
          />
        ), [filterTipoOption])}
      </FormItem>
    </div>

    {React.useMemo(() => (
      <SimpleTable
        headerClasses="text-xs"
        colClasses="text-xs font-medium"
        header={[
          { label: '#' },
          { label: 'Nome' },
          { label: 'Tipo' },
          { label: 'Status' },
          { label: 'Modalidade' },
          { label: 'Diretor' },
          { label: 'Opções' },
        ]}
        rows={rows}
      />
    ), [rows])}
  </>);
};

export default React.memo(EscolasTable);
