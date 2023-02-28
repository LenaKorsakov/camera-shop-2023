import { createSlice } from '@reduxjs/toolkit';

import { fetchAllCameraAction, fetchPromoAction } from '../api-actions';

import { NameSpace } from '../../const/name-space';

import { CatalogData } from '../../@types/store-types';
import { Promo } from '../../@types/camera-types';

const initialState: CatalogData = {
  cameras: [],
  promo: {} as Promo,
  isLoading: false
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCameraAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCameraAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCameraAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});
