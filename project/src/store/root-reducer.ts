import { combineReducers } from '@reduxjs/toolkit';

import { catalogData } from './catalog-process/catalog-process';
import { productData } from './product-process/product-process';
import { reviewData } from './review-process/review-process';
import { sortProcess } from './sort-process/sort-process';
import { appProcess } from './app-process/app-process';
import { filterProcess } from './filter-process/filter-process';

import { NameSpace } from '../const/name-space';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.ProductData]: productData.reducer,
  [NameSpace.ReviewData]: reviewData.reducer,
  [NameSpace.Sort]: sortProcess.reducer,
  [NameSpace.Filter]: filterProcess.reducer,
  [NameSpace.APP]: appProcess.reducer
});
