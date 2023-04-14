import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Filters from '../../components/filters/filters';

import { useAppDispatch } from '../../hooks';
import useCheckSearchParams from '../../hooks/use-check-search-params';
import { fetchAllCameraAction } from '../../store/api-actions/api-actions';
import { setCurrentParams } from '../../store/app-process/app-process';
import BasketModal from '../../components/basket-modal/basket-modal';
import { selectCamera } from '../../store/order-process/order-process';

import { ModalType } from '../../const/modal-type';
import BasketInfoModal from '../../components/basket-info-modal/basket-info-modal';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [isModalAddCameraToBasketOpen, setModalAddCameraToBasketOpen] = useState<boolean>(false);
  const [isModalSuccessAddedCameraToBasketOpen, setModalSuccessAddedCameraToBasketOpen] = useState<boolean>(false);

  const handleAddCameraToBasketButtonClick = () => {
    setModalAddCameraToBasketOpen(true);
  };

  const closeAddCameraToBasketModal = () => {
    setModalAddCameraToBasketOpen(false);
    dispatch(selectCamera(null));
  };

  const handleOpenSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(false);
  };

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
              <Catalog onAddCameraInBasketClickButton={handleAddCameraToBasketButtonClick}/>
            </div>
          </div>
        </section>
      </div>
      {isModalAddCameraToBasketOpen &&
        <BasketModal
          modalType={ModalType.AddCameraInBasket}
          onCloseModal={closeAddCameraToBasketModal}
          onOpenSuccessModal={handleOpenSuccessModal}
        />}
      {isModalSuccessAddedCameraToBasketOpen &&
        <BasketInfoModal
          modalType={ModalType.CameraAddedToBasket}
          onCloseModal={handleCloseSuccessModal}
        />}
    </main>
  );
}

export default MainPage;
