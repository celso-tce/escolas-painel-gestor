import { Escola } from "escolas-shared";
import React from 'react';
import ReactSelect, { SingleValue } from "react-select";
import { SelectUtils, StatusOptionType, TipoOptionType } from "../../lib/ui-utils";
import { Utils } from "../../lib/utils";
import ResourceTable, { BasicResourceTableProps } from "../resources/ResourceTable";
import FormItem from "../ui/forms/FormItem";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";
import EscolaStatus from "./EscolaStatus";

type EscolaTableProps = BasicResourceTableProps<Escola>;

const statusOptions = [
  { value: undefined, label: '(Todas)' },
  ...SelectUtils.statusOptions,
];

const tipoOptions = [
  { value: undefined, label: 'Todos' },
  ...SelectUtils.tipoOptions,
];

const EscolaTable: React.FC<EscolaTableProps> = (props) => {
  const [filterNome, setFilterNome] = React.useState('');

  const [filterStatusOption, setFilterStatusOption] =
    React.useState<SingleValue<StatusOptionType>>(statusOptions[1]); // default = "Ativa"

  const [filterTipoOption, setFilterTipoOption] =
    React.useState<SingleValue<TipoOptionType>>(tipoOptions[0]);

  return (
    <ResourceTable
      {...props}
      headerCols={[
        { label: 'Nome' },
        { label: 'Tipo' },
        { label: 'Status' },
        { label: 'Modalidade' },
        { label: 'Diretor' },
      ]}
      generateCols={(res) => [
        { content: res.nome },
        { content: Utils.escolaTipoLabel(res.tipo) },
        { content: <EscolaStatus status={res.status} /> },
        { content: res.modalidades },
        { content: res.diretorNome },
      ]}
      applyFilter={(escolas) => {
        const filterStatus = filterStatusOption?.value;
        const filterNomeLower = filterNome.trim().toLowerCase();
        const filterTipo = filterTipoOption?.value;

        const hasFilterStatus = filterStatus !== undefined;
        const hasFilterNomeLower = filterNomeLower ? true : false;
        const hasFilterTipo = filterTipo !== undefined;

        if (!hasFilterStatus && !hasFilterNomeLower && !hasFilterTipo)
          return escolas;

        return escolas.filter((escola) => {
          let pass = true;

          if (hasFilterStatus)
            pass &&= escola.status === filterStatus;

          if (hasFilterNomeLower)
            pass &&= escola.nome.toLocaleLowerCase().includes(filterNomeLower);

          if (hasFilterTipo)
            pass &&= escola.tipo === filterTipo;

          return pass;
        });
      }}
      filtersContent={(<>
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
      </>)}
    />
  );
};

export default React.memo(EscolaTable);
