import { createSlice, PayloadAction} from '@reduxjs/toolkit';

import { sendReviewAction } from '../api-actions/api-actions';

import { NameSpace } from '../../const/name-space';

import { ReviewData } from '../../@types/store-types';
import { FetchStatus } from '../../const/fetch-status';

export const initialStateReview: ReviewData = {
  sendingStatus: FetchStatus.Default,
  isSendSuccess: false
};

export const reviewData = createSlice({
  name: NameSpace.ReviewData,
  initialState: initialStateReview,
  reducers: {
    changeSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isSendSuccess = action.payload;
    },
  },
  extraReducers(builder) {
    builder
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
