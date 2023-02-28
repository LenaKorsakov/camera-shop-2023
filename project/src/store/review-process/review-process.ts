import { createSlice, PayloadAction} from '@reduxjs/toolkit';

import { fetchReviewAction, sendReviewAction } from '../api-actions';

import { NameSpace } from '../../const/name-space';

import { ReviewData } from '../../@types/store-types';

const initialState: ReviewData = {
  reviews: [],
  isSuccess: false,
  isSending: false,
};

export const reviewData = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {
    changeSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isSuccess = true;
        state.isSending = false;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isSending = false;
        state.isSuccess = false;
      });
  }
});

export const { changeSuccessStatus } = reviewData.actions;
