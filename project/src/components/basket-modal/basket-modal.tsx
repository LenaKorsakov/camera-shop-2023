import { memo, useRef } from 'react';

import AddItemButton from './buttons/add-item-buttons';
import RemoveItemButtons from './buttons/remove-item-buttons';
import BasketItemShort from './basket-item-short/basket-item-short';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useDisableBackground } from '../../hooks/use-disable-background';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';

import { ModalTitle } from '../../const/modal-title';
import { ModalType } from '../../const/modal-type';

import { useAppSelector } from '../../hooks';
import { getSelectedCamera } from '../../store/order-process/order-process-selectors';

type BasketModalProps = {
  onCloseModal: () => void;
  onOpenSuccessModal: () => void;
  modalType: ModalType;
}

function BasketModal({ onCloseModal, modalType, onOpenSuccessModal }: BasketModalProps): JSX.Element {
  const selectedCamera = useAppSelector(getSelectedCamera);

  const handleModalCloseClick = () => {
    onCloseModal();
  };

  const modalTitle = ModalTitle[Object.keys(modalType)[0] as keyof typeof ModalTitle];

  const getButtons = () => {
    if (modalType === ModalType.RemoveCameraFromBasket && selectedCamera) {
      return <RemoveItemButtons cameraId={selectedCamera.id} onCloseModal={onCloseModal}/>;
    }

    if (modalType === ModalType.AddCameraInBasket && selectedCamera) {
      return <AddItemButton camera={selectedCamera} onCloseModal={handleModalCloseClick} onOpenSuccessModal={onOpenSuccessModal}/>;
    }
  };
  const buttons = getButtons();

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, handleModalCloseClick);
  useDisableBackground();
  useKeydownEscClose(handleModalCloseClick);

  return(
    <div className="modal is-active" data-testid='basket-modal'>
      <div className="modal__wrapper">
        <div className="modal__overlay"/>
        <div
          className="modal__content"
          ref={modalRef}
        >
          <p className="title title--h4">{modalTitle}</p>
          {selectedCamera && <BasketItemShort camera={selectedCamera} modalType={modalType}/>}
          <div className="modal__buttons">
            {buttons}
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleModalCloseClick}
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
export default memo(BasketModal);
