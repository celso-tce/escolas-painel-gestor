import { faFolder, faHome, faMicrochip, faUsers } from '@fortawesome/free-solid-svg-icons';
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
          { url: '/', label: 'Índice', icon: faHome },
        ],
      },
      {
        label: 'Modelos',
        items: [
          { url: '/owners', label: 'Sistemas', icon: faMicrochip },
          { url: '/files', label: 'Arquivos', icon: faFolder },
        ],
      },
      {
        label: 'Administrativo',
        items: [
          { url: '/admins', label: 'Admins', icon: faUsers },
        ],
      }
    ]} />

    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Storage Admin {props.currentPage && (' | ' + props.currentPage)}</title>
    </Head>

    <div className="relative md:ml-64 bg-slate-100 min-h-screen">
      <AdminNavbar />
      <AdminHeader />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {props.children}
        {/* <FooterAdmin /> */}
      </div>
    </div>
  </>);
};

export default React.memo(MainLayout);