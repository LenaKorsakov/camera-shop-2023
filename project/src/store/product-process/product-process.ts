import { createSlice } from '@reduxjs/toolkit';

import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions/api-actions';

import { FetchStatus } from '../../const/fetch-status';
import { NameSpace } from '../../const/name-space';

import { ProductData } from '../../@types/store-types';
import { Camera } from '../../@types/camera-types';

export const initialStateProduct: ProductData = {
  camera: {} as Camera,
  similarCameras: [],
  fetchStatus: FetchStatus.Default,
};

export const productData = createSlice({
  name: NameSpace.ProductData,
  initialState: initialStateProduct,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.fetchStatus = FetchStatus.Success;
      })
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.fetchStatus = FetchStatus.Error;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  }
});
