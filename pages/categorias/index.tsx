import type { NextPage } from 'next';
import React from 'react';
import { Categoria } from 'escolas-shared';
import { ApiServiceContext } from '../_app';
import ResourcesPage from "../../components/resources/ResourcePage";
import ResourceTable, { BasicResourceTableProps } from "../../components/resources/ResourceTable";
import ResourceDetails from "../../components/resources/ResourceDetails";
import ResourceForm, { BasicResourceFormProps } from "../../components/resources/ResourceForm";
import { CreateCategoriaDto } from "../../lib/services/api-service";
import FormItem from "../../components/ui/forms/FormItem";
import FormSection from "../../components/ui/forms/FormSection";
import Input from "../../components/ui/inputs/Input";
import Label from "../../components/ui/inputs/Label";

const CategoriasPage: NextPage = () => {
  const [filters, setFilters] = React.useState<{
    nome: string;
  }>({
    nome: '',
  });

  const apiService = React.useContext(ApiServiceContext);

  const buildTabela = React.useCallback((props: BasicResourceTableProps<Categoria>) => (
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
        const filterNomeLower = filters.nome.trim().toLowerCase();
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
            value={filters.nome}
            onChange={(nome) => setFilters({ ...filters, nome })}
            debounceTimeMs={250}
          />
        </FormItem>
      )}
    />
  ), [filters]);

  const buildDetails = React.useCallback((res: Categoria) => (
    <ResourceDetails
      data={[
        { label: 'Título', value: res.titulo },
        { label: 'Descrição', value: res.descricao },
      ]}
    />
  ), []);

  const buildForm = React.useCallback(
    (props: BasicResourceFormProps<Categoria, CreateCategoriaDto>) =>
  (
    <ResourceForm
      {...props}
      camposObrigatorios={{
        titulo: { label: 'Título' },
        descricao: { label: 'Descrição' },
      }}
      generateFormData={(parsedValues) => ({
        titulo: parsedValues['titulo'],
        descricao: parsedValues['descricao'],
      })}
      formContent={(<>
        <FormSection header="Informações">
          <FormItem className="lg:w-8/12 px-4">
            <Label label="Título" htmlFor="i-titulo" />
            <Input htmlId="i-titulo" name="titulo" defaultValue={props.editResource?.titulo} />
          </FormItem>

          <FormItem className="lg:w-12/12 px-4">
            <Label label="Descrição (TODO textarea)" htmlFor="i-tipo" />
            <Input htmlId="i-descricao" name="descricao"
              defaultValue={props.editResource?.descricao} />
          </FormItem>
        </FormSection>
      </>)}
    />
  ), []);

  return (
    <ResourcesPage<Categoria, CreateCategoriaDto>
      labelSingular="Categoria"
      labelPlural="Categorias"
      getResourceTitle={(res) => res.titulo}
      serviceProvider={{
        getResources: apiService.getCategorias,
        createResource: apiService.createCategoria,
        updateResource: apiService.updateCategoria,
        deleteResource: apiService.deleteCategoria,
      }}
      buildTabela={buildTabela}
      buildDetails={buildDetails}
      buildForm={buildForm}
    />
  );
}

export default CategoriasPage;
