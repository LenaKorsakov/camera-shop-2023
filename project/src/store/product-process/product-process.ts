import { createSlice } from '@reduxjs/toolkit';
import { ProductData } from '../../@types/store-types';
import { Camera } from '../../@types/camera-types';
import { NameSpace } from '../../const/name-space';
import { fetchCameraByIdAction, fetchReviewAction, fetchSimilarCamerasAction } from '../api-actions';

const initialState: ProductData = {
  camera: {} as Camera,
  similarCameras: [],
  reviews: []
};

export const productData = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
