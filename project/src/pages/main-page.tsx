import Bunner from '../components/banner/banner';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import { useAppSelector } from '../hooks';
import { getAllCameras } from '../store/catalog-process/catalog-process-selectors';
import Catalog from '../components/catalog/catalog';

function MainPage(): JSX.Element {
  const cameras = useAppSelector(getAllCameras);
  //TODO экран Loading

  return (
    <>
      <Header/>
      <main>
        <Bunner/>
        <div className="page-content">
          <Breadcrumbs/>
          <Catalog cameras={cameras}/>
        </div>
      </main>
      <Footer/>
    </>);
}

export default MainPage;
