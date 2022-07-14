import type { NextPage } from 'next';
import MainLayout from "../components/ui/layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout currentPage="Início">
      <div className="relative"></div>
    </MainLayout>
  );
};

export default Home;
