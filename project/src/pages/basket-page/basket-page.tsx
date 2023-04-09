import { useState } from 'react';

import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketItem from '../../components/basket-item/basket-item';
import BasketSummary from '../../components/basket-summary/basket-summary';
import EmptyPage from '../empty-page/empty-page';
import BasketModal from '../../components/basket-modal/basket-modal';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCamera } from '../../store/order-process/order-process';
import { getCamerasInTheBasket } from '../../store/order-process/order-process-selectors';

import { WarningMessage } from '../../const/warning-message';
import { ModalType } from '../../const/modal-type';
import BasketModalSuccess from '../../components/basket-modal/basket-modal-success';
//import { Camera, Cameras } from '../../@types/camera-types';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCamerasInTheBasket);

  //получить массив уникальных обьектов
  // const ucameras = cameras.reduce((acc: Cameras, item: Camera) =>
  //   acc.some((camera) => camera.id === item.id)) ? acc : [...acc, item]), []);

  const uniqueCamerasInTheBasket = [...new Set(cameras)];

  const [isModalRemoveCameraFromBasketOpen, setModalRemoveCameraFromBasketOpen] = useState<boolean>(false);
  const [isModalSuccessAddedCameraToBasketOpen, setModalSuccessAddedCameraToBasketOpen] = useState<boolean>(false);

  const handleCloseRemoveCameraFromBasketModal = () => {
    setModalRemoveCameraFromBasketOpen(false);
  };

  const handleRemoveCameraFromBasket = (cameraID: number) => {
    setModalRemoveCameraFromBasketOpen(true);

    const currentCamera = cameras.find((camera) => camera.id === cameraID);
    if (currentCamera) {
      dispatch(selectCamera(currentCamera));
    }
  };

  const handleOpenSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(false);
  };

  return (
    <main>
      <div className="page-content">
        <Breadcrumbs
          isCatalogActive={false}
          isProductPage={false}
        />
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              {uniqueCamerasInTheBasket.length > 0
                ? uniqueCamerasInTheBasket.map((item) => (
                  <BasketItem
                    key={item.id}
                    camera={item}
                    onRemoveCameraFromBasketButtonClick={handleRemoveCameraFromBasket}
                  />
                ))
                : <EmptyPage message={WarningMessage.EmptyBasketMessage}/>}
            </ul>
            <BasketSummary/>
          </div>
        </section>
      </div>
      {isModalRemoveCameraFromBasketOpen &&
      <BasketModal
        onCloseModal={handleCloseRemoveCameraFromBasketModal}
        modalType={ModalType.RemoveCameraFromBasket}
        onOpenSuccessModal={handleOpenSuccessModal}
      />}
      {isModalSuccessAddedCameraToBasketOpen &&
      <BasketModalSuccess
        modalType={ModalType.CamerasOrdered}
        onCloseModal={handleCloseSuccessModal}
      />}
    </main>);
}

export default BasketPage;
