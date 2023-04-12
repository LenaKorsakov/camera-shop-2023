import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ProductContent from '../../components/product-content/product-content';
import BasketModal from '../../components/basket-modal/basket-modal';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarCamerasAction, fetchCameraByIdAction } from '../../store/api-actions/api-actions';
import { getCurrentCamera } from '../../store/product-process/product-data-selectors';
import { selectCamera } from '../../store/order-process/order-process';

import { ModalType } from '../../const/modal-type';
import BasketSuccessModal from '../../components/basket-success-modal/basket-success-modal';

function ProductPage() {
  const dispatch = useAppDispatch();
  const [isModalAddCameraToBasketOpen, setModalAddCameraToBasketOpen] = useState<boolean>(false);
  const [isModalSuccessAddedCameraToBasketOpen, setModalSuccessAddedCameraToBasketOpen] = useState<boolean>(false);

  const handleAddCameraToBasketButtonClick = () => {
    setModalAddCameraToBasketOpen(true);
  };

  const handleCloseAddCameraToBasketModal = () => {
    setModalAddCameraToBasketOpen(false);
    dispatch(selectCamera(null));
  };

  const handleOpenSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(false);
  };

  const { id } = useParams() as { id: string };

  const currentCamera = useAppSelector(getCurrentCamera);

  useEffect(() => {
    if (id) {
      const propId = Number(id);

      dispatch(fetchCameraByIdAction(propId));
      dispatch(fetchSimilarCamerasAction(propId));
    }
  }, [dispatch, id]);


  return (
    <main>
      <ProductContent camera={currentCamera} onAddCameraInBasketButtonClick={handleAddCameraToBasketButtonClick}/>
      {isModalAddCameraToBasketOpen &&
        <BasketModal
          modalType={ModalType.AddCameraInBasket}
          onCloseModal={handleCloseAddCameraToBasketModal}
          onOpenSuccessModal={handleOpenSuccessModal}
        />}
      {isModalSuccessAddedCameraToBasketOpen &&
        <BasketSuccessModal
          modalType={ModalType.CameraAddedToBasket}
          onCloseModal={handleCloseSuccessModal}
          isOnProductPage
        />}
    </main>
  );
}

export default ProductPage;
