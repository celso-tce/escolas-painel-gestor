import { Categoria, Escola } from "escolas-shared";
import React from "react";
import { ApiServiceContext } from "../../pages/_app";

function useCategoriasTitulos(): [Categoria[] | undefined, () => void] {
  const [categoriasTitulos, setCategoriasTitulos] = React.useState<Categoria[]>();

  const apiService = React.useContext(ApiServiceContext);

  const loadCategoriasTitulos = React.useCallback(() => {
    apiService.getCategoriasTitulos().then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      setCategoriasTitulos(result.payload);
    });
  }, [apiService]);

  return [categoriasTitulos, loadCategoriasTitulos];
}

function useEscolasNomes(): [Escola[] | undefined, () => void] {
  const [escolasNomes, setEscolasNomes] = React.useState<Escola[]>();

  const apiService = React.useContext(ApiServiceContext);

  const loadEscolasNomes = React.useCallback(() => {
    apiService.getEscolasNomes().then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      setEscolasNomes(result.payload);
    });
  }, [apiService]);

  return [escolasNomes, loadEscolasNomes];
}

export const Hooks = {
  useCategoriasTitulos,
  useEscolasNomes,
};
