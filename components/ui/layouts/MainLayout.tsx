import { faHome, faUsers, faSchool, faListAlt, faBell, faWarning } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import React from 'react';
import FooterAdmin from '../footers/FooterAdmin';
import AdminHeader from '../headers/AdminHeader';
import AdminNavbar from '../navbars/AdminNavbar';
import Sidebar from '../navbars/Sidebar';

type MainLayoutProps = {
  currentPage?: string;
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (<>
    <Sidebar projectTitle="TCE nas Escolas" navbarGroups={[
      {
        label: 'Dashboard',
        items: [
          { url: '/home', label: 'Início', icon: faHome },
          { url: '/ocorrencias', label: 'Visão Geral', icon: faListAlt },
        ],
      },
      {
        label: 'Tarefas',
        items: [
          {
            url: '/ocorrencias/novas',
            label: 'Novas',
            icon: faWarning,
            roles: ['OUVIDORIA'],
          },
          {
            url: '/ocorrencias/em-analise',
            label: 'Em Análise',
            icon: faWarning,
            roles: ['INSPETORIA'],
          },
          {
            url: '/ocorrencias/recebidas',
            label: 'Recebidas',
            icon: faWarning,
            roles: ['GESTOR'],
          },
          {
            url: '/ocorrencias/em-atraso',
            label: 'Em atraso',
            icon: faWarning,
            roles: ['GESTOR'],
          },
          {
            url: '/ocorrencias/fora-do-prazo',
            label: 'Fora do prazo',
            icon: faWarning,
            roles: ['GESTOR'],
          },
          {
            url: '/ocorrencias/respondidas',
            label: 'Respondidas',
            icon: faWarning,
            roles: ['INSPETORIA'],
          },
          {
            url: '/ocorrencias/prorrogacoes-solicitadas',
            label: 'Prorrogações Solicitadas',
            icon: faWarning,
            roles: ['INSPETORIA'],
          },
        ],
      },
      /*{
        label: 'Registro',
        items: [
          {
            url: '/ocorrencias/solucionadas',
            label: 'Ocorrências Solucionadas',
            icon: faBell,
            roles: [],
          },
          {
            url: '/ocorrencias/canceladas',
            label: 'Ocorrências Canceladas',
            icon: faBell,
            roles: ['OUVIDORIA'],
          },
        ],
      },*/
      {
        label: 'Administrativo',
        items: [
          { url: '/escolas', label: 'Escolas', icon: faSchool },
          { url: '/categorias', label: 'Categorias', icon: faListAlt },
          { url: '/users', label: 'Usuários', icon: faUsers },
        ],
      },
    ]} />

    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>TCE nas Escolas {props.currentPage && (' | ' + props.currentPage)}</title>
    </Head>

    <div className="md:ml-64 bg-slate-200 min-h-screen">
      <div className="relative">
        <AdminNavbar currentPage={props.currentPage} />
        <AdminHeader />
      </div>

      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {props.children}
        {/* <FooterAdmin /> */}
      </div>
    </div>
  </>);
};

export default React.memo(MainLayout);
