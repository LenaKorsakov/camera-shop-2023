import { memo, useState } from 'react';

import ButtonToTop from '../button-to-top/button-to-top';
import ReviewModal from '../review-modal/review-modal';
import ReviewsList from './review-item/review-list';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSuccessStatus } from '../../store/review-process/review-process';
import { getSortedReviews } from '../../store/product-process/product-data-selectors';

type ReviewBlockProps = {
  cameraId: number;
}

function ReviewBlock({ cameraId }: ReviewBlockProps): JSX.Element {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(getSortedReviews);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNewReviewButtonClick = () => {
    setIsOpen(true);
    dispatch(changeSuccessStatus(false));
  };

  return (
    <>
      <section className="review-block" data-testid="reviewBlock">
        <div className="container">

          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>

            <button
              className="btn"
              type="button"
              onClick={handleNewReviewButtonClick}
            >
            Оставить свой отзыв
            </button>

          </div>
          {reviews.length > 0 && <ReviewsList cameraId={cameraId} reviews={reviews}/>}
        </div>

      </section>
      <ButtonToTop />
      {isOpen && <ReviewModal cameraId={cameraId} setIsOpen={setIsOpen}/>}
    </>
  );
}

export default memo(ReviewBlock);
