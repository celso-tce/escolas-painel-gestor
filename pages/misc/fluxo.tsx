import React from 'react';
import type { NextPage } from 'next';
import MainLayout from '../../components/ui/layouts/MainLayout';
import CardSettings from "../../components/ui/cards/CardSettings";
import Fluxo from "../../components/misc/Fluxo";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const FluxoPage: NextPage = () => {
  const MySwal = withReactContent(Swal);

  const content = React.useMemo(() => (
    <Fluxo />
  ), []);

  return (
    <MainLayout currentPage="Fluxo">
      <div className="relative">
        <CardSettings>
          {content}
        </CardSettings>
      </div>
    </MainLayout>
  );
};

export default FluxoPage;
