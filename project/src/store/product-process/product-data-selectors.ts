import { createSelector } from 'reselect';

import { Camera, Cameras } from '../../@types/camera-types';
import { ReviewsAdapt, ReviewsRaw } from '../../@types/review-types';
import { State } from '../../@types/store-types';

import { NameSpace } from '../../const/name-space';
import { adaptReview } from '../../utiles/adapter';
import { sortReviewByTime } from '../../utiles/sort-compare';

export const getSelectedCamera = (state: State): Camera => state[NameSpace.ProductData].camera;
export const getProductLoadingStatus = (state: State): boolean => state[NameSpace.ProductData].isLoading;
export const getSimilarCameras = (state: State): Cameras => state[NameSpace.ProductData].similarCameras;
const getReviewsRaw = (state: State): ReviewsRaw => state[NameSpace.ProductData].reviews;

const getAdaptedReviews = createSelector(getReviewsRaw, (reviews: ReviewsRaw) => reviews.map(adaptReview));
export const getSortedReviews = createSelector(getAdaptedReviews, (reviews: ReviewsAdapt) => reviews.sort(sortReviewByTime));
