import { useRef } from 'react';

import ReviewForm from '../review-form/review-form';
import SuccessModal from './success-modal';

import { useAppSelector } from '../../hooks';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { getSuccessStatus } from '../../store/product-process/product-data-selectors';
import { useDisableBackground } from '../../hooks/use-disable-background';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';

type ReviewModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cameraId: number;
}

function ReviewModal({ setIsOpen, cameraId }: ReviewModalProps): JSX.Element {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonCloseClick = () => closeModal();

  const modalRef = useRef(null);
  const isSuccess = useAppSelector(getSuccessStatus);

  useOnClickOutside(modalRef, closeModal);
  useDisableBackground();
  useKeydownEscClose(closeModal);

  return(
    <div className={`modal is-active ${isSuccess ? 'modal--narrow' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div
          className="modal__content"
          ref={modalRef}
        >
          {isSuccess ? <SuccessModal cameraId={cameraId} onButtonClick={closeModal}/> : <ReviewForm cameraId={cameraId}/>}
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
export default ReviewModal;
