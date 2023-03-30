import { sendReviewAction } from '../api-actions/api-actions';
import { UNKNOWN_ACTION } from '../../utils/mock';
import { ReviewData } from '../../@types/store-types';
import { changeSuccessStatus, initialStateReview, reviewData } from './review-process';
import { FetchStatus } from '../../const/fetch-status';

describe('Reducer: reviewData', () => {
  let state: ReviewData;

  beforeEach(() => {
    state = initialStateReview;
  });
  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update success status to true and sending status to success and if sendReviewAction fulfiled', () => {
    expect(reviewData.reducer(state, {type: sendReviewAction.fulfilled.type}))
      .toEqual({...state, isSendSuccess: true, sendingStatus: FetchStatus.Success});
  });
  it('should update success status and sending status to error and if sendReviewAction rejected', () => {
    expect(reviewData.reducer(state, {type: sendReviewAction.rejected.type}))
      .toEqual({...state, isSendSuccess: false, sendingStatus: FetchStatus.Error});
  });
  it('should update sending status to true and if sendReviewAction pending', () => {
    expect(reviewData.reducer(state, {type: sendReviewAction.pending.type}))
      .toEqual({...state, sendingStatus: FetchStatus.Loading});
  });
  it('should change success status', () => {
    expect(reviewData.reducer(state, {type: changeSuccessStatus, payload: true}))
      .toEqual({...state, isSendSuccess: true});
  });
});


