import { datatype, commerce, image, internet, lorem } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';

import { Camera, Promo } from '../@types/camera-types';
import { ReviewPost, ReviewRaw } from '../@types/review-types';
import { createAPI } from '../services/api';
import { State } from '../@types/store-types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

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

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const makeFakePostReview = (): ReviewPost => ({
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  review: lorem.paragraph(),
  cameraId: datatype.number(),
});

export const api = createAPI();
export const mockApi = new MockAdapter(api);
export const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<
State,
Action<string>,
ThunkDispatch<State, typeof api, Action>
>(middlewares);


