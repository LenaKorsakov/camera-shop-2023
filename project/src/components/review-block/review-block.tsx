import { memo, useState } from 'react';

import ButtonToTop from '../button-to-top/button-to-top';
import ReviewModal from '../review-modal/review-modal';
import ReviewsList from './review-list';

import { useAppSelector } from '../../hooks';
import { getSortedReviews } from '../../store/product-process/product-data-selectors';

function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(getSortedReviews);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNewReviewButtonClick = () => setIsOpen(true);

  return (
    <>
      <section className="review-block">
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
          {reviews.length > 0 && <ReviewsList reviews={reviews}/>}
        </div>

      </section>
      <ButtonToTop />
      {isOpen && <ReviewModal setIsOpen={setIsOpen}/>}
    </>
  );
}

export default memo(ReviewBlock);
