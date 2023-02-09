import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/name-space';
import { catalogData } from './catalog-process/catalog-process';
import { productData } from './product-process/product-process';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.ProductData]: productData.reducer
});
