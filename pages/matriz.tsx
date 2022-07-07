import React from 'react';
import PermissionMatrixTable from "../components/misc/PermissionMatrixTable";
import MainLayout from '../components/ui/layouts/MainLayout';
import { defaultPermissionMatrix } from "../lib/escolas/permissions";

type MatrizPageProps = {};


const MatrizPage: React.FC<MatrizPageProps> = (props) => {
  return (
    <MainLayout currentPage="Matriz de Permissões">
      <div className="relative flex flex-wrap pb-8">
        <div className="w-full">
          <div className="text-xl font-bold uppercase text-white mb-4">Matriz de Permissões</div>
        </div>

        <div className="w-full">
          <PermissionMatrixTable permissions={defaultPermissionMatrix} />
        </div>
      </div>
    </MainLayout>
  );
};

export default React.memo(MatrizPage);
