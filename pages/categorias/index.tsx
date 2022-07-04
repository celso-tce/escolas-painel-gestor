import type { NextPage } from 'next';
import React from 'react';
import { Categoria } from 'escolas-shared';
import { ApiServiceContext } from '../_app';
import ResourcesPage from "../../components/resources/ResourcePage";
import ResourceDetails from "../../components/resources/ResourceDetails";
import { CreateCategoriaDto } from "../../lib/services/api-service";
import CategoriaForm from "../../components/categorias/CategoriaForm";
import CategoriaTable from "../../components/categorias/CategoriaTable";

const CategoriasPage: NextPage = () => {
  const apiService = React.useContext(ApiServiceContext);

  const buildDetails = React.useCallback((res: Categoria) => (
    <ResourceDetails
      data={[
        { label: 'Título', value: res.titulo },
        { label: 'Descrição', value: res.descricao },
      ]}
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
      buildTabela={React.useCallback((props) => <CategoriaTable {...props} />, [])}
      buildDetails={buildDetails}
      buildForm={React.useCallback((props) => <CategoriaForm {...props} />, [])}
    />
  );
}

export default CategoriasPage;
