import { createSlice, PayloadAction} from '@reduxjs/toolkit';

import { fetchReviewsByIdAction, sendReviewAction } from '../api-actions/api-actions';

import { NameSpace } from '../../const/name-space';

import { ReviewData } from '../../@types/store-types';
import { FetchStatus } from '../../const/fetch-status';

export const initialStateReview: ReviewData = {
  reviews: [],
  fetchStatus: FetchStatus.Default,
  sendingStatus: FetchStatus.Default,
  isSendSuccess: false
};

export const reviewData = createSlice({
  name: NameSpace.ProductData,
  initialState: initialStateReview,
  reducers: {
    changeSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isSendSuccess = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsByIdAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.fetchStatus = FetchStatus.Success;
      })
      .addCase(fetchReviewsByIdAction.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchReviewsByIdAction.rejected, (state) => {
        state.fetchStatus = FetchStatus.Error;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isSendSuccess = true;
        state.sendingStatus = FetchStatus.Success;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.sendingStatus = FetchStatus.Loading;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.sendingStatus = FetchStatus.Error;
        state.isSendSuccess = false;
      });
  }
});

export const { changeSuccessStatus } = reviewData.actions;
