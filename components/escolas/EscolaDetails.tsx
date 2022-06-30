import { Escola } from "escolas-shared";
import React from 'react';
import { Utils } from "../../lib/utils";
import SimpleTable from "../ui/tables/SimpleTable";
import EscolaStatus from "./EscolaStatus";

type EscolaDetailsProps = {
  escola: Escola;
};

const EscolaDetails: React.FC<EscolaDetailsProps> = ({ escola }) => {
  return (
    <div className="px-4 mb-4">
      <SimpleTable
        tableClasses="w-auto"
        rowClasses="hover:bg-slate-100"
        colClasses="px-2 py-2"
        rows={[
          {cols: [
            { content: 'Nome', classes: 'font-bold' },
            { content: escola.nome },
          ]},
          {cols: [
            { content: 'Tipo', classes: 'font-bold' },
            { content: Utils.escolaTipoLabel(escola.tipo) },
          ]},
          {cols: [
            { content: 'Status', classes: 'font-bold' },
            { content: escola.status },
          ]},
          {cols: [
            { content: 'Modalidades', classes: 'font-bold' },
            { content: escola.modalidades },
          ]},
          {cols: [
            { content: 'Nome do Diretor', classes: 'font-bold' },
            { content: escola.diretorNome },
          ]},
          {cols: [
            { content: 'E-mail do Diretor', classes: 'font-bold' },
            { content: escola.diretorEmail },
          ]},
          {cols: [
            { content: 'QEdu', classes: 'font-bold' },
            { content: escola.qeduUrl },
          ]},
          {cols: [
            { content: 'CEP', classes: 'font-bold' },
            { content: escola.postalCode },
          ]},
          {cols: [
            { content: 'Endereço', classes: 'font-bold' },
            { content: escola.endereco },
          ]},
          {cols: [
            { content: 'Complemento', classes: 'font-bold' },
            { content: escola.complemento },
          ]},
          {cols: [
            { content: 'Cidade', classes: 'font-bold' },
            { content: escola.cidade },
          ]},
          {cols: [
            { content: 'Bairro', classes: 'font-bold' },
            { content: escola.bairro },
          ]},
        ]}
      />
    </div>
  );
};

export default React.memo(EscolaDetails);
