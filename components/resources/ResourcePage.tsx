import React from 'react';
import CardSettings from '../../components/ui/cards/CardSettings';
import MainLayout from '../../components/ui/layouts/MainLayout';
import Spinkit from '../../components/ui/Spinkit';
import Modal from "../../components/ui/modal/Modal";
import Button from "../../components/ui/buttons/Button";
import { BasicResourceTableProps } from "./ResourceTable";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AsyncHttpResult, BasicModel } from "../../lib/types";
import { BasicResourceFormProps } from "./ResourceForm";

type ResourcesPageProps<TModel extends BasicModel, TFormData> = {
  serviceProvider: {
    getResources: () => AsyncHttpResult<TModel[]>;
    createResource: (data: TFormData) => AsyncHttpResult<void>;
    updateResource: (id: number, data: TFormData) => AsyncHttpResult<TModel>;
    deleteResource: (id: number) => AsyncHttpResult<void>;
  };
  labelSingular: string;
  labelPlural: string;
  getResourceTitle: (resource: TModel) => string;
  buildTabela: (props: BasicResourceTableProps<TModel>) => React.ReactNode;
  buildDetails: (resource: TModel) => React.ReactNode;
  buildForm: (props: BasicResourceFormProps<TModel, TFormData>) => React.ReactNode;
};

function ResourcesPage<TModel extends BasicModel, TFormData>({
  serviceProvider,
  labelSingular,
  labelPlural,
  getResourceTitle,
  buildTabela,
  buildDetails,
  buildForm,
}: ResourcesPageProps<TModel, TFormData>): React.ReactElement {
  //:: State ---------------------------------------------------------------------------------------

  const [resources, setResources] = React.useState<TModel[] | null>(null);

  // tipo: TModel = editar resource; null = cadastrar novo resource; undefined = modal fechado
  const [showModalResourceForm, setShowModalResourceForm] =
    React.useState<TModel | null | undefined>();

  const [showModalResourceDetails, setShowModalResourceDetails] =
    React.useState<TModel| undefined>();

  const MySwal = withReactContent(Swal);

  //:: Effects -------------------------------------------------------------------------------------

  React.useEffect(() => {
    let mounted = true;

    serviceProvider.getResources().then((result) => {
      if (!mounted)
        return;

      if (result.type === 'error')
        return; // TODO erro ao listar resources

      setResources(result.payload);
    });

    return () => { mounted = false };
  }, [serviceProvider]);

  const onSubmitResourceForm = React.useCallback((formData: TFormData) => {
    setShowModalResourceForm(undefined); // <- fecha o modal
    setResources(null); // <- faz com que a tabela de categorias fique em "carregamento"

    const promise = showModalResourceForm
      ? serviceProvider.updateResource(showModalResourceForm.id, formData)
      : serviceProvider.createResource(formData);

    promise.then((result) => {
      if (result.type === 'error')
        throw result;

      serviceProvider.getResources().then((result) => {
        if (result.type === 'error')
          throw result;

        setResources(result.payload);

        MySwal.fire(
          'Sucesso',
          `${showModalResourceForm ? 'Edição' : 'Cadastro'} realizado com sucesso.`,
          'success',
        );
      });
    }).catch((err) => {
      // TODO Swal erro ao cadastrar/editar resources
      console.error(err);
      setResources(resources); // volta para o estado que estava antes de nulificar acima
    });
  }, [showModalResourceForm, resources, serviceProvider, MySwal]);

  const onDeleteResource = React.useCallback((resource: TModel) => {
    MySwal.fire({
      title: `Deletar ${labelSingular}`,
      text: 'Tem certeza que deseja excluir este registro permanentemente? '
        + '(' + getResourceTitle(resource) + ')',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setResources(null);

        serviceProvider.deleteResource(resource.id).then((result) => {
          if (result.type === 'error')
            throw result;

          serviceProvider.getResources().then((result) => {
            if (result.type === 'error')
              throw result;

            setResources(result.payload);

            Swal.fire(
              'Sucesso!',
              'Exclusão realizada com sucesso.',
              'success',
            );
          });
        }).catch((err) => {
          // TODO Swal erro ao deletar resource
          console.error(err);
          setResources(resources); // volta para o estado que estava antes de nulificar acima
        });
      }
    });
  }, [MySwal, getResourceTitle, labelSingular, resources, serviceProvider]);

  //:: Result --------------------------------------------------------------------------------------

  const content = React.useMemo(() => {
    if (resources === null) {
      return (
        <div className="flex flex-col items-center my-2 text-slate-700">
          <Spinkit type="wave" color="var(--color-blue-400)" dots={5} />
          Carregando...
        </div>
      );
    }

    return buildTabela({
      resources: resources,
      onClickShowResource: setShowModalResourceDetails,
      onClickEditarResource: setShowModalResourceForm,
      onClickDeletarResource: onDeleteResource,
    });
  }, [resources, buildTabela, onDeleteResource]);

  const modalCadastrar = React.useMemo(() => {
    return showModalResourceForm !== undefined && (
      <Modal
        titulo={showModalResourceForm === null
            ? ('Cadastrar ' + labelSingular)
            : ('Editar ' + labelSingular)}
        visible={showModalResourceForm !== undefined}
        onClose={() => setShowModalResourceForm(undefined)}
        disableBackgroundFechar
        hideBotaoFechar={true}
        noOverflowHidden
      >
        {buildForm({
          editResource: showModalResourceForm,
          onCancelar: () => setShowModalResourceForm(undefined),
          onSubmit: onSubmitResourceForm,
        })}
      </Modal>
    );
  }, [showModalResourceForm, onSubmitResourceForm, buildForm, labelSingular]);

  const modalDetails = React.useMemo(() => {
    return showModalResourceDetails !== undefined && (
      <Modal
        titulo="Detalhes"
        visible={true}
        onClose={() => setShowModalResourceDetails(undefined)}
        hideBotaoFechar={true}
        noOverflowHidden
      >
        {buildDetails(showModalResourceDetails)}
      </Modal>
    );
  }, [showModalResourceDetails, buildDetails]);

  return (
    <MainLayout currentPage="Index">
      <div className="relative">
        <CardSettings header={labelPlural}>
          {content}
        </CardSettings>

        <div className="mt-4">
          <Button color="success" onClick={() => setShowModalResourceForm(null)}>
            Cadastrar {labelSingular}
          </Button>
        </div>
      </div>

      {modalCadastrar}
      {modalDetails}
    </MainLayout>
  );
}

export default ResourcesPage;
