import { createSlice } from '@reduxjs/toolkit';

import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions';

import { NameSpace } from '../../const/name-space';

import { ProductData } from '../../@types/store-types';
import { Camera } from '../../@types/camera-types';

const initialState: ProductData = {
  camera: {} as Camera,
  similarCameras: [],
  isLoading: false,
};

export const productData = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  }
});
