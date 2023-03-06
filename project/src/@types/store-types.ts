import { FetchStatus } from '../const/fetch-status';
import { store } from '../store/index';
import { Camera, Cameras, Promo } from './camera-types';
import { ReviewsRaw } from './review-types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogData = {
  cameras: Cameras;
  promo: Promo;
  isLoading: boolean;
}

export type ProductData = {
  camera: Camera;
  similarCameras: Cameras;
  fetchStatus: FetchStatus;
}

export type BasketData = {
  inBasket: boolean;
}

export type ReviewData = {
  reviews: ReviewsRaw;
  isSuccess: boolean;
  isSending: boolean;
  isLoading: boolean;
}
