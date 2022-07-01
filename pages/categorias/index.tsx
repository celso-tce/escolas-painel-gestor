import type { NextPage } from 'next';
import React from 'react';
import { Categoria } from 'escolas-shared';
import CardSettings from '../../components/ui/cards/CardSettings';
import MainLayout from '../../components/ui/layouts/MainLayout';
import { ApiServiceContext } from '../_app';
import Spinkit from '../../components/ui/Spinkit';
import Modal from "../../components/ui/modal/Modal";
import Button from "../../components/ui/buttons/Button";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CategoriaForm, { CategoriaFormData } from "../../components/categorias/CategoriaForm";
import CategoriasTable from "../../components/categorias/CategoriasTable";

const CategoriasPage: NextPage = () => {
  //:: State ---------------------------------------------------------------------------------------

  const [categorias, setCategorias] = React.useState<Categoria[] | null>(null);

  // tipo: Categoria = editar Categoria; null = cadastrar nova categoria; undefined = modal fechado
  const [showModalCategoriaForm, setShowModalCategoriaForm] =
    React.useState<Categoria | null | undefined>();

  const [showModalCategoriaDetails, setShowModalCategoriaDetails] = React.useState<Categoria | undefined>();

  const MySwal = withReactContent(Swal);

  //:: Effects -------------------------------------------------------------------------------------

  const apiService = React.useContext(ApiServiceContext);

  React.useEffect(() => {
    let mounted = true;

    apiService.getCategorias().then((result) => {
      if (!mounted)
        return;

      if (result.type === 'error')
        return; // TODO handle error

      setCategorias(result.payload);
    });

    return () => { mounted = false };
  }, [apiService]);

  const onSubmitCategoriaForm = React.useCallback((formData: CategoriaFormData) => {
    setShowModalCategoriaForm(undefined); // <- fecha o modal
    setCategorias(null); // <- faz com que a tabela de categorias fique em "carregamento"

    const promise = showModalCategoriaForm
      ? apiService.updateCategoria(showModalCategoriaForm.id, formData)
      : apiService.createCategoria(formData);

    promise.then((result) => {
      if (result.type === 'error')
        throw result;

      apiService.getCategorias().then((result) => {
        if (result.type === 'error')
          throw result;

        setCategorias(result.payload);

        MySwal.fire(
          'Sucesso',
          `Categoria ${showModalCategoriaForm ? 'editada' : 'cadastrada'} com sucesso.`,
          'success',
        );
      });
    }).catch((err) => {
      // TODO handle error
      console.error(err);
      setCategorias(categorias); // volta para o estado que estava antes de nulificar mais cedo
    });
  }, [showModalCategoriaForm, categorias, apiService, MySwal]);

  const onDeleteCategoria = React.useCallback((categoria: Categoria) => {
    MySwal.fire({
      title: 'Deletar Categoria',
      text: 'Tem certeza que deseja excluir este registro permanentemente? ' + categoria.titulo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setCategorias(null);

        apiService.deleteCategoria(categoria.id).then((result) => {
          if (result.type === 'error')
            throw result;

          apiService.getCategorias().then((result) => {
            if (result.type === 'error')
              throw result;

            setCategorias(result.payload);

            Swal.fire(
              'Sucesso!',
              'Registro de Categoria excluido com sucesso.',
              'success',
            );
          });
        }).catch((err) => {
          // TODO handle error
          console.error(err);
          setCategorias(categorias);
        });
      }
    });
  }, [MySwal]);

  //:: Result --------------------------------------------------------------------------------------

  const content = React.useMemo(() => {
    if (categorias === null) {
      return (
        <div className="flex flex-col items-center my-2 text-slate-700">
          <Spinkit type="wave" color="var(--color-blue-400)" dots={5} />
          Carregando...
        </div>
      );
    }

    return (
      <CategoriasTable
        categorias={categorias}
        onClickShowCategoria={setShowModalCategoriaDetails}
        onClickEditarCategoria={setShowModalCategoriaForm}
        onClickDeletarCategoria={onDeleteCategoria}
      />
    );
  }, [categorias, setShowModalCategoriaForm]);

  const modalCadastrar = React.useMemo(() => {
    return showModalCategoriaForm !== undefined && (
      <Modal
        titulo={showModalCategoriaForm === null ? 'Cadastrar Categoria' : 'Editar Categoria'}
        visible={showModalCategoriaForm !== undefined}
        onClose={() => setShowModalCategoriaForm(undefined)}
        disableBackgroundFechar
        hideBotaoFechar={true}
      >
        <CategoriaForm
          editCategoria={showModalCategoriaForm}
          onCancelar={() => setShowModalCategoriaForm(undefined)}
          onSubmit={onSubmitCategoriaForm}
        />
      </Modal>
    );
  }, [showModalCategoriaForm, onSubmitCategoriaForm]);

  const modalDetails = React.useMemo(() => {
    return showModalCategoriaDetails !== undefined && (
      <Modal
        titulo="Detalhes da Escola"
        visible={true}
        onClose={() => setShowModalCategoriaDetails(undefined)}
        hideBotaoFechar={true}
      >
        {/* <EscolaDetails escola={showModalCategoriaDetails} /> */}
      </Modal>
    );
  }, [showModalCategoriaDetails]);

  return (
    <MainLayout currentPage="Index">
      <div className="relative">
        <CardSettings header="Categorias">
          {content}
        </CardSettings>

        <div className="mt-4">
          <Button color="success" onClick={() => setShowModalCategoriaForm(null)}>
            Cadastrar Categoria
          </Button>
        </div>
      </div>

      {modalCadastrar}
      {modalDetails}
    </MainLayout>
  );
}

export default CategoriasPage;
