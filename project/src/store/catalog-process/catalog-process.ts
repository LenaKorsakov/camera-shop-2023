import { createSlice } from '@reduxjs/toolkit';
import { CatalogData } from '../../@types/store-types';
import { Promo } from '../../@types/camera-types';
import { NameSpace } from '../../const/name-space';
import { fetchAllCameras, fetchPromo } from '../api-actions';

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
      .addCase(fetchAllCameras.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCameras.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCameras.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});
