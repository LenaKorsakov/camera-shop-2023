import { createSelector } from 'reselect';

import { NameSpace } from '../../const/name-space';
import { adaptReview } from '../../utiles/adapter';
import { sortReviewByTime } from '../../utiles/sort-compare';

import { ReviewsAdapt, ReviewsRaw } from '../../@types/review-types';
import { State } from '../../@types/store-types';
import { FetchStatus } from '../../const/fetch-status';

export const getReviewSendingStatus = (state: State): FetchStatus => state[NameSpace.ReviewData].sendingStatus;
export const getSuccessStatus = (state: State): boolean => state[NameSpace.ReviewData].isSendSuccess;
const getReviewsRaw = (state: State): ReviewsRaw => state[NameSpace.ReviewData].reviews;
export const getReviewsLoadingStatus = (state: State): FetchStatus => state[NameSpace.ReviewData].fetchStatus;

const getAdaptedReviews = createSelector(getReviewsRaw, (reviews: ReviewsRaw) => reviews.map(adaptReview));
export const getSortedReviews = createSelector(getAdaptedReviews, (reviews: ReviewsAdapt) => reviews.sort(sortReviewByTime));
