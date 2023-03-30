import { useEffect, useState } from 'react';

import ReviewItem from './review-item';

import { ContentPerItem } from '../../../const/content-per-item';

import { ReviewsAdapt } from '../../../@types/review-types';

type ReviewListProps = {
  reviews: ReviewsAdapt;
  cameraId: number;
}

function ReviewsList({reviews, cameraId}: ReviewListProps): JSX.Element {
  const [reviewAmount, setReviewQty] = useState<number>(ContentPerItem.Review);

  useEffect(() => setReviewQty(ContentPerItem.Review), [cameraId]);

  const visibleReviews = reviews.slice(0, reviewAmount);
  const isButtonVisible = reviewAmount < reviews.length;

  const handleButtonClick = () => setReviewQty((prevState) => prevState + ContentPerItem.Review);

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
