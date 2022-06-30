import type { NextPage } from 'next';
import React from 'react';
import { Escola } from 'escolas-shared';
import CardSettings from '../../components/ui/cards/CardSettings';
import MainLayout from '../../components/ui/layouts/MainLayout';
import { ApiServiceContext } from '../_app';
import Spinkit from '../../components/ui/Spinkit';
import EscolasTable from "../../components/escolas/EscolasTable";
import Modal from "../../components/ui/modal/Modal";
import EscolaForm, { EscolaFormData } from "../../components/escolas/EscolaForm";
import Button from "../../components/ui/buttons/Button";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EscolaDetails from "../../components/escolas/EscolaDetails";

const EscolasPage: NextPage = () => {
  //:: State ---------------------------------------------------------------------------------------

  const [escolas, setEscolas] = React.useState<Escola[] | null>(null);

  // tipo: Escola = editar Escola; null = cadastrar nova escola; undefined = modal fechado
  const [showModalEscolaForm, setShowModalEscolaForm] =
    React.useState<Escola | null | undefined>();

  const [showModalEscolaDetails, setShowModalEscolaDetails] = React.useState<Escola | undefined>();

  const MySwal = withReactContent(Swal);

  //:: Effects -------------------------------------------------------------------------------------

  const apiService = React.useContext(ApiServiceContext);

  React.useEffect(() => {
    let mounted = true;

    apiService.getEscolas().then((result) => {
      if (!mounted)
        return;

      if (result.type === 'error')
        return; // TODO handle error

      setEscolas(result.payload);
    });

    return () => { mounted = false };
  }, [apiService]);

  const onSubmitEscolaForm = React.useCallback((formData: EscolaFormData) => {
    setShowModalEscolaForm(undefined); // <- fecha o modal
    setEscolas(null); // <- faz com que a tabela de escolas fique em "carregamento"

    const promise = showModalEscolaForm
      ? apiService.updateEscola(showModalEscolaForm.id, formData)
      : apiService.createEscola(formData);

    promise.then((result) => {
      if (result.type === 'error')
        throw result;

      apiService.getEscolas().then((result) => {
        if (result.type === 'error')
          throw result;

        setEscolas(result.payload);

        MySwal.fire(
          'Sucesso',
          `Escola ${showModalEscolaForm ? 'editada' : 'cadastrada'} com sucesso.`,
          'success',
        );
      });
    }).catch((err) => {
      // TODO handle error
      console.error(err);
      setEscolas(escolas); // volta para o estado que estava antes de nulificar mais cedo
    });
  }, [showModalEscolaForm, escolas, apiService, MySwal]);

  const onDeleteEscola = React.useCallback((escola: Escola) => {
    MySwal.fire({
      title: 'Deletar Escola',
      text: 'Tem certeza que deseja excluir este registro permanentemente? ' + escola.nome,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setEscolas(null);

        apiService.deleteEscola(escola.id).then((result) => {
          if (result.type === 'error')
            throw result;

          apiService.getEscolas().then((result) => {
            if (result.type === 'error')
              throw result;

            setEscolas(result.payload);

            Swal.fire(
              'Sucesso!',
              'Registro de Escola excluido com sucesso.',
              'success',
            );
          });
        }).catch((err) => {
          // TODO handle error
          console.error(err);
          setEscolas(escolas);
        });
      }
    });
  }, [MySwal]);

  //:: Result --------------------------------------------------------------------------------------

  const content = React.useMemo(() => {
    if (escolas === null) {
      return (
        <div className="flex flex-col items-center my-2 text-slate-700">
          <Spinkit type="wave" color="var(--color-blue-400)" dots={5} />
          Carregando...
        </div>
      );
    }

    return (
      <EscolasTable
        escolas={escolas}
        onClickShowEscola={setShowModalEscolaDetails}
        onClickEditarEscola={setShowModalEscolaForm}
        onClickDeletarEscola={onDeleteEscola}
      />
    );
  }, [escolas, setShowModalEscolaForm]);

  const modalCadastrar = React.useMemo(() => {
    return showModalEscolaForm !== undefined && (
      <Modal
        titulo={showModalEscolaForm === null ? 'Cadastrar Escola' : 'Editar Escola'}
        visible={showModalEscolaForm !== undefined}
        onClose={() => setShowModalEscolaForm(undefined)}
        disableBackgroundFechar
        hideBotaoFechar={true}
      >
        <EscolaForm
          editEscola={showModalEscolaForm}
          onCancelar={() => setShowModalEscolaForm(undefined)}
          onSubmit={onSubmitEscolaForm}
        />
      </Modal>
    );
  }, [showModalEscolaForm, onSubmitEscolaForm]);

  const modalDetails = React.useMemo(() => {
    return showModalEscolaDetails !== undefined && (
      <Modal
        titulo="Detalhes da Escola"
        visible={true}
        onClose={() => setShowModalEscolaDetails(undefined)}
        hideBotaoFechar={true}
      >
        <EscolaDetails escola={showModalEscolaDetails} />
      </Modal>
    );
  }, [showModalEscolaDetails]);

  return (
    <MainLayout currentPage="Index">
      <div className="relative">
        <CardSettings header="Escolas">
          {content}
        </CardSettings>

        <div className="mt-4">
          <Button color="success" onClick={() => setShowModalEscolaForm(null)}>
            Cadastrar Escola
          </Button>
        </div>
      </div>

      {modalCadastrar}
      {modalDetails}
    </MainLayout>
  );
}

export default EscolasPage;
