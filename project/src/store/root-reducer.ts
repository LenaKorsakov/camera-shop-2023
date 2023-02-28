import { combineReducers } from '@reduxjs/toolkit';

import { catalogData } from './catalog-process/catalog-process';
import { productData } from './product-process/product-process';
import { reviewData } from './review-process/review-process';

import { NameSpace } from '../const/name-space';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.ProductData]: productData.reducer,
  [NameSpace.ReviewData]: reviewData.reducer
});
