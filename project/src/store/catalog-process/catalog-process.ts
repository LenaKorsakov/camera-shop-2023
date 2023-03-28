import { createSlice } from '@reduxjs/toolkit';

import { fetchAllCameraAction, fetchPromoAction, fetchSearchCameraAction } from '../api-actions/api-actions';

import { NameSpace } from '../../const/name-space';

import { CatalogData } from '../../@types/store-types';
import { Promo } from '../../@types/camera-types';
import { FetchStatus } from '../../const/fetch-status';

export const initialStateCatalog: CatalogData = {
  cameras: [],
  catalogLoadingStatus: FetchStatus.Default,
  searchCameras: [],
  searchedCamerasFetchingStatus: FetchStatus.Default,
  promoCamera: {} as Promo,
  promoCameraFetchingStatus: FetchStatus.Default
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState: initialStateCatalog,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCameraAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.catalogLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchAllCameraAction.pending, (state) => {
        state.catalogLoadingStatus = FetchStatus.Loading;
      })
      .addCase(fetchAllCameraAction.rejected, (state) => {
        state.catalogLoadingStatus = FetchStatus.Error;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoCamera = action.payload;
        state.promoCameraFetchingStatus = FetchStatus.Success;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.promoCameraFetchingStatus = FetchStatus.Loading;
      })
      .addCase(fetchPromoAction.rejected, (state, action) => {
        state.promoCameraFetchingStatus = FetchStatus.Error;
      })
      .addCase(fetchSearchCameraAction.fulfilled, (state, action) => {
        state.searchCameras = action.payload;
        state.searchedCamerasFetchingStatus = FetchStatus.Success;
      })
      .addCase(fetchSearchCameraAction.pending, (state) => {
        state.searchedCamerasFetchingStatus = FetchStatus.Loading;
      })
      .addCase(fetchSearchCameraAction.rejected, (state) => {
        state.searchedCamerasFetchingStatus = FetchStatus.Error;
      });
  }
});
