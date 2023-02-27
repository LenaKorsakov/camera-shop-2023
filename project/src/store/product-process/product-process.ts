import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../../@types/store-types';
import { Camera } from '../../@types/camera-types';
import { NameSpace } from '../../const/name-space';
import { fetchCameraByIdAction, fetchReviewAction, fetchSimilarCamerasAction, sendReviewAction } from '../api-actions';

const initialState: ProductData = {
  camera: {} as Camera,
  similarCameras: [],
  reviews: [],
  isLoading: false,
  isSuccess: false,
  isSending: false,
};

export const productData = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {
    changeSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
  },
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
      })
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isSending = false;
      })
      .addCase(sendReviewAction.pending, (state, action) => {
        state.isSending = true;
      })
      .addCase(sendReviewAction.rejected, (state, action) => {
        state.isSending = false;
        state.isSuccess = false;
      });
  }
});

export const { changeSuccessStatus } = productData.actions;
