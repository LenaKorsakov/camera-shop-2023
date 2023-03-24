import { store } from '../store/index';

import { FetchStatus } from '../const/fetch-status';
import { ServerOrderValue } from '../const/sort-order';
import { ServerTypeValue } from '../const/sort-type';
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
  currentSortType: null | ServerTypeValue;
  currentSortOrder: null | ServerOrderValue;
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
  priceFrom: UserInput;
  priceTo: UserInput;
  minPrice: number;
  maxPrice: number;
}

export type CurrentFilter = {
  key: QueryKey;
  value: string;
}

