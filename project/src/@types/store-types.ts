import { store } from '../store/index';

import { FetchStatus } from '../const/fetch-status';
import { SortByOrderServerValue } from '../const/sort-by-order';
import { SortByTypeServerValue } from '../const/sort-by-type';
import { QueryKey } from '../const/query-key';

import { Camera, Cameras, Promo } from './camera-types';
import { ReviewsRaw } from './review-types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogData = {
  cameras: Cameras;
  promo: Promo;
  loadingStatus: FetchStatus;
  searchCameras: Cameras;
  fetchingStatus: FetchStatus;
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
  fetchStatus: FetchStatus;
  sendingStatus: FetchStatus;
  isSendSuccess: boolean;
}

export type SortData = {
  currentSortType: null | SortByTypeServerValue;
  currentSortOrder: null | SortByOrderServerValue;
}

export type AppData = {
  currentParams: string;
  camerasCount: number;
}

export type UserInput = '' | number;

export type FilterData = {
  currentFilterCategory: string | null;
  currentFilterTypes: string[];
  currentFilterLevels: string[];
  bottomPrice: UserInput;
  topPrice: UserInput;
  minPrice: number;
  maxPrice: number;
}

export type CurrentFilter = {
  key: QueryKey;
  value: string;
}

