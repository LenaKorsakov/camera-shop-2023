import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ProductContent from '../../components/product-content/product-content';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarCamerasAction, fetchCameraByIdAction } from '../../store/api-actions/api-actions';

import { getCurrentCamera } from '../../store/product-process/product-data-selectors';
import BasketModal from '../../components/basket-modal/basket-modal';
import { ModalType } from '../../const/modal-type';
import { ModalTitle } from '../../const/modal-title';

function ProductPage() {
  const dispatch = useAppDispatch();
  const [isModalAddCameraToBasketOpen, setModalAddCameraToBasketOpen] = useState<boolean>(false);

  const handleAddCameraToBasketButtonClick = () => {
    setModalAddCameraToBasketOpen(true);
  };

  const closeAddCameraToBasketModal = () => {
    setModalAddCameraToBasketOpen(false);
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
          type={ModalType.AddCameraInBasket}
          onCloseModal={closeAddCameraToBasketModal}
          title={ModalTitle.AddCameraInBasket}
        />}
    </main>
  );
}

export default ProductPage;
