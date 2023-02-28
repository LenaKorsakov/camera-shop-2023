import { createSelector } from 'reselect';

import { NameSpace } from '../../const/name-space';
import { adaptReview } from '../../utiles/adapter';
import { sortReviewByTime } from '../../utiles/sort-compare';

import { ReviewsAdapt, ReviewsRaw } from '../../@types/review-types';
import { State } from '../../@types/store-types';

export const getReviewSendingStatus = (state: State): boolean => state[NameSpace.ReviewData].isSending;
export const getSuccessStatus = (state: State): boolean => state[NameSpace.ReviewData].isSuccess;
const getReviewsRaw = (state: State): ReviewsRaw => state[NameSpace.ReviewData].reviews;

const getAdaptedReviews = createSelector(getReviewsRaw, (reviews: ReviewsRaw) => reviews.map(adaptReview));
export const getSortedReviews = createSelector(getAdaptedReviews, (reviews: ReviewsAdapt) => reviews.sort(sortReviewByTime));
