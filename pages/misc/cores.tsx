import React from 'react';
import type { NextPage } from 'next';
import MainLayout from '../../components/ui/layouts/MainLayout';
import { StatusOcorrencia, TipoAndamento } from "escolas-shared/dist/common";
import CardSettings from "../../components/ui/cards/CardSettings";
import OcorrenciaStatus from "../../components/ocorrencias/ocorrencia-status";
import AndamentoTipo, { getTipoCss, getTipoIcon } from "../../components/andamentos/AndamentoTipo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const CoresPage: NextPage = () => {
  const statusOcorrenciaCores = (
    <CardSettings header="Status de Ocorrência" className="h-full">
      <div className="grow flex flex-col px-4 pt-4 bg-white">
        {Object.values(StatusOcorrencia).map((status, index) => (
          <OcorrenciaStatus key={index} status={status} className="font-bold" />
        ))}
      </div>
    </CardSettings>
  );

  const tipoAndamentoCores = (
    <CardSettings header="Tipos de Andamento" className="h-full">
      <div className="grow flex flex-col px-4 pt-4 bg-white">
        {Object.values(TipoAndamento).map((tipo, index) => (
          <div key={index} className="flex items-center">
            <span className={`${getTipoCss(tipo) ?? ''} mr-1`}>
              <FontAwesomeIcon icon={getTipoIcon(tipo) ?? faQuestion} fixedWidth />
            </span>
            <AndamentoTipo tipo={tipo} className="font-bold" />
          </div>
        ))}
      </div>
    </CardSettings>
  );

  return (
    <MainLayout currentPage="Cores">
      <div className="relative flex flex-wrap items-stretch">
        <div className="lg:w-6/12 p-2">{statusOcorrenciaCores}</div>
        <div className="lg:w-6/12 p-2">{tipoAndamentoCores}</div>
      </div>
    </MainLayout>
  );
};

export default CoresPage;
