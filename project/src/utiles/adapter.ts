import { ReviewAdapt, ReviewRaw } from '../@types/review-types';

export const adaptReview = (review: ReviewRaw): ReviewAdapt => ({
  ...review,
  createAt: new Date(review.createAt)
});
