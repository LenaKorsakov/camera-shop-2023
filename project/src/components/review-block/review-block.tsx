import { useState } from 'react';

import ReviewItem from './review-item';

import { ReviewsAdapt } from '../../@types/review-types';

type ReviewBlockProps = {
  reviews: ReviewsAdapt;
}

function ReviewBlock({reviews}: ReviewBlockProps): JSX.Element {
  const REVIEWS_PER_PAGE = 3;
  const [reviewQty, setReviewQty] = useState<number>(REVIEWS_PER_PAGE);

  const visibleReviews = reviews.slice(0, reviewQty);
  const isButtonVisible = reviewQty < reviews.length;

  const handleButtonClick = () => setReviewQty((prevState) => prevState + REVIEWS_PER_PAGE);

  return (
    <section className="review-block">
      <div className="container">

        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>

          <button className="btn" type="button">
                Оставить свой отзыв
          </button>

        </div>
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

      </div>
    </section>
  );
}

export default ReviewBlock;
