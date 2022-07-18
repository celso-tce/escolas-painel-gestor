import React from 'react';
import type { NextPage } from 'next';
import MainLayout from '../../components/ui/layouts/MainLayout';
import CardSettings from "../../components/ui/cards/CardSettings";
import Fluxo from "../../components/misc/Fluxo";

const FluxoPage: NextPage = () => {
  const content = (
    <Fluxo />
  );

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
