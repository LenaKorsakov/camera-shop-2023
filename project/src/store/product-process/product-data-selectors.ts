import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/name-space';
import { adaptReview } from '../../utils/adapter';
import { sortReviewByTime } from '../../utils/sort-compare';
import { FetchStatus } from '../../const/fetch-status';

import { Camera, Cameras } from '../../@types/camera-types';
import { State } from '../../@types/store-types';
import { ReviewsAdapt, ReviewsRaw } from '../../@types/review-types';

export const getCurrentCamera = (state: State): Camera => state[NameSpace.ProductData].camera;
export const getProductFetchingStatus = (state: State): FetchStatus => state[NameSpace.ProductData].fetchStatus;
export const getSimilarCameras = (state: State): Cameras => state[NameSpace.ProductData].similarCameras;

const getReviewsRaw = (state: State): ReviewsRaw => state[NameSpace.ProductData].reviews;

const getAdaptedReviews = createSelector(getReviewsRaw, (reviews: ReviewsRaw) => reviews.map(adaptReview));
export const getSortedReviews = createSelector(getAdaptedReviews, (reviews: ReviewsAdapt) => reviews.sort(sortReviewByTime));
