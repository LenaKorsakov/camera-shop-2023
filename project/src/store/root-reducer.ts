import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/name-space';
import { catalogData } from './catalog-process/catalog-process';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer
});
