import { memo, useRef } from 'react';

import BasketAddItemButtons from './basket-add-item-buttons';
import BasketRemoveItemButtons from './basket-remove-item-buttons copy';
import BasketItemShort from './basket-item-short';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useDisableBackground } from '../../hooks/use-disable-background';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';

import { ModalTitle } from '../../const/modal-title';
import { ModalType } from '../../const/modal-type';

import { useAppSelector } from '../../hooks';
import { getSelectedCamera } from '../../store/order-process/order-process-selectors';

type BasketModalProps = {
  onCloseModal: () => void;
  title: ModalTitle;
  type: ModalType;
}

function BasketModal({ onCloseModal, title, type }: BasketModalProps): JSX.Element {
  const selectedCamera = useAppSelector(getSelectedCamera);

  const closeModal = () => {
    onCloseModal();
  };

  const handleButtonCloseClick = () => closeModal();

  const getButtons = () => {
    if (type === ModalType.RemoveCameraFromBasket && selectedCamera) {
      return <BasketRemoveItemButtons cameraId={selectedCamera.id} onCloseModal={onCloseModal}/>;
    }

    if (type === ModalType.AddCameraInBasket && selectedCamera) {
      return <BasketAddItemButtons camera={selectedCamera} onCloseModal={handleButtonCloseClick}/>;
    }
  };
  const buttons = getButtons();

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, closeModal);
  useDisableBackground();
  useKeydownEscClose(closeModal);

  return(
    <div className="modal is-active" >
      <div className="modal__wrapper">
        <div className="modal__overlay"/>
        <div
          className="modal__content"
          ref={modalRef}
        >
          <p className="title title--h4">{title}</p>
          {selectedCamera && <BasketItemShort camera={selectedCamera} modalType={type}/>}
          <div className="modal__buttons">
            {buttons}
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleButtonCloseClick}
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
