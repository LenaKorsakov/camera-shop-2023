import { memo, useRef } from 'react';

import ReviewForm from '../review-form/review-form';
import SuccessModal from './success-modal/success-modal';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useDisableBackground } from '../../hooks/use-disable-background';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import { getSuccessStatus } from '../../store/review-process/review-data-selectors';
import { fetchCameraByIdAction } from '../../store/api-actions/api-actions';

type ReviewModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cameraId: number;
}

function ReviewModal({ setIsOpen, cameraId }: ReviewModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleModalClose = () => {

    dispatch(fetchCameraByIdAction(cameraId)).unwrap().then(
      () => {
        setIsOpen(false);
      }
    );
  };

  const handleButtonCloseClick = () => handleModalClose();

  const modalRef = useRef(null);
  const isReviewSendSuccess = useAppSelector(getSuccessStatus);

  useOnClickOutside(modalRef, handleModalClose);
  useDisableBackground();
  useKeydownEscClose(handleModalClose);

  return(
    <div className={`modal is-active ${isReviewSendSuccess ? 'modal--narrow' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"/>
        <div
          className="modal__content"
          ref={modalRef}
        >
          {isReviewSendSuccess ? <SuccessModal cameraId={cameraId} onModalClose={handleModalClose}/> : <ReviewForm cameraId={cameraId}/>}
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
export default memo(ReviewModal);
