import { createSlice } from '@reduxjs/toolkit';

import { fetchAllCameraAction, fetchPromoAction, fetchSearchCameraAction } from '../api-actions/api-actions';

import { NameSpace } from '../../const/name-space';

import { CatalogData } from '../../@types/store-types';
import { Promo } from '../../@types/camera-types';
import { FetchStatus } from '../../const/fetch-status';

export const initialStateCatalog: CatalogData = {
  cameras: [],
  promo: {} as Promo,
  loadingStatus: FetchStatus.Default,
  searchCameras: [],
  fetchingStatus: FetchStatus.Default,
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState: initialStateCatalog,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCameraAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.loadingStatus = FetchStatus.Success;
      })
      .addCase(fetchAllCameraAction.pending, (state) => {
        state.loadingStatus = FetchStatus.Loading;
      })
      .addCase(fetchAllCameraAction.rejected, (state) => {
        state.loadingStatus = FetchStatus.Error;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchSearchCameraAction.fulfilled, (state, action) => {
        state.searchCameras = action.payload;
        state.fetchingStatus = FetchStatus.Success;
      })
      .addCase(fetchSearchCameraAction.pending, (state) => {
        state.fetchingStatus = FetchStatus.Loading;
      })
      .addCase(fetchSearchCameraAction.rejected, (state) => {
        state.fetchingStatus = FetchStatus.Error;
      });
  }
});
