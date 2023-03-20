import { memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Filters from '../../components/filters/filters';
import { useAppDispatch } from '../../hooks';
import useCheckSearchParams from '../../hooks/use-check-search-params';
import { fetchAllCameraAction } from '../../store/api-actions/api-actions';
import { setCurrentParams } from '../../store/app-process/app-process';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useCheckSearchParams();

  useEffect(() => {
    dispatch(setCurrentParams(searchParams.toString()));
    dispatch(fetchAllCameraAction());
  }, [dispatch, searchParams]);

  return (
    <main>
      <Banner/>
      <div className="page-content">
        <Breadcrumbs
          isCatalogActive
          isProductPage={false}
        />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <Filters />
              <Catalog />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default memo(MainPage);
