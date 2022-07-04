import { Categoria } from "escolas-shared";
import React from 'react';
import ResourceTable, { BasicResourceTableProps } from "../resources/ResourceTable";
import FormItem from "../ui/forms/FormItem";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";

type CategoriaTableProps = BasicResourceTableProps<Categoria>;

const CategoriaTable: React.FC<CategoriaTableProps> = (props) => {
  const [filterNome, setFilterNome] = React.useState('');

  return (
    <ResourceTable
      {...props}
      headerCols={[
        { label: 'Título' },
        { label: 'Descrição' },
      ]}
      generateCols={(res) => [
        { content: res.titulo },
        { content: res.descricao },
      ]}
      applyFilter={(resources) => {
        const filterNomeLower = filterNome.trim().toLowerCase();
        const hasFilterNomeLower = filterNomeLower ? true : false;

        if (!hasFilterNomeLower)
          return resources;

        return resources.filter((categoria) => {
          let pass = true;

          if (hasFilterNomeLower)
            pass &&= categoria.titulo.toLocaleLowerCase().includes(filterNomeLower)
              || categoria.descricao.toLocaleLowerCase().includes(filterNomeLower);

          return pass;
        });
      }}
      filtersContent={(
        <FormItem className="lg:w-4/12 px-4">
          <Label label="Pesquisar" htmlFor="filter-busca" />
          <Input
            htmlId="filter-busca"
            placeholder="Pesquisar..."
            value={filterNome}
            onChange={setFilterNome}
            debounceTimeMs={250}
          />
        </FormItem>
      )}
    />
  );
};

export default React.memo(CategoriaTable);
