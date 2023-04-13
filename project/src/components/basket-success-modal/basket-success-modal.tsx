import { memo, useRef } from 'react';

import Icon from './icon/icon';
import IconCheckMark from './icon/icon-check-mark';
import GoToBasketButtons from './buttons/go-to-basket-buttons';
import ReturnToCatalogButton from './buttons/return-to-catalog-button';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useDisableBackground } from '../../hooks/use-disable-background';
import { useAppSelector } from '../../hooks';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import { getOrderSendingStatus } from '../../store/order-process/order-process-selectors';

import { ModalType } from '../../const/modal-type';
import { FetchStatus } from '../../const/fetch-status';
import { WarningMessage } from '../../const/warning-message';
import { ModalTitle } from '../../const/modal-title';


type BasketModalProps = {
  onCloseModal: () => void;
  modalType: ModalType;
  isOnProductOrBasketPage?: boolean;
}

function BasketSuccessModal({ onCloseModal, modalType, isOnProductOrBasketPage }: BasketModalProps): JSX.Element {
  const orderSendStatus = useAppSelector(getOrderSendingStatus);

  const isOrderSendSuccess = orderSendStatus === FetchStatus.Success;
  const isOrderSendStatusError = orderSendStatus === FetchStatus.Error;

  const handleModalClose = () => {
    onCloseModal();
  };

  const getModalTitle = () => {
    switch (modalType) {
      case ModalType.CamerasOrdered:
        return isOrderSendStatusError ? WarningMessage.OrderError : ModalTitle.CamerasOrdered;
      case ModalType.CameraAddedToBasket:
        return ModalTitle.CameraAddedToBasket;
    }
  };

  const modalTitle = getModalTitle();

  const getButtons = () => {
    switch (modalType) {
      case ModalType.CamerasOrdered:
        return <ReturnToCatalogButton onCloseModal={handleModalClose} isOnProductOrBasketPage={isOnProductOrBasketPage}/>;
      case ModalType.CameraAddedToBasket:
        return <GoToBasketButtons onCloseModal={handleModalClose} isOnProductPage={isOnProductOrBasketPage}/>;
    }
  };

  const modalButtons = getButtons();

  const getIcon = () => {
    switch (modalType) {
      case ModalType.CamerasOrdered:
        return <Icon isOrderedSuccessful={isOrderSendSuccess}/>;
      case ModalType.CameraAddedToBasket:
        return <IconCheckMark/>;
    }
  };

  const modalIcon = getIcon();

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, handleModalClose);
  useDisableBackground();
  useKeydownEscClose(handleModalClose);

  return(
    <div className="modal is-active modal--narrow" data-testid='success-modal'>
      <div className="modal__wrapper">
        <div className="modal__overlay"/>
        <div
          className="modal__content"
          ref={modalRef}
        >
          <p className="title title--h4">
            {modalTitle}
          </p>
          {modalIcon}
          <div className="modal__buttons">
            {modalButtons}
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleModalClose}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default memo(BasketSuccessModal);
