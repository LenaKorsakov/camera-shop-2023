import Bunner from '../components/banner/banner';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import LoadingPage from './loading-page';
import Catalog from '../components/catalog/catalog';

import { useAppSelector } from '../hooks';
import { getAllCameras, getCatalogLoadingStatus } from '../store/catalog-process/catalog-process-selectors';
import { memo } from 'react';

function MainPage(): JSX.Element {
  const cameras = useAppSelector(getAllCameras);
  const isLoading = useAppSelector(getCatalogLoadingStatus);

  return (
    isLoading ? <LoadingPage/> :
      <>
        <Header/>
        <main>
          <Bunner/>
          <div className="page-content">
            <Breadcrumbs
              isCatalogActive
              isProductPage={false}
            />
            <Catalog cameras={cameras}/>
          </div>
        </main>
        <Footer/>
      </>
  );
}

export default memo(MainPage);
