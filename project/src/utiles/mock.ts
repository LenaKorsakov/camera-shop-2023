import { datatype, commerce, image, internet, lorem } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';

import { Camera, Promo } from '../@types/camera-types';
import { ReviewAdapt, ReviewPost, ReviewRaw } from '../@types/review-types';
import { createAPI } from '../services/api';
import { State } from '../@types/store-types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { NameSpace } from '../const/name-space';
import { initialStateCatalog } from '../store/catalog-process/catalog-process';
import { initialStateProduct } from '../store/product-process/product-process';
import { initialStateReview } from '../store/review-process/review-process';
import { initialStateBasket } from '../store/basket-process/basket-process';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: commerce.product(),
  category: datatype.string(),
  description: lorem.paragraph(),
  level: datatype.string(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(),
});
export const fakeCameras = Array.from({length: 20}, makeFakeCamera);
export const fakeCamera = fakeCameras[0];

export const makeFakeReview = (): ReviewRaw => ({
  id: datatype.string(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.paragraph(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  cameraId: datatype.number(),
  createAt: datatype.string(),
});
export const fakeReviews = Array.from({length: 15}, makeFakeReview);
export const fakeReview = fakeReviews[1];

export const makeFakeReviewAdapt = (): ReviewAdapt => ({
  id: datatype.string(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.paragraph(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  cameraId: datatype.number(),
  createAt: datatype.datetime(),
});

export const fakeReviewsAdapt = Array.from({length: 15}, makeFakeReviewAdapt);
export const fakeReviewAdapt = fakeReviewsAdapt[1];


export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const fakePromo = makeFakePromo();

export const makeFakePostReview = (): ReviewPost => ({
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  review: lorem.paragraph(),
  cameraId: datatype.number(),
});

export const fakeReviewPost = makeFakePostReview();

export const api = createAPI();
export const mockApi = new MockAdapter(api);
export const middlewares = [thunk.withExtraArgument(api)];

export const getMockStore = configureMockStore<
State,
Action<string>,
ThunkDispatch<State, typeof api, Action>
>(middlewares);


export const fakeId = 5;
export const UNKNOWN_ACTION = {type: 'UNKNOWN_ACTION'};

export const makeMockState = () => ({
  [NameSpace.CatalogData]: {
    ...initialStateCatalog,
    cameras: fakeCameras
  },
  [NameSpace.ProductData]: {
    ...initialStateProduct,
    camera: fakeCamera,
    similarCameras: fakeCameras
  },
  [NameSpace.ReviewData]: {
    ...initialStateReview,
  },
  [NameSpace.Order]: {...initialStateBasket},
});

export const mockState = makeMockState();
export const mockStore = getMockStore(mockState);
