import { useEffect, useRef } from 'react';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import ReviewForm from '../review-form/review-form';

type ReviewModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cameraId: number;
}

function ReviewModal({ setIsOpen, cameraId}: ReviewModalProps): JSX.Element {
  const closeModal = () => {
    setIsOpen(false);

    document.body.style.overflow = 'unset';
  };

  const handleButtonCloseClick = () => closeModal();

  useEffect(() => {
    const handleEventKeydown = (event: KeyboardEvent) => {
      if(event.key?.startsWith('esc')) {
        event.preventDefault();

        closeModal();
      }
    };

    document.addEventListener('keydown', handleEventKeydown);

    return () => document.removeEventListener('keydown', handleEventKeydown);
  });

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, closeModal);

  return(
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div
          className="modal__content"
          ref={modalRef}
        >
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <ReviewForm cameraId={cameraId}/>
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
export default ReviewModal;
