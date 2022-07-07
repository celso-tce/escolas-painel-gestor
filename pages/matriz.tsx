import React from 'react';
import PermissionMatrixTable from "../components/misc/PermissionMatrixTable";
import MainLayout from '../components/ui/layouts/MainLayout';
import { defaultPermissionMatrix } from "../lib/escolas/permissions";

type MatrizPageProps = {};


const MatrizPage: React.FC<MatrizPageProps> = (props) => {
  return (
    <MainLayout currentPage="Matriz de Permissões">
      <div className="relative flex flex-wrap">
        <PermissionMatrixTable permissions={defaultPermissionMatrix} />
      </div>
    </MainLayout>
  );
};

export default React.memo(MatrizPage);
