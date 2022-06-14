import { faFileAlt, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import type { NextPage } from 'next';
import CardSettings from '../components/ui/cards/CardSettings';
import MainLayout from '../components/ui/layouts/MainLayout';
import ModelStat from '../components/ui/stats/ModelStat';
import SimpleTable from '../components/ui/tables/SimpleTable';

const Index: NextPage = () => {
  const leftPanel = (
    <CardSettings header="Teste Header">
      <SimpleTable
        headerClasses="text-xs"
        colClasses="text-xs"
        header={[
          { label: '#' },
          { label: 'Nome' },
          { label: 'Descrição' },
          { label: 'Criado em' },
          { label: 'Atualizado em' },
          { label: 'Opções' },
        ]}
        rows={[
          {
            cols: [
              { content: '1' },
              { content: 's3i' },
              { content: 'Teste descrição' },
              { content: '2022-02-24 10:01' },
              { content: '2022-02-24 10:01' },
              { content: '' },
            ],
          },
        ]}
      />
    </CardSettings>
  );

  const rightPanel = (
    <>
      <ModelStat icon={faFileAlt} label="Arquivos" value="54 cadastros" />
      <ModelStat icon={faMicrochip} label="Sistemas" value="3 cadastros" />
    </>
  );

  return (
    <MainLayout currentPage="Index">
      <div className="relative flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          {leftPanel}
        </div>
        <div className="w-full lg:w-4/12 px-4">
          {rightPanel}
        </div>
      </div>
    </MainLayout>
  );
}

export default Index;
