import { useEffect, useState } from 'react';

import ReviewItem from './review-item';

import { REVIEWS_PER_PAGE } from '../../const/const';

import { ReviewsAdapt } from '../../@types/review-types';

type ReviewListProps = {
  reviews: ReviewsAdapt;
  cameraId: number;
}

function ReviewsList({reviews, cameraId}: ReviewListProps): JSX.Element {
  const [reviewQty, setReviewQty] = useState<number>(REVIEWS_PER_PAGE);

  useEffect(() => {
    setReviewQty(REVIEWS_PER_PAGE);
  }, [cameraId]);


  const visibleReviews = reviews.slice(0, reviewQty);
  const isButtonVisible = reviewQty < reviews.length;

  const handleButtonClick = () => setReviewQty((prevState) => prevState + REVIEWS_PER_PAGE);

  return (
    <>
      <ul className="review-block__list">
        {visibleReviews.map((review) => (
          <ReviewItem
            reviewData={review}
            key={review.id}
          />
        ))}
      </ul>

      {isButtonVisible &&
          <div className="review-block__buttons">
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleButtonClick}
            >
              Показать больше отзывов
            </button>
          </div>}
    </>
  );
}

export default ReviewsList;
